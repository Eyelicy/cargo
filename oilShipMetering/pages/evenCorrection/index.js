// pages/evenCorrection/index.js
var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    keyBoardType: 2,
    content: "",
    item: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    temData: {
      draft1: '',
      draft2: '',
      ullage1: '',
      ullage2: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
    },
    type: 'draft1'
  },
  hideKeyboard() {
    let that = this;
    that.setData({
      isShow: false
    })
  },
  focus: function(e) {
    var that = this
    let temData = {};
    that.setData({
      i: e.currentTarget.dataset.id,
      type: e.currentTarget.dataset.index,
      isShow: true,
      copy: '',
      // copy: that.data.getbook[e.currentTarget.dataset.id][e.currentTarget.dataset.index],
    })
  },
  fzKg: function(e) {
    var that = this;
    let getbook = that.data.getbook;
    let id = e.target.dataset.id;
    getbook[id].ullage2 = getbook[id].ullage1;
    getbook[id].value3 = getbook[id].value1;
    getbook[id].value4 = getbook[id].value2;
    that.setData({
      getbook
    });
  },
  fzCsc: function(e) {
    var that = this;
    let getbook = that.data.getbook;
    wx.showModal({
      title: '提示',
      content: '是否确认复制吃水差',
      success(res) {
        if (res.confirm) {
          for (let i = 0; i < getbook.length; i++) {
            getbook[i].draft2 = getbook[i].draft1;
            getbook[i].value2 = getbook[i].value1;
            getbook[i].value4 = getbook[i].value3;
          }
          that.setData({
            getbook
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  inputChange(e) {
    var that = this
    let type = e.currentTarget.dataset.index;
    let keys = e.detail,
      copy = this.data.copy,
      content = this.data.getbook[that.data.i][type],
      len = content.length;
    // len = content.length;
    switch (keys) {
      case '.':
        // if (len < 11 && content.indexOf('.') == -1) { //如果字符串里有小数点了，则不能继续输入小数点，且控制最多可输入10个字符串
        //   if (content.length < 1) { //如果小数点是第一个输入，那么在字符串前面补上一个0，让其变成0.
        //     content = '0.';
        //   } else { //如果不是第一个输入小数点，那么直接在字符串里加上小数点
        //     content += '.';
        //   }
        // }
        if (len < 11 && content.indexOf('.') == -1) {
          if (content.length < 1) {
            content = '0.';
          } else {
            content += '.';
          }
        }
        console.log(copy, len, copy.indexOf('.'))
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
        break;
      case '↓':
        if (that.data.type == "ullage2" || that.data.type == "value3" || that.data.type == "value4") {
          var i = that.data.i
          var table = that.data.table
          type = that.data.type
          switch (type) {
            case 'ullage2':
              that.setData({
                type: 'draft1'
              })
              break;
            case 'value3':
              that.setData({
                type: 'draft2'
              })
              break;
            case 'value4':
              if (that.data.max > that.data.i) {
                i++
                that.setData({
                  i,
                  type: 'ullage1'
                })
              }

              break;
          }
          content = this.data.getbook[that.data.i][that.data.type]

          wx.pageScrollTo({
            selector: '#test' + that.data.i,
            duration: 300
          })
        } else {
          type = that.data.type
          that.setData({
            type: that.data.table[that.data.table.indexOf(type) + 3]
          })
          content = this.data.getbook[that.data.i][that.data.type]
        }
        break;
      case 'left':
        // 判断是否舱最后元素
        if (that.data.type == "value4") {
          // 判断是否最后一个舱
          if (that.data.max > that.data.i) {
            var i = that.data.i + 1
            var table = that.data.table
            type = that.data.type
            that.setData({
              i,
              type: that.data.table[0]
            })
            content = this.data.getbook[that.data.i][that.data.type]
          }
          wx.pageScrollTo({
            selector: '#test' + that.data.i,
            duration: 300
          })
        } else {
          // 如果不是最后一个元素
          type = that.data.type
          that.setData({
            type: that.data.table[that.data.table.indexOf(type) + 1]
          })
          content = this.data.getbook[that.data.i][that.data.type]
        }
        break;
      default:
        let Index = content.indexOf('.'); //小数点在字符串中的位置
        if (len < 7) { //控制最多可输入7个字符串
          content += keys;
          // var last, start;
          // last = start = content;
          // last = last.slice(-1);
          // start = start.slice(0, content.length - 1);
          // console.log(last, start)
          // content = start + last;
          // switch (content.length) {
          //   case 1:
          //     content = '0.00' + content
          //     break;
          //   case 2:
          //     content = '0.0' + content
          //     break;
          //   case 3:
          //     content = '0.' + content
          //     break;
          //   case 4:
          //     var startNums = content.split("");
          //     startNums.splice(1, 0, '.');
          //     content = startNums.join("");
          //     break;
          //   case 4:
          //     var startNums = content.split("");
          //     startNums.splice(2, 0, '.');
          //     content = startNums.join("");
          //     break;
          // }
        }
        break
    }
    let getbook = this.data.getbook
    if (that.data.type == 'draft1' || that.data.type == 'draft2') {
      for (let i = 0; i <= that.data.max; i++) {
        getbook[i][that.data.type] = content
      }
    } else {
      getbook[that.data.i][that.data.type] = content
    }
    getbook[that.data.i].emptyHeight = that.compare(getbook[that.data.i]["ullage"], getbook[that.data.i]["ullage1"], getbook[that.data.i]["ullage2"]);
    let draught = that.data.draught;
    draught = that.compare(that.data.chishui, getbook[that.data.i]["draft1"], getbook[that.data.i]["draft2"]);
    that.setData({
      draught,
      content,
      getbook
    });

    // let ullage = this.data.getbook[that.data.i]["ullage"]
    // let ullage1 = this.data.getbook[that.data.i]["ullage1"]
    // let ullage2 = this.data.getbook[that.data.i]["ullage2"]
    // let emptyHeight = that.data.emptyHeight
    // that.setData({
    //   emptyHeight
    // })
  },
  formSubmit: function(e) {
    var that = this
    var array = {}
    var imei = wx.getStorageSync('imei');
    var uid = wx.getStorageSync('uid');
    var form = {
      imei: imei,
      uid: uid,
      miniprogram: "yc",
      resultid: that.data.resultid,
      shipid: that.data.shipid,
      solt: that.data.solt
    }
    for (let i in that.data.getbook) {
      var cabinid = 'data[' + i + '][cabinid]'
      array[cabinid] = that.data.getbook[i].cabinid
    }
    for (let i = 0; i < that.data.getbook.length; i++) {
      for (let key in that.data.getbook[i]) {
        if (that.data.getbook[i]['draft1'] == '' && that.data.getbook[i]['ullage1'] == '' && that.data.getbook[i]['value1'] == '') {
          that.setData({
            i: [i],
            type: [key]
          });
          wx.pageScrollTo({
            scrollTop: that.data.i * 312,
            duration: 300
          })
          wx.showToast({
            title: '作业数据不能为空',
            icon: 'none',
            duration: 1000
          });
          return;
        }
      };
    };
    Object.assign(form, array);
    Object.assign(form, e.detail.value);
    app.wxRequest('POST', url.bookdata, form, (res) => {
      console.log(res);
      util.tips(res.code);
      if (res.code == 1) {
        if (res.suanfa == 'a') {
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
        } else if (res.suanfa == 'd') {
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function() {
            wx.reLaunch({
              url: '../index/index'
            })
          }, 1000);
        } else {
          if (that.data.adjustType) {
            wx.navigateTo({
              url: '../evenCapacity/index?resultid=' + that.data.resultid + '&shipid=' + that.data.shipid + '&solt=' + that.data.solt + '&adjustlist=' + that.data.adjustlist + '&adjustType=' + that.data.adjustType,
            })
          } else {
            wx.navigateTo({
              url: '../evenCapacity/index?resultid=' + that.data.resultid + '&shipid=' + that.data.shipid + '&solt=' + that.data.solt,
            })
          }
        }
      } else {
        that.setData({
          i: [res.index],
          type: [res.type]
        });
        wx.pageScrollTo({
          scrollTop: that.data.i * 312,
          duration: 300
        })
      }
    }, (err) => {
      console.log(err.errMsg)
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
      resultid: options.resultid,
      solt: options.solt,
      miniprogram: "yc"
    }
    var table = [
      'draft1', 'draft2', 'ullage1', 'value1', 'value2', 'ullage2', 'value3', 'value4'
    ]
    if (options.adjustlist) {
      var adjustlist = options.adjustlist.split(',');
      console.log(adjustlist);
    }
    app.wxRequest('POST', url.getBook, data, (res) => {
      util.tips(res.code);
      var getbook = res.msg
      if (that.data.adjustlist) {
        var nogetbook = []
        for (let i in getbook) {
          nogetbook.push(res.msg[i])
          if (adjustlist.length > 1) {
            if (adjustlist.indexOf(getbook[i].cabinid) != -1) {
              nogetbook[i].setRed = true
              nogetbook[i].draft1 = ''
              nogetbook[i].draft2 = ''
              nogetbook[i].ullage1 = ''
              nogetbook[i].ullage2 = ''
              nogetbook[i].value1 = ''
              nogetbook[i].value2 = ''
              nogetbook[i].value3 = ''
              nogetbook[i].value4 = ''
            }
          } else {
            if (getbook[i].cabinid == adjustlist) {
              nogetbook[i].setRed = true
              nogetbook[i].draft1 = ''
              nogetbook[i].draft2 = ''
              nogetbook[i].ullage1 = ''
              nogetbook[i].ullage2 = ''
              nogetbook[i].value1 = ''
              nogetbook[i].value2 = ''
              nogetbook[i].value3 = ''
              nogetbook[i].value4 = ''
            }
          }

        }
        getbook = nogetbook
      }
      for (let i in getbook) {
        getbook[i].emptyHeight = that.compare(getbook[i]["ullage"], getbook[i]["ullage1"], getbook[i]["ullage2"]);
      }
      let draught = that.compare(res.chishui, getbook[0]["draft1"], getbook[0]["draft2"]);
      that.setData({
        draught,
        chishui: res.chishui,
        getbook,
        table,
        max: res.msg.length - 1
      })
      console.log(getbook);
    }, (err) => {
      console.log(err.errMsg)
    })
    that.setData({
      shipid: options.shipid,
      resultid: options.resultid,
      solt: options.solt,
      adjustlist: adjustlist,
      adjustType: options.adjustType
    })
  },

  compare(emptyHeight, emptyHeightOne, emptyHeightTwo) {
    if (parseFloat(emptyHeight) == parseFloat(emptyHeightOne) || parseFloat(emptyHeight) == parseFloat(emptyHeightTwo)) {
      return false;
    } else {
      if (parseFloat(emptyHeightOne) < parseFloat(emptyHeightTwo)) {
        if (parseFloat(emptyHeight) >= parseFloat(emptyHeightOne) && parseFloat(emptyHeight) <= parseFloat(emptyHeightTwo)) {
          return false;
        } else {
          return true;
        }
      } else {
        if (parseFloat(emptyHeight) >= parseFloat(emptyHeightTwo) && parseFloat(emptyHeight) <= parseFloat(emptyHeightOne)) {
          return false;
        } else {
          return true;
        }
      }
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