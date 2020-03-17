// component/keyBoard/index.js
Component({

  externalClasses: ['v-panel'],

  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    buttonBorder: {
      type: String,
      value: "1px solid #ccc"
    },
    backgroundColor: {
      type: String,
      value: "#fff"
    },
    //1为省份键盘，其它为英文键盘
    keyBoardType: {
      type: Number,
      value: 1,
    },
    copy: {
      type: String,
      value: '',
    }
  },
  data: {
    keyVehicle1: '陕京津沪冀豫云辽',
    keyVehicle2: '黑湘皖鲁新苏浙赣',
    keyVehicle3: '鄂桂甘晋蒙吉闽贵',
    keyVehicle4: '粤川青藏琼宁渝',
    keyNumber: '789',
    keyEnInput1: '456',
    keyEnInput2: '123',
    keyEnInput3: ['.', '0', '↓'],
  },
  methods: {
    vehicleTap: function(event) {
      let val = event.target.dataset.value;
      switch (val) {
        case 'delete':
          // this.triggerEvent('delete', val);
          this.triggerEvent('inputchange', val);
          break;
        case 'ok':
          this.triggerEvent('ok');
          break;
        default:
          this.triggerEvent('inputchange', val);
      }
    },
  }
});