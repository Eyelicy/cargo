var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");
// pages/evaluate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oEvaluationIdx: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let that = this;
    that.setData({
      resultid: options.resultid
    })
  },

  oEvaluation(e) {
    let that = this;
    let idx = e.currentTarget.dataset.index;
    that.setData({
      oEvaluationIdx: idx + 1
    })
  },

  security(e) {
    let that = this;
    let idx = e.currentTarget.dataset.index;
    that.setData({
      securityIdx: idx + 1
    })
  },

  metering(e) {
    let that = this;
    let idx = e.currentTarget.dataset.index;
    that.setData({
      meteringIdx: idx + 1
    })
  },

  evaluateText(e) {
    let that = this;
    that.setData({
      content: e.detail.value
    })
  },

  subBtn(e) {
    let that = this;
    let imei = wx.getStorageSync('imei');
    let uid = wx.getStorageSync('uid');
    app.wxRequest('POST', url.evaluate, {
      imei: imei,
      uid: uid,
      resultid: that.data.resultid,
      grade: that.data.oEvaluationIdx,
      security: that.data.securityIdx,
      measure: that.data.meteringIdx,
      content: that.data.content
    }, (res) => {
      if (res.code == 1) {
        util.tips(res.code);
        wx.navigateBack({
          delta: 2
        })
      }
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