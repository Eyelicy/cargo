// pages/correction/index.js

var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    keyBoardType: 2,
    content: "",
    item: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    temData: {
      draft1: '',
      draft2: '',
      ullage1: '',
      ullage2: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
    }
  },
  focus: function(e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    let temData = {};
    that.setData({
      type: e.currentTarget.dataset.index,
      isShow: true
    })
  },
  blur: function() {
    var that = this
    if (that.data.isblur) {
      this.setData({
        type: '',
        isShow: false
      })
    }
    this.setData({
      isblur: true,
    })
  },
  inputChange(e) {
    var that = this;
    let type = e.currentTarget.dataset.index;
    let keys = e.detail,
      content = this.data.temData[type],
      len = content.length;
    switch (keys) {
      case '.': //点击小数点，（注意输入字符串里的是小数点，但是我界面显示的点不是小数点，是居中的点，在中文输入法下按键盘最左边从上往下数的第二个键，也就是数字键1左边的键可以打出居中的点）
        if (len < 11 && content.indexOf('.') == -1) { //如果字符串里有小数点了，则不能继续输入小数点，且控制最多可输入10个字符串
          if (content.length < 1) { //如果小数点是第一个输入，那么在字符串前面补上一个0，让其变成0.
            content = '0.';
          } else { //如果不是第一个输入小数点，那么直接在字符串里加上小数点
            content += '.';
          }
        }
        break;
      case '-': //如果点击删除键就删除字符串里的最后一个
        if (len < 11 && content.indexOf('-') == -1) { //如果字符串里有小数点了，则不能继续输入小数点，且控制最多可输入10个字符串
          if (content.length < 1) { //如果小数点是第一个输入，那么在字符串前面补上一个0，让其变成0.
            content = '-';
          } else { //如果不是第一个输入小数点，那么直接在字符串里加上小数点
            var text1 = "-";
            content = text1.concat("", content);
            // content += '-';
          }
        }
        break;
      case '下一个':
        switch (that.data.type) {
          case 'draft1':
            type = 'draft2';
            break;
          case 'draft2':
            type = 'ullage1';
            break;
          case 'ullage1':
            type = 'value1';
            break;
          case 'value1':
            type = 'value2';
            break;
          case 'value2':
            type = 'ullage2';
            break;
          case 'ullage2':
            type = 'value3';
            break;
          case 'value3':
            type = 'value4';
            break;
          case 'value4':
            type = 'draft1';
            break;
        }
        that.setData({
          type: type
        })
        return;
        break;
      case 'delete':
        content = content.substr(0, content.length - 1);
        break;
      default:
        let Index = content.indexOf('.'); //小数点在字符串中的位置
        if (Index == -1 || len - Index != 4) { //这里控制小数点只保留两位
          if (len < 7) { //控制最多可输入10个字符串
            content += keys;
          }
        }
        break;
    }
    let temData = this.data.temData
    temData[type] = content
    this.setData({
      temData
    });
  },
  //提交
  formSubmit: function(e) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      miniprogram: "yc"
    }
    for (let key in that.data.temData) {
      if (that.data.temData[key] == '') {
        wx.showToast({
          title: '作业数据不能为空',
          icon: 'none',
          duration: 1000
        })
        var type = that.data.type
        that.setData({
          type: key,
          isShow: true,
          isblur: false
        })
        console.log(that.data.type, that.data.isShow)
        return false;
      }
    }
    Object.assign(form, that.data.temData);
    Object.assign(form, that.data.options);
    wx.request({
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: url.bookData,
      data: form,
      success: function(res) {
        util.tips(res.data.code);
        if (res.data.code == '1' && res.data.suanfa == 'a') {
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function() {
            getApp().globalData.skip = true;
            wx.navigateBack({
              delta: 1
            })
          }, 1000);

        } else if (res.data.suanfa == 'd') {
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function() {
            getApp().globalData.skip = true;
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        } else if (res.data.code == '1' && (res.data.suanfa == 'b' || res.data.suanfa == 'c')) {

          var options = JSON.stringify(that.data.options)
          wx.navigateTo({
            url: '../capacity/index?correntkong=' + res.data.correntkong + '&options=' + options + '&suanfa=' + res.data.suanfa + '&is_have_data=' + that.data.options.is_have_data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var data = {
      imei: imei,
      uid: uid,
      cabinid: options.cabinid,
      resultid: options.resultid,
      shipid: options.shipid,
      solt: options.solt,
      miniprogram: "yc"
    }
    that.setData({
      options: options
    })
    console.log(that.data.options)
    app.wxRequest('POST', url.getBookData, data, (res) => {
      console.log(res);
      that.setData({
        temData: res[0]
      })
      console.log(that.data.list);
    }, (err) => {
      console.log(err.errMsg)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})