// pages/query/index.js

var url = require("../../utils/url.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultMsg: [],
    imgShow: false
  },
  zhanShi: function() {
    var that = this;
    that.setData({
      imgShow: !that.data.imgShow
    })
  },
  btnInstall() {
    var that = this
    wx.navigateTo({
      url: '../editWork/index?resultid=' + that.data.resultid
    })
  },

  autographBtn(){
    var that = this
    wx.navigateTo({
      url: '../autograph/index?resultid=' + that.data.resultid
    })
  },

  openPdf: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          pdfType: true,
          platform: res.platform
        });
      },
    });
    if (that.data.platform == 'ios') {
      wx.request({
        method: "POST",
        dataType: "json",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        url: url.pdf,
        data: {
          imei: that.data.imei,
          uid: that.data.uid,
          resultid: that.data.resultid,
          minipost: "1",
          miniprogram: "yc"
        },
        success: function(res) {
          util.tips(res.data.code);
          console.log(res);
          if (res.data.code == '2030') {
            wx.hideLoading();
            wx.showModal({
              title: '缺少数据',
              content: '新建作业时数据填写不完整，请补充',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../editWork/index?resultid=' + that.data.resultid
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            that.setData({
              filename: res.data.filename
            })

            wx.showModal({
              title: '提示',
              content: '由于微信小程序限制，无法分享打印pdf，请点击确认按钮复制链接打开浏览器查看',
              success(res) {
                if (res.confirm) {
                  wx.setClipboardData({
                    data: url.urlPdf + that.data.filename,
                    success(res) {
                      wx.showToast({
                        title: '复制成功'
                      })
                      wx.getClipboardData({
                        success(res) {
                          console.log(res.data) // data
                        }
                      })
                    }
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }

        },
        fail: function(res) {
          wx.hideLoading();
          wx.showToast({
            title: '请求超时',
            icon: 'none',
            duration: 1000
          })
        }
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        method: "POST",
        dataType: "json",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        url: url.pdf,
        data: {
          imei: that.data.imei,
          uid: that.data.uid,
          resultid: that.data.resultid,
          minipost: "1",
          miniprogram: "yc"
        },
        success: function(res) {
          util.tips(res.data.code);
          if (res.data.code == '2030') {

            wx.hideLoading();
            wx.showModal({
              title: '缺少数据',
              content: '新建作业时数据填写不完整，请补充',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../editWork/index?resultid=' + that.data.resultid
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            that.setData({
              filename: res.data.filename
            })
            wx.downloadFile({
              url: url.urlPdf + that.data.filename,
              success: function(res) {
                var filePath = res.tempFilePath
                wx.openDocument({
                  filePath: filePath,
                  success: function(res) {
                    wx.hideLoading()
                  },
                  fail: function(res) {
                    wx.hideLoading()
                    wx.showToast({
                      title: '文件打开失败',
                      icon: 'none',
                      duration: 1000
                    })
                  }
                })
              },
              fail: function() {
                wx.hideLoading()
                wx.showToast({
                  title: '下载超时',
                  icon: 'none',
                  duration: 1000
                })
              }
            })
          }
        },
        fail: function(res) {
          wx.hideLoading();
          wx.showToast({
            title: '请求超时',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    that.setData({
      imei,
      uid,
      resultid: options.id,
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
    var that = this
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    wx.request({
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: url.resultSearch,
      data: {
        imei: imei,
        uid: uid,
        resultid: that.data.resultid,
        miniprogram: "yc"
      },
      success: function(res) {
        util.tips(res.data.code);
        console.log(res)
        var resultMsg = [];
        if (res.data.resultmsg != "") {
          for (let i = 0; i < res.data.resultmsg.length; i++) {
            for (let index1 = 0; index1 < 2; index1 = +2) {
              resultMsg.push({
                name: res.data.resultmsg[i][index1].cabinname,
                result: [
                  res.data.resultmsg[i][index1],
                  res.data.resultmsg[i][index1 + 1],
                ]
              });
            }
          }
        }
        for (let i = 0; i < resultMsg.length; i++) {
          for (let index1 = 0; index1 < resultMsg[i].result.length; index1++) {
            if (resultMsg[i].result[index1]) {} else {
              resultMsg[i].result[index1] = {
                solt: 1
              }
            }
          }
        }

        function compare(property) {
          return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
          }
        }
        that.setData({
          imei,
          uid,
          resultMsg,
          personality: res.data.personality,
          content: res.data.content,
        })
        console.log(that.data.resultMsg)
      }
    })
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