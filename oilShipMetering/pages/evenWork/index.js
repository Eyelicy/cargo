// pages/evenWork/index.js
var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: false,
    contentNums: '',
    isShow: false,
    type: 'ullage',
    dialogShow: false,
    buttons: [{
      text: '取消',
      extClass: 'btnN'
    }, {
      text: '确定',
      extClass: 'btnY'
    }],
    qufen: 'rongliang',
    quantity: 1,
    indexC: 0,
    is_pipeline: 1,
    calculation: [
      "请选择算法",
      "容量计算",
      "底量计算"
    ],
    bottom: [
      "请选择底量货物",
      "有底量货物",
      "无底量货物"
    ],
    indexP: 0,
    pipeline: [
      "请选择管线货物",
      "管线有货物",
      "管线无货物"
    ],
    switchGroup: [{
      title: '计算方式',
      show: false,
      value: true
    }, {
      title: '底量货物',
      show: true,
      value: true
    }, {
      title: '管线货物',
      show: true,
      value: true
    }]
  },
  hideKeyboard() {
    let that = this;
    that.setData({
      isShow: false
    })
  },
  switch1Change(e) {
    var that = this
    var index = e.target.dataset.index
    var switchGroup = that.data.switchGroup
    switch (e.target.dataset.index) {
      case 0:
        if (e.detail.value) {
          var qufen = 'diliang';
          for (let i = 0; i < that.data.cabin.length; i++) {
            if (that.data.cabin[i].sounding !== "") {
              that.data.cabin[i].sounding = Math.round((that.data.cabin[i].dialtitudeheight - that.data.cabin[i].ullage) * 1000) / 1000;
            }
          }
        } else {
          var qufen = 'rongliang';
          for (let i = 0; i < that.data.cabin.length; i++) {
            if (that.data.cabin[i].sounding !== "") {
              that.data.cabin[i].sounding = Math.round((that.data.cabin[i].altitudeheight - that.data.cabin[i].ullage) * 1000) / 1000;
            }
          }
        }
        that.setData({
          qufen
        })
        switchGroup[index].value = e.detail.value
        break;
      case 1:
        if (e.detail.value) {
          var quantity = 1;
        } else {
          var quantity = 2;
        }
        that.setData({
          quantity
        })
        switchGroup[index].value = e.detail.value
        break;
      case 2:
        if (e.detail.value) {
          var is_pipeline = 1;
        } else {
          var is_pipeline = 2;
        }
        that.setData({
          is_pipeline
        })
        switchGroup[index].value = e.detail.value

        break;
    }
    that.setData({
      switchGroup,
      cabin: that.data.cabin
    })
  },
  calculationPicker: function(e) {
    var that = this;
    var qufen = 'rongliang';
    if (that.data.suanfa == "c") {
      if (e.detail.value == 1) {
        qufen = 'rongliang';
        for (let i = 0; i < that.data.cabin.length; i++) {
          if (that.data.cabin[i].sounding !== "") {
            that.data.cabin[i].sounding = Math.round((that.data.cabin[i].altitudeheight - that.data.cabin[i].ullage) * 1000) / 1000;
          }
        }
      } else {
        qufen = 'diliang';
        for (let i = 0; i < that.data.cabin.length; i++) {
          if (that.data.cabin[i].sounding !== "") {
            that.data.cabin[i].sounding = Math.round((that.data.cabin[i].dialtitudeheight - that.data.cabin[i].ullage) * 1000) / 1000;
          }
        }
        console.log(that.data.cabin);
      }
    } else {
      var quantity = parseInt(e.detail.value);
      that.setData({
        quantity
      })
    }
    this.setData({
      cabin: that.data.cabin,
      qufen,
      indexC: e.detail.value
    })
  },
  pipelinePicker: function(e) {
    this.setData({
      is_pipeline: parseInt(e.detail.value),
      indexP: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var data = {
      imei: imei,
      uid: uid,
      shipid: options.shipid,
      miniprogram: "yc"
    }
    var switchGroup = that.data.switchGroup
    if (options.suanfa == 'c') {
      switchGroup[0].show = true
      switchGroup[1].show = false
    }
    // 获取船舱
    app.wxRequest('POST', url.cabinList, data, (res) => {
      util.tips(res.code);
      var cabin = res.content;
      for (let i = 0; i < cabin.length; i++) {
        var data = {
          ullage: '',
          sounding: '',
          temperature: ''
        }
        Object.assign(cabin[i], data);
      }
      that.setData({
        cabin
      })
      console.log(that.data.cabin)
    }, (err) => {
      console.log(err.errMsg)
    })
    // 获取船舱数据
    app.wxRequest('POST', url.adjustCabin, {
      imei: imei,
      uid: uid,
      resultid: options.resultid,
      miniprogram: "yc"
    }, (res) => {
      var cabin = that.data.cabin
      if (options.solt == '1') {
        var cabin_info = res.cabin_info.q
      } else {
        var cabin_info = res.cabin_info.h
      }
      for (let i in that.data.cabin) {
        that.data.cabin[i].ullageFocus = false
        that.data.cabin[i].soundingFocus = false
        that.data.cabin[i].temperatureFocus = false
        for (let j in cabin_info) {
          if (that.data.cabin[i].id == cabin_info[j].cabinid) {
            that.data.cabin[i].ullage = cabin_info[j].ullage
            that.data.cabin[i].sounding = cabin_info[j].sounding
            that.data.cabin[i].temperature = cabin_info[j].temperature
            that.data.cabin[i].is_work = cabin_info[j].is_work
          }
        }
      }
      that.setData({
        cabin
      })
    }, (err) => {
      console.log(err.errMsg)
    })
    that.setData({
      switchGroup,
      resultid: options.resultid,
      shipid: options.shipid,
      solt: options.solt,
      suanfa: options.suanfa,
      is_have_data: options.is_have_data
    })
  },
  formSubmit: function(e) {
    var that = this
    console.log(that.data.cabin)
    var array = {}
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    if (that.data.is_have_data == 'y') {
      var urlPath = url.batchReckon
    } else {
      var urlPath = url.batchMeasure
    }
    var form = {
      imei: imei,
      uid: uid,
      resultid: that.data.resultid,
      solt: that.data.solt,
      shipid: that.data.shipid,
      miniprogram: "yc",
      is_pipeline: that.data.is_pipeline,
      qufen: that.data.qufen,
      quantity: that.data.quantity,
      is_fugai: 'Y'
    }
    Object.assign(form, e.detail.value);
    console.log(form)
    for (let i in that.data.cabin) {
      if (e.detail.value['data[' + i + '][ullage]'] != '' && e.detail.value['data[' + i + '][sounding]'] != '' && e.detail.value['data[' + i + '][temperature]'] != '') {
        var cabinid = 'data[' + i + '][cabinid]'
        var altitudeheight = 'data[' + i + '][altitudeheight]'
        array[cabinid] = that.data.cabin[i].id
        array[altitudeheight] = that.data.cabin[i].altitudeheight
        if (that.data.cabin[i].is_work == 2) {
          var altitudeheigh = 'data[' + i + '][altitudeheight]';
          var cabinid = 'data[' + i + '][cabinid]';
          var ullage = 'data[' + i + '][ullage]';
          var sounding = 'data[' + i + '][sounding]';
          var temperature = 'data[' + i + '][temperature]';
          delete array[altitudeheigh]
          delete array[cabinid]
          delete form[ullage]
          delete form[sounding]
          delete form[temperature]
        }
      }
    }
    for (let i in e.detail.value) {
      if (form[i] == '') {
        delete form[i];
      }
    }
    Object.assign(form, array);
    that.setData({
      urlPath,
      form
    })
    let pushValue = e.detail.value;
    let cabin = that.data.cabin;
    var kong = 0;
    for (let i = 0; i < that.data.cabin.length; i++) {
      if (pushValue['data[' + i + '][ullage]'] === "" && pushValue['data[' + i + '][sounding]'] === "" && pushValue['data[' + i + '][temperature]'] === "") {
        kong++;
        if (kong == that.data.cabin.length) {
          wx.showToast({
            title: '舱作业数据不能全为空',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
      } else {
        if (pushValue['data[' + i + '][ullage]'] === "") {
          cabin[i].ullageFocus = true;
          that.setData({
            cabin
          });
          setTimeout(function() {
            for (let i = 0; i < that.data.cabin.length; i++) {
              cabin[i].ullageFocus = false;
              cabin[i].soundingFocus = false;
              cabin[i].temperatureFocus = false;
            }
            that.setData({
              cabin
            });
          }, 2000);
          wx.showToast({
            title: '请输入“' + that.data.cabin[i].cabinname + '”的空高',
            icon: 'none',
            duration: 1000
          });
          return;
        } else if (pushValue['data[' + i + '][sounding]'] === "") {
          cabin[i].soundingFocus = true;
          that.setData({
            cabin
          });
          setTimeout(function() {
            for (let i = 0; i < that.data.cabin.length; i++) {
              cabin[i].ullageFocus = false;
              cabin[i].soundingFocus = false;
              cabin[i].temperatureFocus = false;
            }
            that.setData({
              cabin
            });
          }, 2000);
          wx.showToast({
            title: '请输入“' + that.data.cabin[i].cabinname + '”的实高',
            icon: 'none',
            duration: 1000
          });
          return;
        } else if (pushValue['data[' + i + '][temperature]'] === "") {
          cabin[i].temperatureFocus = true;
          that.setData({
            cabin
          });
          setTimeout(function() {
            for (let i = 0; i < that.data.cabin.length; i++) {
              cabin[i].ullageFocus = false;
              cabin[i].soundingFocus = false;
              cabin[i].temperatureFocus = false;
            }
            that.setData({
              cabin
            });
          }, 2000);
          wx.showToast({
            title: '请输入“' + that.data.cabin[i].cabinname + '”的温度',
            icon: 'none',
            duration: 1000
          });
          return;
        }
      }
    }

    var dialogShow = that.data.dialogShow
    that.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    var that = this
    var dialogShow = that.data.dialogShow
    if (e.detail.index == 1) {
      that.setData({
        dialogShow: false
      })
      app.wxRequest('POST', that.data.urlPath, that.data.form, (res) => {
        console.log(res.cabinname);
        util.tips(res.code, res.cabinname);
        if (res.code == 1 && that.data.is_have_data == 'y') {
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
        } else if (res.code == 1 && that.data.is_have_data == 'n') {
          wx.navigateTo({
            url: '../evenCorrection/index?resultid=' + that.data.resultid + '&shipid=' + that.data.shipid + '&solt=' + that.data.solt,
          })
        }
      }, (err) => {
        console.log(err.errMsg)
      })
    } else {
      that.setData({
        dialogShow: false
      })
    }
    console.log(e);
  },

  focus: function(e) {
    var that = this
    let contentNums = that.data.contentNums
    contentNums = ""
    that.setData({
      point:false,
      contentNums,
      i: e.currentTarget.dataset.id,
      type: e.currentTarget.dataset.type,
      isShow: true,
    })
  },
  inputChange(e) {
    var that = this
    let type = e.currentTarget.dataset.index;
    let keys = e.detail,
      contentNums = that.data.contentNums,
      content = that.data.cabin[that.data.i][type]
    var cabin = that.data.cabin
    let len = content.length;
    switch (keys) {
      case '.':
        content = contentNums + '.';
        cabin[that.data.i][type] = content
        that.setData({
          point: true,
          cabin
        })
        console.log(contentNums);
        // if (len < 11 && content.indexOf('.') == -1) {
        //   if (contentNums.length < 1) {
        //     content = '0.';
        //   } else {
        //     contentNums += '.';
        //   }
        //   console.log(contentNums);
        //   cabin[that.data.i][type] = contentNums
        //   that.setData({
        //     cabin
        //   })
        // }
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
        content = "";
        contentNums = "";
        cabin[that.data.i][type] = content
        break;
      case '↓':
        contentNums = "";
        var i = that.data.i;
        i++;
        if (i == cabin.length) {
          i = 0
        }
        that.setData({
          i,
          point: false,
        })

        wx.pageScrollTo({
          scrollTop: (that.data.i * 57) + 20,
          duration: 300
        })

        break;
      case 'left':
        contentNums = "";
        i = that.data.i;
        if (type == "ullage") {
          type = "sounding"
          // cabin[that.data.i]['soundingFocus'] = true
        } else if (type == "sounding") {
          type = "temperature"
          // cabin[that.data.i]['temperatureFocus'] = true
        } else if (type == "temperature") {
          i++;
          if (i == cabin.length) {
            i = 0
          }
          type = "ullage"
          // cabin[that.data.i]['ullageFocus'] = true
        }
        that.setData({
          point: false,
          i,
          type,
          cabin
        })
        wx.pageScrollTo({
          scrollTop: (i * 57) + 20,
          duration: 300
        })
        break;
      default:
        let Index = content.indexOf('.'); //小数点在字符串中的位置
        console.log(Index, contentNums);
        if (contentNums.length <= 3) { //控制最多可输入7个字符串
          content += keys;
          contentNums += keys;
          if (!that.data.point) {
            if (type != "temperature") {
              var last, start;
              last = start = contentNums;
              last = last.slice(-1);
              start = start.slice(0, contentNums.length - 1);
              contentNums = start + last;
              switch (contentNums.length) {
                case 1:
                  content = '0.00' + contentNums
                  break;
                case 2:
                  content = '0.0' + contentNums
                  break;
                case 3:
                  content = '0.' + contentNums
                  break;
                case 4:
                  var startNums = contentNums.split("");
                  startNums.splice(1, 0, '.');
                  content = startNums.join("");
                  break;
                case 4:
                  var startNums = contentNums.split("");
                  startNums.splice(2, 0, '.');
                  content = startNums.join("");
                  break;
              }
            }
          }
          cabin[that.data.i][type] = content
          if (content) {
            switch (type) {
              case 'ullage':
                if (that.data.qufen == "rongliang") {
                  cabin[that.data.i]['sounding'] = that.data.cabin[that.data.i].altitudeheight - content
                } else {
                  cabin[that.data.i]['sounding'] = that.data.cabin[that.data.i].dialtitudeheight - content
                }
                break;
              case 'sounding':
                if (that.data.qufen == "rongliang") {
                  cabin[that.data.i]['ullage'] = that.data.cabin[that.data.i].altitudeheight - content
                } else {
                  cabin[that.data.i]['ullage'] = that.data.cabin[that.data.i].dialtitudeheight - content
                }
                break;
            }
          }
        }
        break
    }
    that.setData({
      contentNums,
      cabin,
      content,
    });
    if (cabin[that.data.i].ullage < 0 || cabin[that.data.i].sounding < 0) {
      wx.showToast({
        title: '高度输入错误',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // bindKey: function(e) {
  //   console.log(e);
  //   var that = this
  //   var num = e.detail.value;
  //   var myStr = num.toString();
  //   switch (myStr.length) {
  //     case 1:
  //       if (myStr.indexOf(".") == -1) {
  //         var str2 = "0.00";
  //         var num = str2.concat(myStr)
  //       }
  //       break;
  //     case 2:
  //       if (myStr.indexOf(".") == -1) {
  //         var str2 = "0.0"
  //         var num = str2.concat(myStr)
  //       }
  //       break;
  //     case 3:
  //       if (myStr.indexOf(".") == -1) {
  //         var str2 = "0."
  //         var num = str2.concat(myStr)
  //       }
  //       break;
  //     case 4:
  //       if (myStr.indexOf(".") == -1) {
  //         var num = myStr.slice(0, 1) + '.' + myStr.slice(1)
  //       }
  //       break;
  //     case 5:
  //       if (myStr.indexOf(".") == -1) {
  //         var num = myStr.slice(0, 2) + '.' + myStr.slice(2)
  //       } else if (myStr.indexOf(".") == 2) {
  //         var num = myStr.slice(0, 1) + '.' + myStr.slice(1, 2) + myStr.slice(3, 5)
  //       }
  //       break;
  //   }
  //   if (e.currentTarget.dataset.type == "ullage") {
  //     that.data.cabin[e.currentTarget.dataset.index].ullage = num
  //     if (num !== '') {
  //       if (that.data.qufen == "rongliang") {
  //         that.data.cabin[e.currentTarget.dataset.index].sounding = Math.round((that.data.cabin[e.currentTarget.dataset.index].altitudeheight - num) * 1000) / 1000
  //       } else {
  //         that.data.cabin[e.currentTarget.dataset.index].sounding = Math.round((that.data.cabin[e.currentTarget.dataset.index].dialtitudeheight - num) * 1000) / 1000
  //       }
  //       if (that.data.cabin[e.currentTarget.dataset.index].sounding.toString().length == 1) {
  //         that.data.cabin[e.currentTarget.dataset.index].sounding = parseFloat(that.data.cabin[e.currentTarget.dataset.index].sounding).toFixed(1)
  //       }
  //       var cabin = that.data.cabin
  //       that.setData({
  //         cabin
  //       })
  //     } else if (num == '' && that.data.cabin[e.currentTarget.dataset.index].sounding == '') {
  //       that.data.cabin[e.currentTarget.dataset.index].ullage = ''
  //       that.data.cabin[e.currentTarget.dataset.index].sounding = ''
  //       var cabin = that.data.cabin
  //       that.setData({
  //         cabin
  //       })
  //     }
  //   } else if (e.currentTarget.dataset.type == "sounding") {
  //     that.data.cabin[e.currentTarget.dataset.index].sounding = num
  //     if (num !== '') {
  //       if (that.data.qufen == "rongliang") {
  //         that.data.cabin[e.currentTarget.dataset.index].ullage = Math.round((that.data.cabin[e.currentTarget.dataset.index].altitudeheight - num) * 1000) / 1000
  //       } else {
  //         that.data.cabin[e.currentTarget.dataset.index].ullage = Math.round((that.data.cabin[e.currentTarget.dataset.index].dialtitudeheight - num) * 1000) / 1000
  //       }
  //       if (that.data.cabin[e.currentTarget.dataset.index].ullage.toString().length == 1) {
  //         that.data.cabin[e.currentTarget.dataset.index].ullage = parseFloat(that.data.cabin[e.currentTarget.dataset.index].ullage).toFixed(1)
  //       }
  //       var cabin = that.data.cabin
  //       that.setData({
  //         cabin
  //       })
  //     } else if (num == '' && that.data.cabin[e.currentTarget.dataset.index].sounding == '') {
  //       that.data.cabin[e.currentTarget.dataset.index].ullage = ''
  //       that.data.cabin[e.currentTarget.dataset.index].sounding = ''
  //       var cabin = that.data.cabin
  //       that.setData({
  //         cabin
  //       })
  //     }
  //   }
  //   if (that.data.cabin[e.currentTarget.dataset.index].ullage < 0 || that.data.cabin[e.currentTarget.dataset.index].sounding < 0) {
  //     wx.showToast({
  //       title: '高度输入错误',
  //       icon: 'none',
  //       duration: 2000
  //     })
  //   }
  // },
  temperature: function(e) {
    var that = this
    var cabin = that.data.cabin
    cabin[e.currentTarget.dataset.index].temperature = e.detail.value
    that.setData({
      cabin
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