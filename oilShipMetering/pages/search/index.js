// pages/search/index.js
var app = getApp();
var url = require("../../utils/url.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    searchText: [],
    dateStart: '2019-11-19',
    dateEnd: '2019-11-20',
    items: [{
        name: '1',
        value: '首检'
      },
      {
        name: '2',
        value: '末检'
      },
    ],
    list: [],
    solt: 0,
    filter: false,
    p: 1,
  },
  //筛选部分显示、隐藏
  btnFilter() {
    var that = this;
    var filter = !that.data.filter
    that.setData({
      filter
    });
  },
  //开始时间
  bindDateStart(e) {
    this.setData({
      dateStart: e.detail.value
    });
  },
  //结束时间
  bindDateEnd(e) {
    this.setData({
      dateEnd: e.detail.value
    });
  },
  //选择输入项目
  bindPickerChange(e) {
    this.setData({
      index: e.detail.detail.value
    });
    console.log(this.data.index);
  },
  //获取搜索框值
  searchList(e) {
    var that = this
    this.setData({
      searchstr: e.detail.detail.value
    });
  },
  // 查看
  see: function(e) {
    var that = this
    let index = e.currentTarget.dataset.bindex
    wx.navigateTo({
      url: '../query/index?id=' + that.data.list[index].id
    })
  }, //修改备注
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
  adjustment: function(e) {
    var that = this
    let index = e.currentTarget.dataset.bindex
    wx.navigateTo({
      url: '../adjustment/index?id=' + that.data.list[index].id + '&shipid=' + that.data.list[index].shipid
    })
  },
  //搜索
  endsearchList(e, p, clear) {
    let that = this;
    p = p || 1;
    clear = clear || 2
    that.setData({
      p: p
    })
    let imei = wx.getStorageSync('imei');
    let uid = wx.getStorageSync('uid');
    if (that.data.searchstr) {
      if (that.data.index == 0) {
        var ind = {
          shipname: that.data.searchstr
        }
      } else if (that.data.index == 1) {
        var ind = {
          voyage: that.data.searchstr
        }
      } else if (that.data.index == 2) {
        var ind = {
          locationname: that.data.searchstr
        }
      }
    }
    let data = {
      imei: imei,
      uid: uid,
      search: 'Y',
      p: p,
    }
    Object.assign(data, ind);
    console.log(data);
    app.wxRequest('POST', url.resultList, data, (res) => {
      if (res.content.length != 0) {
        if (clear == 2) {
          that.data.list = [];
        }
        var list = that.data.list;
        for (let i = 0; i < res.content.length; i++) {
          list.push(res.content[i]);
        }
        that.setData({
          list
        })
        console.log(that.data.list);
      }
    }, (err) => {
      console.log(err.errMsg)
    })

  },
  btnSub(e, p) {
    let that = this;
    p = p || 1;
    let imei = wx.getStorageSync('imei');
    let uid = wx.getStorageSync('uid');
    if (that.data.searchstr) {
      if (that.data.index == 0) {
        var ind = {
          shipname: that.data.searchstr
        }
      } else if (that.data.index == 1) {
        var ind = {
          voyage: that.data.searchstr
        }
      } else if (that.data.index == 2) {
        var ind = {
          locationname: that.data.searchstr
        }
      }
    }
    let data = {
      imei: imei,
      uid: uid,
      search: 'Y',
      p: p,
      solt: that.data.solt,
      starttime: that.data.dateStart,
      endtime: that.data.dateEnd
    }
    Object.assign(data, ind);
    console.log(data);
    app.wxRequest('POST', url.resultList, data, (res) => {
      if (res.content.length != 0) {
        that.data.list = [];
        var list = that.data.list;
        for (let i = 0; i < res.content.length; i++) {
          list.push(res.content[i]);
        }
        that.setData({
          list
        })
        console.log(that.data.list);
      }
    }, (err) => {
      console.log(err.errMsg)
    })
  },
  checkboxChange: function(e) {
    let that = this
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    // for (let i = 0; i <= e.detail.value.length;i++){
    //   console.log(i);
    // }
    if (e.detail.value.length == 2) {
      that.data.solt = 0;
    } else if (e.detail.value.length == 1) {
      that.data.solt = e.detail.value[0]
    } else {
      that.data.solt = 0
    }
    that.setData({
      solt: that.data.solt
    })
    console.log(that.data.solt)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var dateStart = util.formatTime(new Date(), -1);
    var dateEnd = util.formatTime(new Date(), 0);
    that.setData({
      dateStart,
      dateEnd
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
    var that = this;
    this.endsearchList(1, ++that.data.p, 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})