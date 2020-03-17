// pages/index/index.js
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentData: 0,
    baseItemHeight: 0,
    swiper_height: 0,
    listData: [],
    loadTips: '上拉加载更多',
    _item: [],
    p: 1,
    p1: 1,
    form: {},
    iIndex: true,
    goTopStatus: true
  },
  // 获取备注
  userRemark: function(e) {
    this.setData({
      userRemark: e.detail.value
    })
  },
  //取消
  modalCancel: function() {
    var that = this;
    that.setData({
      showModal: !that.data.showModal
    })
  },
  // 备注
  remarks: function(e) {
    var that = this;
    that.setData({
      bindex: e.currentTarget.dataset.bindex,
      resultid: that.data.list[e.currentTarget.dataset.bindex].id,
      showModal: !that.data.showModal
    })
    if (!that.data.list[e.currentTarget.dataset.bindex].remark) {
      that.setData({
        remark: that.data.list[e.currentTarget.dataset.bindex].remark
      })
    } else {
      that.setData({
        remark: that.data.list[e.currentTarget.dataset.bindex].remark
      })
    }

  },
  //修改备注
  modalConfirm: function() {
    var that = this;
    wx.request({
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: url.editRemark,
      data: {
        uid: that.data.uid,
        imei: that.data.imei,
        resultid: that.data.resultid,
        remark: that.data.userRemark,
        miniprogram: "yc"
      },
      success: function(res) {
        util.tips(res.data.code);
      }
    })
    // var remark = that.data.soltList[bindex].remark
    // remark = that.data.userRemark
    that.data.list[that.data.bindex].remark = that.data.userRemark
    that.setData({
      showModal: !that.data.showModal
    })
  },
  // 录入
  input: function(e) {
    var that = this
    let index = e.currentTarget.dataset.bindex
    wx.navigateTo({
      url: '../gauge/index?id=' + that.data.list[index].id + '&shipid=' + that.data.list[index].shipid + '&solt=' + that.data.list[index].solt + '&suanfa=' + that.data.list[index].suanfa + '&is_have_data=' + that.data.list[index].is_have_data
    })
  },
  // 查看
  see: function(e) {
    var that = this
    let index = e.currentTarget.dataset.bindex
    wx.navigateTo({
      url: '../query/index?id=' + that.data.list[index].id
    })
  },
  adjustment: function(e) {
    var that = this
    let index = e.currentTarget.dataset.bindex
    wx.navigateTo({
      url: '../adjustment/index?id=' + that.data.list[index].id + '&shipid=' + that.data.list[index].shipid
    })
  },
  // 回到顶部
  goToTop: function() {
    let that = this
    this.setData({
      goTopStatus: !that.data.goTopStatus
    })
  },
  goToTop1: function() {
    let that = this
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.setData({
      goTopStatus: !that.data.goTopStatus
    })
  },
  signOut: function() {
    wx.clearStorage()
    wx.redirectTo({
      url: '../login/login'
    })
  },

  search(){
    let that = this;
    that.setData({
      goTopStatus: !that.data.goTopStatus
    })
    wx.navigateTo({
      url: '../search/index'
    })
  },

  //新建作业
  newWork: function() {
    wx.navigateTo({
      url: '../newWork/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let _item = []
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    that.setData({
      imei: imei,
      uid: uid
    })
    wx.request({
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: url.resultList,
      data: {
        uid: that.data.uid,
        imei: that.data.imei,
        miniprogram: "yc",
        p: that.data.p
      },
      success: function(res) {
        util.tips(res.data.code);
        console.log(res.data.content);
        that.setData({
          list: res.data.content
        })
      }
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
    var that = this
    let list = that.data.list
    list.length = 0
    that.setData({
      loadTips: '',
      list
    })
    for (let i = 1; i <= that.data.p; i++) {
      ajaxList(i)
    }

    function ajaxList(num) {
      wx.request({
        method: "POST",
        dataType: "json",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        url: url.resultList,
        data: {
          uid: that.data.uid,
          imei: that.data.imei,
          miniprogram: "yc",
          p: num
        },
        success: function(res) {
          if (res.data.code == 1) {
            wx.showLoading({
              title: '加载中',
            })
            var list = that.data.list
            for (let i = 0; i < res.data.content.length; i++) {
              list.push(res.data.content[i])
            }
            that.setData({
              list
            })
            wx.stopPullDownRefresh()
            setTimeout(function() {
              wx.hideLoading()
            }, 1000)
          } else {
            wx.stopPullDownRefresh()
            util.tips(res.data.code);
          }
        }
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    that.data.p++
      wx.showLoading();
    that.setData({
      loadTips: "加载中..."
    })
    wx.request({
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: url.resultList,
      data: {
        uid: that.data.uid,
        imei: that.data.imei,
        miniprogram: "yc",
        p: that.data.p
      },
      success: function(res) {
        util.tips(res.data.code);
        if (res.data.code == 1) {
          wx.hideLoading();
          var list = that.data.list
          if (res.data.content.length != 0) {
            for (let i = 0; i < res.data.content.length; i++) {
              list.push(res.data.content[i])
            }
            that.setData({
              list
            })
          } else {
            that.setData({
              loadTips: "全部加载！！！"
            })
          }
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})