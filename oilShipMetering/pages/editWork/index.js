// pages/editWork/index.js
var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      resultid: options.resultid
    }
    app.wxRequest('POST', url.get_personality_info, form, (res) => {
      console.log(res);
      var list = res.content;
      for (let i = 0; i < list.length; i++) {
        Object.assign(list[i], {
          focus: false
        });
      }
      that.setData({
        list,
        resultid: options.resultid
      })
    }, (err) => {
      console.log(err.errMsg)
    })

  },
  formSubmit(e) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      resultid: that.data.resultid
    }
    Object.assign(form, e.detail.value);
    console.log(e.detail.value.start)
    if (e.detail.value.start != '' && e.detail.value.objective != '') {
      app.wxRequest('POST', url.later_edit_result, form, (res) => {
        if (res.code == 1) {
          wx.navigateBack({
            delta: 1
          })
        }
        console.log(res);
      }, (err) => {
        console.log(err.errMsg)
      })
    } else if (e.detail.value.start == '') {
      wx.showToast({
        title: '起运港口不能为空',
        icon: 'none',
        duration: 1000
      });
      return false;
    } else if (e.detail.value.objective == '') {
      wx.showToast({
        title: '目的港口不能为空',
        icon: 'none',
        duration: 1000
      });
      return false;
    }

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