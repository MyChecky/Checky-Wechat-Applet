// pages/tab/tasks/tag.js
const app = getApp()
var util = require("../../../../utils/util.js")
Page({

  /**
   * Page initial data
   */
  data: {
    currentTab: 0,
    choosenTags: [],
    hotTopic: [
      {
        'index': 1,
        'url': '#',
        'param': '话题',
        'name': '今天你上岸了吗',
      },
      {
        'index': 2,
        'url': '#',
        'param': '话题',
        'name': '托福分手',
      },
      {
        'index': 3,
        'url': '#',
        'param': '话题',
        'name': '雅思冲！',
      },
    ],
    hotTag: [
      {
        'index': 1,
        'url': '#',
        'param': '标签',
        'name': '跑步',
      },
      {
        'index': 2,
        'url': '#',
        'param': '标签',
        'name': '考研',
      },
      {
        'index': 3,
        'url': '#',
        'param': '标签',
        'name': '单词',
      }, {
        'index': 4,
        'url': '#',
        'param': '标签',
        'name': '英语',
      },
    ],
    allTag:[],
    allTagInType:[],
    allType:[]
  },
  addTag: function (e) {
    console.log(e.target)
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    var that = this;
    this.setData({
      path: app.getAbsolutePath() + '/',
    })
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          height: res.windowHeight
        })
        that.reqAllTag()
        that.reqTagByTypeId()
        that.reqAllType()
      },
    })
  },
  //获取所有标签
  reqAllTag: function () {
    var that = this
    req = {
      url: '/tag/queryAll',
      method: 'POST',
      success(res) {
        console.log(res.data)
        if (!res.data) {
          that.setData({
            infomation: "nomore"
          })
        } else {
          that.setData({
            infomation: "loading",
            allTag: res.data,
          })
        }
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  //通过类型id获取标签
  reqTagByTypeId: function () {
    var that = this
    req = {
      url: '/typeTag/getByTypeId',
      method: 'POST',
      data:{
        typeId:'1',
      },
      success(res) {
        console.log(res.data)
        if (!res.data) {
          that.setData({
            infomation: "nomore"
          })
        } else {
          that.setData({
            infomation: "loading",
            allTagInType: res.data,
          })
        }
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  //选择标签并跳转
  jumpTo: function(e){
    var text = e.target.dataset.param
    var typeId = e.target.dataset.type
    var arr = getCurrentPages()
    arr[arr.length - 2].setData({
      type: typeId,
      typeContent: text,
      index: 0
    })
    console.log(e.target.dataset.param)
    wx.navigateBack({
      delta: 1,
      success: function(res){
      }
    })
  },
  //获取所有类型
  reqAllType:function(){
    var that = this
    req = {
      url: '/admin/taskType/allType',
      method: 'POST',
      data:{
        page:1,
        pageSize:20,
      },
      success(res) {
        console.log(res.data)
        if (!res.data) {
          that.setData({
            infomation: "nomore"
          })
        } else {
          that.setData({
            infomation: "loading",
            allType: res.data.data,
          })
        }
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  //顶部切换页面
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})