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
    },
    // toast 永久显示
    toastShow2: function (str, icon) {
      this.setData({
        toastShow: true,
        toastMsg: str,
        iconClass: icon
      })
    },
    // toast 更换
    toastChange: function(str, icon){
      this.setData({
        toastMsg: str,
        iconClass: icon
      })
    },
    // toast 停止
    toastStop: function(){
      this.setData({
        toastShow: false
      })
    }
  }
})
