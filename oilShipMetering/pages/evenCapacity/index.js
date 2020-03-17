// pages/evenCapacity/index.js
var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'ullage1',
    isShow: false,
    keyBoardType: 2,
    table: [
      'ullage1', 'capacity1', 'ullage2', 'capacity2'
    ]
  },
  hideKeyboard() {
    let that = this;
    that.setData({
      isShow: false
    })
  },
  focus: function(e) {
    var that = this
    that.setData({
      i: e.currentTarget.dataset.id,
      type: e.currentTarget.dataset.index,
      isShow: true
    })
  },
  fzKg: function(e) {
    var that = this;
    let id = e.target.dataset.id;
    let list = that.data.list;
    list[id].ullage2 = list[id].ullage1;
    list[id].capacity2 = list[id].capacity1;
    that.setData({
      list
    })
  },
  inputChange(e) {
    var that = this
    let type = e.currentTarget.dataset.index;
    let keys = e.detail,
      // content = this.data.temData[type],
      content = this.data.list[that.data.i][type],
      len = content.length;
    // console.log(keys)
    // console.log(that.data.i, type)
    // console.log(this.data.getbook[that.data.i][type])
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
      case 'copy':
        // content = content.substr(0, content.length - 1);
        content = ""
        break;
      case '↓':
        if (that.data.type == "ullage2" || that.data.type == "capacity2") {
          // 判断是否最后一个舱

          var i = that.data.i
          var table = that.data.table
          type = that.data.type
          switch (type) {
            case 'ullage2':
              that.setData({
                i,
                type: 'capacity1'
              })
              break;
            case 'capacity2':
              if (that.data.max > that.data.i) {
                i++
                that.setData({
                  i,
                  type: 'ullage1'
                })
              }

              break;


          }
          content = this.data.list[that.data.i][that.data.type]
          wx.pageScrollTo({
            selector: '#test' + that.data.i,
            duration: 300
          })
        } else {
          // 如果不是最后一个元素
          type = that.data.type
          that.setData({
            type: that.data.table[that.data.table.indexOf(type) + 2]
          })
          content = this.data.list[that.data.i][that.data.type]
        }
        break;
      case 'left':
        // 判断是否舱最后元素
        if (that.data.type == "capacity2") {
          // 判断是否最后一个舱
          if (that.data.max > that.data.i) {
            var i = that.data.i + 1
            var table = that.data.table
            type = that.data.type
            that.setData({
              i,
              type: that.data.table[0]
            })
            content = this.data.list[that.data.i][that.data.type]
          }
          wx.pageScrollTo({
            selector: '#test' + that.data.i,
            duration: 300
          })
        } else {
          // 如果不是最后一个元素
          type = that.data.type
          that.setData({
            type: that.data.table[that.data.table.indexOf(type) + 1]
          })
          content = this.data.list[that.data.i][that.data.type]
        }
        break;
      default:
        let Index = content.indexOf('.'); //小数点在字符串中的位置
        if (len < 7) { //控制最多可输入7个字符串
          content += keys;
        }
        // if (Index == -1 || len - Index != 4) { //这里控制小数点只保留两位

        // }
        break
    }
    let list = this.data.list
    list[that.data.i][that.data.type] = content
    this.setData({
      list
    });
  },
  formSubmit: function(e) {
    var that = this
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      resultid: that.data.resultid,
      solt: that.data.solt,
      shipid: that.data.shipid,
      miniprogram: "yc"
    }
    var array = {}
    for (let i in that.data.list) {
      var cabinid = 'data[' + i + '][cabinid]'
      var correntkong = 'data[' + i + '][correntkong]'
      array[cabinid] = that.data.list[i].cabinid
      array[correntkong] = that.data.list[i].correntkong
    }
    Object.assign(form, array);
    Object.assign(form, e.detail.value);
    for (let i = 0; i < that.data.list.length; i++) {
      for (let key in that.data.list[i]) {
        if (that.data.list[i]['ullage1'] == that.data.list[i]['correntkong']) {
          if (!((that.data.list[i]['capacity2'] == '' && that.data.list[i]['ullage2'] == '') || (that.data.list[i]['capacity2'] != '' && that.data.list[i]['ullage2'] != ''))) {
            that.setData({
              i: [i],
              type: [key]
            });
            wx.pageScrollTo({
              scrollTop: i * 229,
              duration: 300
            })
            wx.showToast({
              title: '作业数据不能为空',
              icon: 'none',
              duration: 1000
            });
            return;
          }
        } else if (that.data.list[i][key] == '') {
          that.setData({
            i: [i],
            type: [key]
          });
          wx.pageScrollTo({
            scrollTop: i * 229,
            duration: 300
          })
          wx.showToast({
            title: '作业数据不能为空',
            icon: 'none',
            duration: 1000
          });
          return;
        }
      };
    };
    console.log(form)
    app.wxRequest('POST', url.capacity, form, (res) => {
      util.tips(res.code);
      console.log(res)
      if (res.code == 1) {
        wx.showToast({
          title: '提交成功！',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function() {
          wx.reLaunch({
            url: '../index/index'
          })
        }, 1000)
      }
    }, (err) => {
      console.log(err.errMsg)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      resultid: options.resultid,
      solt: options.solt,
      miniprogram: "yc"
    }
    // console.log(options.adjustlist)
    // if (options.adjustlist) {
    //   var adjustlist = options.adjustlist.split(',');
    // }
    app.wxRequest('POST', url.capacityDatas, form, (res) => {
      util.tips(res.code);
      console.log(res.msg)
      var list = res.msg
      // if (that.data.adjustlist) {
      var nogetbook = []
      for (let i in list) {
        nogetbook.push(res.msg[i])
        if (nogetbook[i].ullage1 > nogetbook[i].ullage2) {
          if (!(nogetbook[i].correntkong >= nogetbook[i].ullage2 && nogetbook[i].correntkong <= nogetbook[i].ullage1)) {
            nogetbook[i].setRed = true;
          }
        } else if (nogetbook[i].ullage1 < nogetbook[i].ullage2) {
          if (!(nogetbook[i].correntkong <= nogetbook[i].ullage2 && nogetbook[i].correntkong >= nogetbook[i].ullage1)) {
            nogetbook[i].setRed = true;
          }
        } else if (nogetbook[i].ullage1 === nogetbook[i].ullage2) {
          if (parseFloat(nogetbook[i].correntkong) != parseFloat(nogetbook[i].ullage1)) {
            nogetbook[i].setRed = true;
          }
        }
        if (nogetbook[i].setRed == true && options.adjustType == "true") {
          nogetbook[i].capacity1 = ''
          nogetbook[i].capacity2 = ''
          nogetbook[i].ullage1 = ''
          nogetbook[i].ullage2 = ''
        }
        // if (adjustlist.length > 1) {
        //   if (adjustlist.indexOf(list[i].cabinid) != -1) {
        //     nogetbook[i].setRed = true
        //     nogetbook[i].capacity1 = ''
        //     nogetbook[i].capacity2 = ''
        //     nogetbook[i].ullage1 = ''
        //     nogetbook[i].ullage2 = ''
        //   }
        // } else {
        //   if (list[i].cabinid == adjustlist) {
        //     nogetbook[i].setRed = true
        //     nogetbook[i].capacity1 = ''
        //     nogetbook[i].capacity2 = ''
        //     nogetbook[i].ullage1 = ''
        //     nogetbook[i].ullage2 = ''
        //   }
        // }

        // }
        list = nogetbook
      }
      that.setData({
        list,
        max: res.msg.length - 1
      })
      console.log("123")
      console.log(that.data.list)
    }, (err) => {
      console.log(err.errMsg)
    })
    that.setData({
      resultid: options.resultid,
      solt: options.solt,
      shipid: options.shipid,
      adjustlist: options.adjustlist
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