// pages/tab/tasks/newtask/newtask.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    numOfSus:[
      { "value": 0 }, { "value": 1 }, { "value": 3 }, { "value": 5 }],
    types: [
      { "typeId": "5301f10a-2df7-4e72-97ac-8e1cbecf9aec", "typeContent": "健身" },
      { "typeId": "a8179f78-69ac-4723-bf23-7b4c695bdf7f", "typeContent": "背单词" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新建任务',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getType: function(){
    wx.request({
      url: app.globalData.base+'/taskType/allType',
      data:{
      },
      success: res => {
        this.Type = res.Type
      },
      fail: err=> {
        wx.showModal({
          title: '提示',
          content: '获取类型列表失败',
          showCancel: false,
          success(res) {
            if (res.confirm) {
            }
          }
        })
      }
    })
  }
})