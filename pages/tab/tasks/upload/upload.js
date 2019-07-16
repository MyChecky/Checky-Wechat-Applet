// pages/tab/tasks/upload/upload.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkId:"",
    currentLength: 0,
    currentNum: 0,
    image: [
      { "URL": "" },
      { "URL": "" },
      { "URL": "" },
      { "URL": "" }
    ],
    index: 0,
    content: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskId: options.taskId
    })
  },
  // 文本长度监督
  lengthChange: function (e) {
    var length = e.detail.value.length
    var text = e.detail.value
    this.setData({
      currentLength: length,
      content: text
    })
  },
  // 选择图片
  chooseFile: function(){
    var that = this
    var temp = []
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        temp = res.tempFilePaths
        for (var i = 0; i < temp.length; i++) {
          var n = that.data.index
          var url = temp[i]
          if (n < 4) {
            that.setData({
              ['image[' + n + '].URL']: url,
              index: n + 1,
              currentNum: n + 1
            })
          }
          else break
        }
      },
      fail: function(res) {}
    })
  },
  // 取消上传图片
  cancel: function(e){
    var n = this.data.index-1
    var p = e.target.dataset.index
    console.log(p+":"+this.data.image[p].URL)
    var temp = []
    var j = 0
    for(var i = 0;i<this.data.image.length;i++){
      if(i!=p){
        temp[j] = this.data.image[i]
        j++
      }
    }
    this.setData({
      image: temp,
      index: n,
      currentNum: n
    })
  },
  // 提交
  submit: function(){
    const toast = this.selectComponent("#toast")
    toast.toastShow2('稍等，请勿重复提交', 'fa-spinner fa-pulse')
    var that = this
    // 文本上传
    wx.request({
      url: app.globalData.base + ":" + app.globalData.port + '/check/addCheck',
      method: 'POST',
      data:{
        "checkInfo": {
          "userId": app.globalData.openId,
          "taskId": this.data.taskId,
          "checkTime": app.globalData.date,
        },
        "content": this.data.content
      },
      success(res){
        console.log(res)
        var checkId = res.data.checkId
        var done = 0
        that.setData({
          checkId: checkId
        })
        // 附件上传
        for (var i = 0; i < that.data.index; i++) {
          console.log(that.data.image[i].URL)
          wx.uploadFile({
            url: app.globalData.base + ":" + app.globalData.port + '/check/file/upload',
            filePath: that.data.image[i].URL,
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data"
            },
            formData: {
              'userId': app.globalData.openId,
              'type': 'picture',
              'checkId': checkId
            },
            success(res) {
              console.log(res)
              done++
            },
            fail(err) {
              console.log(err)
              toast.toastShow('上传图片失败', 'fa-exclamation-circle',1000)
              done++
            }
          })
        }
        that.back()
      },
      fail(err){
        console.log(err)
        toast.toastShow('上传失败', 'fa-exclamation-circle',1000)
      }
    })
  },
  back: function(){
    var arr = getCurrentPages()
    arr[arr.length-2].setData({
      checkId: this.data.checkId
    })
    wx.navigateBack({
      delta: 2,
      success: function (res) {
      }
    })
  }
})