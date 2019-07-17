const app = getApp()
Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden
    modalMsg: {
      type: String,
      value: '',
    },
    modalTitle: {
      type: String,
      value: '',
    }
  },
  data: {
    text: ''
  },
  methods: {
    // 这里放置自定义方法
    modal_click_Hidden: function () {
      this.setData({
        modalHidden: true,
      })
    },
    // 确定
    Sure: function () {
      this.setData({
        modalHidden: true,
      })
      if(this.data.text!=''){
        this.triggerEvent('appeal', {content: this.data.text})
      }
    },
    getText: function(e){
      this.setData({
        text: e.detail.value
      })
    }
  }
})