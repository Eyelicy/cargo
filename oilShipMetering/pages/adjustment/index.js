// pages/adjustment/index.js

var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList: [{
        name: '1',
        value: '首检',
        checked: 'checked'
      },
      {
        name: '2',
        value: '末检'
      }
    ],
    solt: 1,
    index: 0,
    reasons: ["舱容偏小", "舱容偏大", "其他"]
  },
  // 作业选择
  soltChange: function(e) {
    var that = this
    that.setData({
      solt: e.detail.value,
    })
  },
  bindPickerChange(e) {
    let that = this;
    that.setData({
      index: e.detail.value
    })
  },
  formSubmit: function(e) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      resultid: that.data.resultid,
      solt: that.data.solt,
      shipid: that.data.shipid,
      miniprogram: "yc",
      reason: parseInt(that.data.index) + 1
    }
    if (that.data.solt == 1) {
      var array = {}
      for (let i in that.data.cabinQ) {
        var cabinid = 'data[' + i + '][cabinid]'
        array[cabinid] = that.data.cabinQ[i].cabinid
      }
      Object.assign(form, array);
    } else {
      var array = {}
      for (let i in that.data.cabinH) {
        var cabinid = 'data[' + i + '][cabinid]'
        array[cabinid] = that.data.cabinH[i].cabinid
      }
      Object.assign(form, array);
    }
    Object.assign(form, e.detail.value);
    console.log(form);
    app.wxRequest('POST', url.setAdjustCabin, form, (res) => {
      util.tips(res.code);
      console.log(res)
      if (res.code == 1) {
        var cabinQ = [],
          cabinQ = res.cabin_info.q
        var cabinH = [],
          cabinH = res.cabin_info.h
        var noWork = []
        for (var i = cabinH.length - 1; i >= 0; i--) {
          if (cabinH[i].is_work == 2) {
            noWork.push(cabinH[i]);
            cabinH.splice(i, 1);
          }
        }
        that.setData({
          noWork,
          cabinQ,
          cabinH,
          qiantotal: res.qiantotal,
          houtotal: res.houtotal,
          total: res.total
        })
        if (res.is_have_data == 'n') {
          console.log(res.adjustlist)
          wx.navigateTo({
            url: '../evenCorrection/index?shipid=' + res.shipid + '&resultid=' + that.data.resultid + '&solt=' + that.data.solt + '&adjustlist=' + res.adjustlist + "&adjustType=true",
          })
        } else {
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 1000
          })
        }
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
    var data = {
      imei: imei,
      uid: uid,
      resultid: options.id,
      miniprogram: "yc"
    }

    var noWork = [];
    var cabinQ = [];
    var cabinH = [];
    var cabinHText = [];
    app.wxRequest('POST', url.adjustCabin, data, (res) => {
      console.log(res);
      util.tips(res.code);
      cabinQ = res.cabin_info.q;
      cabinH = res.cabin_info.h;

      for (var i = cabinH.length - 1; i >= 0; i--) {
        if (cabinH[i].is_work == 2) {
          noWork.push(cabinH[i]);
          cabinH.splice(i, 1);
        }
      };
      that.setData({
        noWork,
        cabinQ,
        cabinH,
        houtotal: res.houtotal,
        qiantotal: res.qiantotal,
        total: res.total,
        resultid: options.id,
        shipid: options.shipid
      });
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