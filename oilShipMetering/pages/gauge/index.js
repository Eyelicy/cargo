// pages/gauge/index.js

var url = require("../../utils/url.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    type: 'forntleft',
    is_fg: false,
    radioChange: false,
    workList: [{
        name: '1',
        value: '首检'
      },
      {
        name: '2',
        value: '末检'
      }
    ],
    temperature: ['15℃', '20℃', '25℃'],
    index: 0,
  },
  hideKeyboard() {
    let that = this;
    that.setData({
      isShow: false
    })
  },
  // 作业选择初始值
  radioChecked: function(name, num) {
    switch (parseInt(num)) {
      case 1:
        name[0]['checked'] = 'true';
        break;
      case 2:
        name[1]['checked'] = 'true';
        break;
      default:
        break;
    }
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 作业选择
  soltChange: function(e) {
    var that = this
    that.setData({
      radioChange: false,
      solt: e.detail.value,
      forntleft: '',
      afterleft: '',
      qiandensity: ''
    })
  },
  // 输入框是否禁用
  inputDisabled: function(e) {
    var that = this
    if (that.data.radioChange) {
      wx.showToast({
        title: '请先选择首检、末检',
        icon: 'none',
        duration: 1000
      })
    }
  },
  // 提交下一步
  formSubmit: function(e) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      resultid: that.data.resultid,
      solt: that.data.solt,
      forntright: e.detail.value.forntleft,
      centerleft: "",
      centerright: "",
      afterright: e.detail.value.afterleft,
      miniprogram: "yc"
    }
    Object.assign(form, e.detail.value);
    for (let key in e.detail.value) {
      if (e.detail.value[key] == '') {
        wx.showToast({
          title: '作业数据不能为空',
          icon: 'none',
          duration: 1000
        })
        that.setData({
          [key]: true
        })
        return;
      }
    }
    if (that.data.solt == '2' && that.data.list.h['is_fugai']) {
      var is_fg = that.data.is_fg
      is_fg = true
    } else if (that.data.solt == '1' && that.data.list.q['is_fugai']) {
      var is_fg = that.data.is_fg
      is_fg = true
    }
    that.setData({
      is_fg
    })
    if (that.data.is_fg) {
      wx.showModal({
        title: '水尺录入',
        content: '是否覆盖',
        success(res) {
          if (res.confirm) {
            wx.request({
              method: "POST",
              dataType: "json",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              url: url.fornt,
              data: form,
              success: function(res) {
                console.log(res);
                util.tips(res.data.code);
                if (res.data.code == "1") {
                  if (e.detail.target.dataset.id == 'odd') {
                    wx.navigateTo({
                      url: '../work/index?shipid=' + that.data.shipid + '&solt=' + that.data.solt + '&suanfa=' + that.data.suanfa + '&is_have_data=' + that.data.is_have_data + '&resultid=' + that.data.resultid
                    })
                  } else {
                    wx.navigateTo({
                      url: '../evenWork/index?shipid=' + that.data.shipid + '&solt=' + that.data.solt + '&suanfa=' + that.data.suanfa + '&is_have_data=' + that.data.is_have_data + '&resultid=' + that.data.resultid
                    })
                  }
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.request({
        method: "POST",
        dataType: "json",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        url: url.fornt,
        data: form,
        success: function(res) {
          util.tips(res.data.code);
          if (e.detail.target.dataset.id == 'odd') {
            wx.navigateTo({
              url: '../work/index?shipid=' + that.data.shipid + '&solt=' + that.data.solt + '&suanfa=' + that.data.suanfa + '&is_have_data=' + that.data.is_have_data + '&resultid=' + that.data.resultid
            })
          } else {
            wx.navigateTo({
              url: '../evenWork/index?shipid=' + that.data.shipid + '&solt=' + that.data.solt + '&suanfa=' + that.data.suanfa + '&is_have_data=' + that.data.is_have_data + '&resultid=' + that.data.resultid
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  focus: function(e) {
    var that = this
    switch (e.currentTarget.dataset.type) {
      case 'forntleft':
        var forntleft = true;
        var afterleft = false;
        var density = false;
        break;
      case 'afterleft':
        var afterleft = true;
        var forntleft = false;
        var density = false;
        break;
      case 'qiandensity' || 'houdensity':
        var density = true;
        var afterleft = false;
        var forntleft = false;
        break;
    }
    that.setData({
      forntleft,
      afterleft,
      density,
      type: e.currentTarget.dataset.type,
      isShow: true,
    })
  },
  inputChange(e) {
    var that = this
    let type = e.currentTarget.dataset.index;
    let keys = e.detail
    if (that.data.solt == 1) {
      var content = this.data.list.q[type]
    } else {
      var content = this.data.list.h[type]
    }
    console.log(type)
    console.log(content)
    let len = content.length;
    switch (keys) {
      case '.':
        // if (len < 11 && content.indexOf('.') == -1) { //如果字符串里有小数点了，则不能继续输入小数点，且控制最多可输入10个字符串
        //   if (content.length < 1) { //如果小数点是第一个输入，那么在字符串前面补上一个0，让其变成0.
        //     content = '0.';
        //   } else { //如果不是第一个输入小数点，那么直接在字符串里加上小数点
        //     content += '.';
        //   }
        // }
        if (len < 11 && content.indexOf('.') == -1) {
          if (content.length < 1) {
            content = '0.';
          } else {
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
      case 'copy':
        // content = content.substr(0, content.length - 1);
        content = "";
        break;
      case '↓':
        if (type == "forntleft") {
          type = 'afterleft';
          that.setData({
            afterleft: true,
            forntleft: false,
            density: false,
            type
          })
        } else if (type == "afterleft") {
          if (that.data.solt == '1') {
            type = 'qiandensity';
          } else {
            type = 'houdensity';
          }
          that.setData({
            afterleft: false,
            forntleft: false,
            density: true,
            type
          })
        } else if (type == "qiandensity" || type == "houdensityx") {
          type = 'forntleft';
          that.setData({
            afterleft: false,
            forntleft: true,
            density: false,
            type
          })
        }

        break;
      case 'left':

        break;
      default:
        let Index = content.indexOf('.'); //小数点在字符串中的位置
        if (len < 7) { //控制最多可输入7个字符串
          content += keys;
        }
        break
    }
    if (keys != "↓") {
      let list = this.data.list
      if (that.data.solt == '1') {
        list.q[type] = content
      } else {
        list.h[type] = content
      }
      this.setData({
        list
      });
      that.setData({
        content,
      });
    }

  },
  onLoad: function(options) {
    var that = this
    let item
    let workList = that.data.workList
    if (options.str) {
      let item = JSON.parse(options.str);
    }
    switch (options.solt) {
      case '1':
        that.radioChecked(workList, options.solt);
        break;
      case '2':
        that.radioChecked(workList, options.solt);
        break;
      default:
        var radioChange = that.data.radioChange,
          radioChange = true
    }
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    if (options.id) {
      wx.request({
        method: "POST",
        dataType: "json",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        url: url.newForntSearch,
        data: {
          uid: uid,
          imei: imei,
          resultid: options.id,
          miniprogram: "yc"
        },
        success: function(res) {
          util.tips(res.data.code);
          if (res.data.code == 1) {
            console.log(res.data.content)
            that.setData({
              list: res.data.content,
              resultid: options.id,
              forntleft: res.data.content.forntleft,
              afterleft: res.data.content.afterleft,
              qiandensity: res.data.content.qiandensity,
              workList,
              suanfa: options.suanfa,
              is_have_data: options.is_have_data,
              shipid: options.shipid,
              solt: options.solt
            });
          }
        }
      })

    }
    that.setData({
      radioChange,
      suanfa: options.suanfa,
      is_have_data: options.is_have_data,
      shipid: options.shipid,
      solt: options.solt,
      data: options.data,
      ward: item,
      workList,
      resultid: options.id
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
  onUnload: function() {},

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