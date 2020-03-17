// pages/registered/index.js

var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");
var upng = require("../../utils/UPNG.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    userName: '',
    title: '',
    pwd: '',
    need_claimed:1,
    sendTime: '获取验证码',
    snsMsgWait: 60,
    smsFlag: false,
    companyName: '',
    confirm_pwd: '',
    firmtype: '',
    tempFilePaths: '',
    socialCreditCode: '',
    failure: '',
    firm_name: '',
    filename: [],
    path: [],
    showModel: false,
    step: 1,
    companyType: [{
      text: '船舶',
      value: 2
    }, {
      text: '检验',
      value: 1
    }]
  },
  nextStep(event) {
    var that = this;
    var step = that.data.step;
    var index = event.currentTarget.dataset.index;
    var showModel = that.data.showModel;
    var phone = that.data.phone;
    var code = that.data.code;
    var title = that.data.title;
    var userName = that.data.userName;
    var pwd = that.data.pwd;
    var confirm_pwd = that.data.confirm_pwd;
    var companyName = that.data.companyName;
    var firmtype = that.data.firmtype;
    var socialCreditCode = that.data.socialCreditCode;
    var base64 = that.data.base64
    var filename = that.data.filename
    var imei;
    switch (index) {
      case '1':
        app.wxRequest('POST', url.verify_code, {
          phone: phone,
          code: code
        }, (res) => {
          util.tips(res.code);
          if (res.code == 1) {
            step++;
            that.setData({
              step
            })
            console.log(step);
          }
        }, (err) => {
          console.log(err.errMsg)
        })
        break
      case '2':
        wx.login({
          success(res) {
            imei = res.code;
            if (pwd === confirm_pwd) {
              app.wxRequest('POST', url.register, {
                title: title,
                username: userName,
                pwd: pwd,
                confirm_pwd: confirm_pwd,
                phone: phone,
                imei: imei,
                code: code
              }, (res) => {
                util.tips(res.code);
                if (res.code == 1009) {
                  console.log(imei)
                  step++;
                  wx.setStorageSync('uid', res.content.id);
                  wx.setStorageSync('imei', imei);
                }
                that.setData({
                  step
                })
              }, (err) => {
                console.log(err.errMsg)
              })
            } else {
              wx.showToast({
                title: '密码不一致，请确认',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
        break
      case '3':
        step++;
        break
      case '4':
        var imei = wx.getStorageSync('imei');
        var uid = wx.getStorageSync('uid');
        app.wxRequest('POST', url.check_name, {
          imei: imei,
          uid: uid,
          name: companyName,
          miniprogram: 'yc'
        }, (res) => {
          if (res.code == 1) {
            app.wxRequest('POST', url.perfect, {
              uid: uid,
              imei: imei,
              firmname: companyName,
              firmtype: firmtype,
              people: userName,
              phone: phone
            }, (res) => {
              util.tips(res.code);
              if (res.code == 1) {
                step++;
                wx.setStorageSync('type', res.content.firmtype);
                wx.setStorageSync('firmid', res.content.firmid);
                that.setData({
                  step
                })
              }
            }, (err) => {
              console.log(err.errMsg)
            })
          } else if (res.code == 2037) {
            showModel = true;
            if (res.need_claimed == 0){
              that.setData({
                admin: res.admin,
                need_claimed: res.need_claimed
              })
            } else if (res.need_claimed == 1){
              that.setData({
                need_claimed: res.need_claimed
              })
            }
          }
          that.setData({
            showModel
          })
        }, (err) => {
          console.log(err.errMsg)
        })
        // step++;
        break
      case '5':
        wx.redirectTo({
          url: '../index/index'
        })
        break
      case '6':
        var imei = wx.getStorageSync('imei');
        var uid = wx.getStorageSync('uid');
        if (filename.length != 0) {
          app.wxRequest('POST', url.claimed_firm, {
            shehuicode: socialCreditCode,
            firmname: companyName,
            uid: uid,
            imei: imei,
            img: base64
          }, (res) => {
            // util.tips(res.code);
            console.log(res);
            if (res.code == 1) {
              that.uploadimg({
                url: url.claimed_file + '&uid=' + uid + '&imei=' + imei + '&review_id=' + res.review_id + '&miniprogram=yc',
                path: that.data.path,
              });
              that.setData({
                step: 7
              })
            }
          }, (err) => {
            console.log(err.errMsg)
          })
        } else {
          wx.showToast({
            title: '舱容表文件不能为空',
            icon: "none",
            duration: 2000,
            mask: true
          })
        }
        break
      case '7':
        wx.clearStorageSync();
        wx.redirectTo({
          url: '../login/login'
        })
        break;
      case '8':
        var uid = wx.getStorageSync('uid');
        app.wxRequest('POST', url.reset_status, {
          uid: uid
        }, (res) => {
          // util.tips(res.code);
          console.log(res);
          if (res.code == 1) {
            step = 4;
            that.setData({
              step
            })
          }
        }, (err) => {
          console.log(err.errMsg)
        })
        break;
      case '9':
        var uid = wx.getStorageSync('uid');
        app.wxRequest('POST', url.reset_status, {
          uid: uid
        }, (res) => {
          // util.tips(res.code);
          console.log(res);
          if (res.code == 1) {
            wx.redirectTo({
              url: '../index/index'
            })
          }
        }, (err) => {
          console.log(err.errMsg)
        })
        break;
    }
    that.setData({
      showModel,
      step
    })
  },
  uploadimg: function(data) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',
      formData: {
        //此处可以传自定义参数……
      },
      header: {
        "Content-Type": "multipart/form-data",
        //"sessionId": getApp().globalData.sessionId,
      },
      success: (resp) => {
        console.log(resp)
        success++;
      },
      fail: (res) => {
        fail++;
      },
      complete: () => {
        i++;
        if (i == data.path.length) { //当图片传完时，停止调用
          wx.showToast({
            title: '上传成功',
            duration: 1500,
            mask: 'false'
          })
          that.setData({
            tempFilePaths: []
          })
        } else { //若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },
  // 上传营业执照
  chooseImage() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var size = res.tempFiles[0].size;
        if (size > 8194304) {
          wx.showToast({
            title: '图片大小不能超过8MB',
            icon: "none",
            duration: 2000,
            mask: true
          })
        } else {
          let base64 = 'data:image/png;base64,' + wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64');
          console.log(base64)
          that.setData({
            base64,
            tempFilePaths: res.tempFilePaths[0]
          })
        }
      }
    })
  },
  //上传舱容表
  upCabin() {
    var that = this;
    var filename = that.data.filename;
    var path = that.data.path;
    wx.chooseMessageFile({
      count: 10, //能选择文件的数量
      type: 'file', //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
      success(res) {
        for (let key in res.tempFiles) {
          filename.push(res.tempFiles[key].name);
          if (filename[key].indexOf(".pdf") == -1 && filename[key].indexOf(".doc") == -1 && filename[key].indexOf(".docx") == -1 && filename[key].indexOf(".xls") == -1 && filename[key].indexOf(".xlsx") == -1) {
            wx.showToast({
              title: '文件格式不对，请重新选择',
              icon: "none",
              duration: 2000,
              mask: true
            })
          } else {
            path.push(res.tempFiles[key].path);
            that.setData({
              filename,
              path
            })
          }
        }
        console.log(res.tempFiles)
        console.log(filename)
        console.log(path)
      }
    })
  },
  //获取验证码
  getCode() {
    var that = this;
    var phone = that.data.phone;

    if (phone == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }

    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone))) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }

    var inter = setInterval(function() {
      this.setData({
        smsFlag: true,
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + 's后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#fff',
          sendTime: '获取验证码',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);

    app.wxRequest('POST', url.send_sms, {
      phone: phone
    }, (res) => {
      util.tips(res.code);
      console.log(res);
    }, (err) => {
      console.log(err.errMsg)
    })
  },
  again() {
    this.setData({
      showModel: false
    })
  },
  companyClaim() {
    this.setData({
      step: 6,
      showModel: false
    })
  },
  companyChange(e) {
    this.setData({
      firmtype: e.detail.value
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  codeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  userName(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  title(e) {
    this.setData({
      title: e.detail.value
    })
  },
  socialCreditCode(e) {
    this.setData({
      socialCreditCode: e.detail.value
    })
  },
  pwd(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  confirm_pwd(e) {
    this.setData({
      confirm_pwd: e.detail.value
    })
  },
  companyName(e) {
    this.setData({
      companyName: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this
    if (options.step) {
      that.setData({
        phone: options.phone,
        userName: options.userName,
        firm_name: options.firm_name,
        failure: options.failure,
        step: options.step
      })
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