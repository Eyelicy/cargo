// pages/capacity/index.js
var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function(e) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      correntkong: that.data.correntkong,
      miniprogram: "yc"
    }
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
    Object.assign(form, e.detail.value);
    Object.assign(form, that.data.fromData);
    wx.request({
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: url.capacityData,
      data: form,
      success: function(res) {
        util.tips(res.data.code);
        if (res.data.code == '1') {
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function() {
            getApp().globalData.skip = true;
            wx.navigateBack({
              delta: 2
            })
          }, 1000)
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

    var fromData = JSON.parse(options.options);
    var data = {
      imei: imei,
      uid: uid,
      cabinid: fromData.cabinid,
      resultid: fromData.resultid,
      shipid: fromData.shipid,
      solt: fromData.solt,
      miniprogram: "yc"
    }
    app.wxRequest('POST', url.getCapacityData, data, (res) => {
      console.log(res);
      that.setData({
        list: res[0]
      })
      console.log(that.data.list);
    }, (err) => {
      console.log(err.errMsg)
    })
    that.setData({
      fromData,
      suanfa: options.suanfa,
      is_have_data: options.is_have_data,
      correntkong: options.correntkong
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