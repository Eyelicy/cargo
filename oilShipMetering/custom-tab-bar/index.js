Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#fff",
    list: [{
      pagePath: "/pages/index/soltN",
      iconPath: "/image/befor_homework_btn_not_selected.png",
      selectedIconPath: "/image/befor_homework_btn_selected.png",
      text: "作业前"
    }, {
      pagePath: "/pages/index/soltY",
      iconPath: "/image/after_homework_btn_not_selected.png",
      selectedIconPath: "/image/after_homework__btn_selected.png",
      text: "作业后"
    }]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const index = e.currentTarget.dataset.index
      this
      console.log(data, index);
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})