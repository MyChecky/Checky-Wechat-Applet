// component/toast.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    toastShow: {
      type: Boolean,
      value: false
    },
    toastMsg: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iconClass: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // toast 显示
    toastShow: function (str, icon, duration) {
      this.setData({
        toastShow: true,
        toastMsg: str,
        iconClass: icon
      })
      setTimeout(() => {
        this.setData({
          toastShow: false
        })
      }, duration)
    }
  }
})
