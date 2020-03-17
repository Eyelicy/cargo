// pages/newWork/index.js

var url = require("../../utils/url.js");

var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '0',
    winHeight: 0,
    shipGclist: [{
        "letter": "A",
        "data": []
      },
      {
        "letter": "B",
        "data": []
      }, {
        "letter": "C",
        "data": []
      }, {
        "letter": "D",
        "data": []
      }, {
        "letter": "E",
        "data": []
      }, {
        "letter": "F",
        "data": []
      },
      {
        "letter": "G",
        "data": []
      }, {
        "letter": "H",
        "data": []
      }, {
        "letter": "I",
        "data": []
      }, {
        "letter": "J",
        "data": []
      }, {
        "letter": "K",
        "data": []
      }, {
        "letter": "L",
        "data": []
      }, {
        "letter": "M",
        "data": []
      }, {
        "letter": "N",
        "data": []
      }, {
        "letter": "O",
        "data": []
      }, {
        "letter": "P",
        "data": []
      }, {
        "letter": "Q",
        "data": []
      }, {
        "letter": "R",
        "data": []
      }, {
        "letter": "S",
        "data": []
      }, {
        "letter": "T",
        "data": []
      },
      {
        "letter": "U",
        "data": []
      }, {
        "letter": "V",
        "data": []
      }, {
        "letter": "W",
        "data": []
      }, {
        "letter": "X",
        "data": []
      }, {
        "letter": "Y",
        "data": []
      }, {
        "letter": "Z",
        "data": []
      },
      {
        "letter": "#",
        "data": []
      }
    ],
    shipNewList: {},
    shipNewList1: [],
    shipNameChange: false,
    shipname: ''
  },
  next(e) {
    console.log(e.target.dataset.index);
    var that = this;
    var list = that.data.list;
    list[e.target.dataset.index + 1].focus = true;
    that.setData({
      list
    })
  },
  cityTap(e) {
    var that = this;
    console.log(e);
    var shipNameChange = false;
    that.setData({
      shipid: e.detail.id,
      shipname: e.detail.shipname,
      shipNameChange
    })
  },
  showShipList() {
    var that = this;
    var shipNameChange = true;
    that.setData({
      shipNameChange
    })
    console.log(shipNameChange);
  },
  // 提交下一步
  formSubmit: function(e) {
    var that = this
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      shipid: that.data.shipid,
      miniprogram: "yc"
    }
    Object.assign(form, e.detail.value);
    if (e.detail.value['shipname'] == '' || e.detail.value['voyage'] == '') {
      wx.showToast({
        title: '作业数据不能为空',
        icon: 'none',
        duration: 1000
      })
      var list = that.data.list;
      list[0].focus = true;
      that.setData({
        list
      })
      return false;
    }
    if (that.data.array[that.data.index].expired) {
      wx.showModal({
        title: '舱容表已过期',
        content: '该船舱容表到' + that.data.array[that.data.index].expire_time + "过期，继续使用不保证数据准确，是否继续",
        success(res) {
          if (res.confirm) {
            wx.request({
              method: "POST",
              dataType: "json",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              url: url.addResult,
              data: form,
              success: function(res) {
                util.tips(res.data.code);
                if (res.data.code == "1") {
                  let str = JSON.stringify(res.data);
                  wx.navigateTo({
                    url: '../gauge/index?str=' + str + '&shipid=' + that.data.shipid + '&is_have_data=' + res.data.is_have_data + '&suanfa=' + res.data.suanfa + '&id=' + res.data.resultid + '&solt=' + ''
                  })
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
        url: url.addResult,
        data: form,
        success: function(res) {
          util.tips(res.data.code);
          if (res.data.code == "1") {
            let str = JSON.stringify(res.data);
            wx.navigateTo({
              url: '../gauge/index?str=' + str + '&shipid=' + that.data.shipid + '&is_have_data=' + res.data.is_have_data + '&suanfa=' + res.data.suanfa + '&id=' + res.data.resultid
            })
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var firmId = wx.getStorageSync('firmid');
    const win = wx.getSystemInfoSync();
    that.setData({
      imei: imei,
      uid: uid,
      firmId: firmId,
      winHeight: win.windowHeight
    })
    // 获取船舶名字
    for (let i in that.data.shipGclist) {
      that.data.shipNewList[that.data.shipGclist[i].letter] = that.data.shipGclist[i];
    }
    wx.request({
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: url.shipList,
      data: {
        uid: that.data.uid,
        imei: that.data.imei,
        firmid: firmId,
        miniprogram: "yc"
      },
      success: function(res) {
        var shipNewList = that.data.shipNewList;
        var shipNewList1 = that.data.shipNewList1;
        console.log(res)
        // 判定账号是否在其他设备上登录，是：跳转到登录页面重新登录
        util.tips(res.data.code);
        for (var i in res.data.content) {
          that.data.shipNewList[res.data.content[i].pinyin]["data"].push({
            id: res.data.content[i].id,
            shipname: res.data.content[i].shipname
          })
        }
        for (var j in shipNewList) {
          shipNewList1.push(shipNewList[j])
        }
        var array = that.data.array
        that.setData({
          array: res.data.content,
          shipNewList,
          shipNewList1
        })
        console.log(shipNewList);
        console.log(shipNewList1);
      }
    })

    let ressss = {
      uid: that.data.uid,
      imei: that.data.imei,
      firmid: firmId,
      miniprogram: "yc"
    }
    wx.request({
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: url.getPersonality,
      data: ressss,
      success: function(res) {
        console.log(res);
        util.tips(res.data.code);
        var list = res.data.content.list;
        for (let i = 0; i < list.length; i++) {
          Object.assign(list[i], {
            focus: false
          });
        }
        that.setData({
          list
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