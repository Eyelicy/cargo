// pages/work/index.js
var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    is_work: 1,
    diLiang: [{
        name: '1',
        value: '有底量',
        checked: 'true'
      },
      {
        name: '2',
        value: '无底量'
      }
    ],
    guanXian: [{
        name: '1',
        value: '有管线',
        checked: 'true'
      },
      {
        name: '2',
        value: '无管线'
      }
    ],
    calculation: [{
      name: 'rongliang',
      value: '容量计算',
      checked: 'true'

    }, {
      name: 'diliang',
      value: '底量计算'
    }],
    items: [{
      name: 'work',
      value: '0'
    }]
  },
  isWorkChange: function(e) {
    var that = this
    if (e.detail.value) {
      that.setData({
        is_work: 1
      })
    } else {
      that.setData({
        ullage: '',
        sounding: '',
        temp: '',
        is_work: 2
      })
    }
    console.log('switch1 发生 change 事件，携带值为', that.data.is_work)
  },
  checkboxChange: function(e) {
    var that = this
    if (e.detail.value) {
      that.setData({
        is_work: 1
      })
    } else {
      that.setData({
        is_work: 0
      })
    }
  },
  bindKey: function(e) {
    var that = this;
    var num = e.detail.value;
    var myStr = num.toString();
    if (myStr.indexOf("-") > -1) {
      return;
    }
    switch (myStr.length) {
      case 1:
        if (myStr.indexOf(".") == -1) {
          var str2 = "0.00";
          var num = str2.concat(myStr)
        }
        break;
      case 2:
        if (myStr.indexOf(".") == -1) {
          var str2 = "0.0"
          var num = str2.concat(myStr)
        }
        break;
      case 3:
        if (myStr.indexOf(".") == -1) {
          var str2 = "0."
          var num = str2.concat(myStr)
        }
        break;
      case 4:
        if (myStr.indexOf(".") == -1) {
          var num = myStr.slice(0, 1) + '.' + myStr.slice(1)
        }
        break;
      case 5:
        if (myStr.indexOf(".") == -1) {
          var num = myStr.slice(0, 2) + '.' + myStr.slice(2)
        } else if (myStr.indexOf(".") == 2) {
          var num = myStr.slice(0, 1) + '.' + myStr.slice(1, 2) + myStr.slice(3, 5)
        }

        break;
    }
    var ullage = that.data.ullage
    var sounding = that.data.sounding
    console.log(that.data);
    if (e.currentTarget.dataset.type == "ullage") {
      console.log(that.data.qufen);
      if (that.data.qufen == "rongliang") {
        var sounding = Math.round((that.data.altitudeheight - num) * 1000) / 1000
      } else {
        var sounding = Math.round((that.data.dialtitudeheight - num) * 1000) / 1000
      }
      that.setData({
        ullage: num,
        sounding: sounding
      })
      console.log(sounding, that.data.dialtitudeheight)
    } else if (e.currentTarget.dataset.type == "sounding") {
      if (that.data.qufen == "rongliang") {
        var sounding = Math.round((that.data.altitudeheight - num) * 1000) / 1000
      } else {
        var sounding = Math.round((that.data.dialtitudeheight - num) * 1000) / 1000
      }
      that.setData({
        sounding: num,
        ullage: sounding
      })
    }
    if (that.data.sounding < 0 || that.data.ullage < 0) {
      wx.showToast({
        title: '高度输入错误',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 提交下一步
  formSubmit: function(e) {
    var that = this;
    that.setData({
      ullage: e.detail.value.ullage
    })
    var form = {
      imei: that.data.imei,
      uid: that.data.uid,
      resultid: that.data.resultid,
      solt: that.data.solt,
      shipid: that.data.shipid,
      altitudeheight: that.data.altitudeheight,
      miniprogram: "yc",
    }
    for (let key in e.detail.value) {
      if (that.data.is_work == 1) {
        if (e.detail.value[key] == '') {
          wx.showToast({
            title: '作业数据不能为空',
            icon: 'none',
            duration: 1000
          })
          that.setData({
            [key + '1']: true
          })
          return;
        }
      }
    }
    if (that.data.sounding < 0 || that.data.ullage < 0) {
      wx.showToast({
        title: '高度输入错误',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (!e.detail.value.qufen) {
      Object.assign(form, {
        qufen: 'rongliang'
      });
    }
    if (that.data.is_work == 2) {
      e.detail.value.sounding = '1'
      e.detail.value.temperature = '1'
      e.detail.value.ullage = '1'
      console.log(e.detail.value.sounding)
    }
    Object.assign(form, e.detail.value);
    if (e.detail.value.qufen == 'rongliang') {
      Object.assign(form, {
        quantity: '1'
      });
    } else if (e.detail.value.qufen == 'diliang') {
      Object.assign(form, {
        quantity: '2'
      });
    }
    if (that.data.solt == '1') {
      Object.assign(form, {
        is_work: "1"
      });
    } else {
      Object.assign(form, {
        is_work: that.data.is_work
      });
    }
    console.log(form)
    if (that.data.is_have_data == "n") {
      wx.request({
        method: "POST",
        dataType: "json",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        url: url.measure,
        data: form,
        success: function(res) {
          console.log(res);
          util.tips(res.data.code, false, res.data.sign);
          if (res.data.code == '1') {
            if (that.data.is_work == 2) {
              wx.showToast({
                title: '提交成功！',
                icon: 'success',
                duration: 1000
              })
            } else {
              wx.navigateTo({
                url: '../correction/index?cabinid=' + e.detail.value.cabinid + '&solt=' + that.data.solt + '&resultid=' + that.data.resultid + '&shipid=' + that.data.shipid
              })
            }
          } else if (res.data.code == '2' && res.data.sign == '4') {
            wx.showModal({
              title: '作业录入',
              content: '该船舱已被作业，是否覆盖数据',
              success(res) {
                if (res.confirm) {
                  Object.assign(form, {
                    is_fugai: 'Y'
                  });

                  wx.request({
                    method: "POST",
                    dataType: "json",
                    header: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    url: url.measure,
                    data: form,
                    success: function(res) {
                      util.tips(res.data.code);
                      if (res.data.code == '1') {
                        if (that.data.is_work == 2) {
                          wx.showToast({
                            title: '提交成功！',
                            icon: 'success',
                            duration: 1000
                          })
                        } else {
                          wx.navigateTo({
                            url: '../correction/index?cabinid=' + e.detail.value.cabinid + '&solt=' + that.data.solt + '&resultid=' + that.data.resultid + '&shipid=' + that.data.shipid + '&is_have_data=' + that.data.is_have_data
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
          }
        }
      })
    } else if (that.data.is_have_data == "y") {
      Object.assign(form, {
        is_fugai: 'N'
      });
      wx.request({
        method: "POST",
        dataType: "json",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        url: url.reckon,
        data: form,
        success: function(res) {
          util.tips(res.data.code, res.data.sign);
          if (res.data.code == '1') {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              duration: 1000
            })
            that.setData({
              ullage: '',
              sounding: '',
              temp: ''
            })
          } else if (res.data.code == '2003') {
            wx.showModal({
              title: '作业录入',
              content: '该船舱已被作业，是否覆盖数据',
              success(res) {
                if (res.confirm) {
                  Object.assign(form, {
                    is_fugai: 'Y'
                  });
                  wx.request({
                    method: "POST",
                    dataType: "json",
                    header: {
                      "content-type": "application/x-www-form-urlencoded"
                    },
                    url: url.reckon,
                    data: form,
                    success: function(res) {
                      if (res.data.code == '1') {
                        wx.showToast({
                          title: '提交成功！',
                          icon: 'success',
                          duration: 1000
                        });
                        setTimeout(function() {

                          app.wxRequest('POST', url.adjustCabin, {
                            imei: that.data.imei,
                            uid: that.data.uid,
                            resultid: that.data.resultid,
                            miniprogram: "yc"
                          }, (res) => {
                            console.log(res)
                            if (that.data.solt == '1') {
                              var cabin_info = res.cabin_info.q
                            } else {
                              var cabin_info = res.cabin_info.h
                            }
                            for (let i in that.data.cabinList) {
                              for (let j in cabin_info) {
                                if (that.data.cabinList[i].id == cabin_info[j].cabinid) {
                                  that.data.cabinList[i].ullage = cabin_info[j].ullage
                                  that.data.cabinList[i].sounding = cabin_info[j].sounding
                                  that.data.cabinList[i].temperature = cabin_info[j].temperature
                                  that.data.cabinList[i].is_work = cabin_info[j].is_work
                                }
                              }
                            }
                            var cabinList = that.data.cabinList
                            that.setData({
                              cabinList,
                              ullage: '',
                              sounding: '',
                              temp: ''
                            })
                            console.log(cabinList)
                          }, (err) => {
                            console.log(err.errMsg)
                          })
                          that.setData({
                            ullage: '',
                            sounding: '',
                            temp: ''
                          })
                        }, 1000);
                      }
                    }
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }
  },
  bindPickerChange: function(e) {
    var that = this;
    var cabinList = that.data.cabinList;
    this.setData({
      index: e.detail.value,
      ullage: that.data.cabinList[e.detail.value].ullage,
      sounding: that.data.cabinList[e.detail.value].sounding,
      temp: that.data.cabinList[e.detail.value].temperature,
      altitudeheight: that.data.cabinList[e.detail.value].altitudeheight,
      dialtitudeheight: that.data.cabinList[e.detail.value].dialtitudeheight
    })
  },
  qufenChange: function(e) {
    var that = this;
    if (e.detail.value == "rongliang") {
      var sounding = Math.round((that.data.altitudeheight - that.data.ullage) * 1000) / 1000;
    } else {
      var sounding = Math.round((that.data.dialtitudeheight - that.data.ullage) * 1000) / 1000;
    }
    that.setData({
      sounding: sounding,
      qufen: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    // 查询舱名
    wx.request({
      method: "POST",
      dataType: "json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: url.cabinList,
      data: {
        imei: imei,
        uid: uid,
        shipid: options.shipid,
        miniprogram: "yc"
      },
      success: function(res) {
        util.tips(res.data.code);
        if (res.data.code == "1") {
          var cabinList = res.data.content
          that.setData({
            cabinList,
            solt: options.solt,
            altitudeheight: cabinList[0].altitudeheight,
            dialtitudeheight: cabinList[0].dialtitudeheight,
          })
        }
        console.log(that.data.cabinList)
      }
    })

    app.wxRequest('POST', url.adjustCabin, {
      imei: imei,
      uid: uid,
      resultid: options.resultid,
      miniprogram: "yc"
    }, (res) => {
      console.log(res)
      if (options.solt == '1') {
        var cabin_info = res.cabin_info.q
      } else {
        var cabin_info = res.cabin_info.h
      }
      for (let i in that.data.cabinList) {
        for (let j in cabin_info) {
          if (that.data.cabinList[i].id == cabin_info[j].cabinid) {
            that.data.cabinList[i].ullage = cabin_info[j].ullage
            that.data.cabinList[i].sounding = cabin_info[j].sounding
            that.data.cabinList[i].temperature = cabin_info[j].temperature
            that.data.cabinList[i].is_work = cabin_info[j].is_work
          }
        }
      }
      var cabinList = that.data.cabinList
      that.setData({
        cabinList,
        ullage: that.data.cabinList[0].ullage,
        sounding: that.data.cabinList[0].sounding,
        temp: that.data.cabinList[0].temperature,
      })
      console.log(cabinList)
    }, (err) => {
      console.log(err.errMsg)
    })

    that.setData({
      sunfa: options.suanfa,
      shipid: options.shipid,
      solt: options.solt,
      is_have_data: options.is_have_data,
      resultid: options.resultid,
      imei: imei,
      uid: uid,
      qufen: "rongliang"
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
    var app = getApp();
    if (app.globalData.skip) {
      wx.reLaunch({
        url: '../index/index'
      })
      getApp().globalData.skip = false
    }
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