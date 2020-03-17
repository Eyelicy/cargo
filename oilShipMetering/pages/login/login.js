// pages/login/login.js
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
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var type = wx.getStorageSync('type');
    var firmid = wx.getStorageSync('firmid');
    if (imei && uid && type && firmid) {
      wx.redirectTo({
        url: '../index/index'
      })
    }
  },
  // 获取用户名
  userName: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  // 获取密码
  userPwd: function(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  // 登录
  btnLogin: function() {
    var that = this;
    if (util.title(that.data.userName, that.data.userPwd)) {
      wx.login({
        success(res) {
          wx.setStorageSync('imei', res.code);
          if (res.code) {
            //发起网络请求
            wx.request({
              method: "POST",
              dataType: "json",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              url: url.urlLogin,
              data: {
                title: that.data.userName,
                pwd: that.data.userPwd,
                imei: res.code,
                miniprogram: "yc"
              },
              success: function(data) {
                util.tips(parseInt(data.data.code));
                switch (data.data.code) {
                  case 1:
                    wx.setStorageSync('uid', data.data.content.id);
                    wx.setStorageSync('imei', res.code);
                    wx.setStorageSync('type', data.data.content.firmtype);
                    wx.setStorageSync('firmid', data.data.content.firmid);
                    if (data.data.reg_status == 2) {
                      wx.redirectTo({
                        url: '../registered/index?step=' + 9 + '&firm_name=' + data.data.firm_name
                      })
                    } else {
                      wx.redirectTo({
                        url: '../index/index'
                      })
                    }
                    break;
                  case 1001:
                    wx.showToast({
                      title: '用户名或密码错误',
                      icon: 'none',
                      duration: 1000,
                      mask: true
                    })
                    break;
                  case 1004:
                    wx.showToast({
                      title: '该用户被冻结',
                      icon: 'none',
                      duration: 1000,
                      mask: true
                    })
                    break;
                  case 1005:
                    wx.showToast({
                      title: '该用户已到期',
                      icon: 'none',
                      duration: 1000,
                      mask: true
                    })
                    break;
                  case 1009:
                    if (data.data.reg_status == 3) {
                      wx.setStorageSync('uid', data.data.content.id);
                      wx.setStorageSync('imei', res.code);
                      wx.setStorageSync('type', data.data.content.firmtype);
                      wx.setStorageSync('firmid', data.data.content.firmid);
                      wx.redirectTo({
                        url: '../registered/index?step=' + 8 + '&failure=' + data.data.remark + '&phone=' + data.data.content.phone + '&userName=' + data.data.content.username
                      })
                    } else if (data.data.reg_status == 1) {
                      wx.redirectTo({
                        url: '../registered/index?step=' + 7
                      })
                    } else if (data.data.reg_status == 0) {
                      wx.setStorageSync('uid', data.data.content.id);
                      wx.redirectTo({
                        url: '../registered/index?step=' + 4 + '&phone=' + data.data.content.phone + '&userName=' + data.data.content.username
                      })
                    }
                    break;
                }
              }
            })
          }
        }
      })
    }
  },
  // 跳转注册
  showMask() {
    wx.navigateTo({
      url: '../registered/index',
    })
  },
  //隐藏模板
  hideMask() {
    this.setData({
      showModal: false
    })
  },
  showImg() {
    wx.previewImage({
      current: 'https://marcoload.oss-cn-qingdao.aliyuncs.com/img/ercode1.png', // 当前显示图片的http链接
      urls: ['https://marcoload.oss-cn-qingdao.aliyuncs.com/img/ercode1.png'] // 需要预览的图片http链接列表
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