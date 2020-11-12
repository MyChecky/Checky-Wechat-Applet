// pages/tab/essay/topicSelect/topicSelect.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputVal: '',
        topicList: [],
        topicListAll: [],
    },

    onLoad: function (options) {
        this.initTopics();
    },

    // 初始化 话题 表
    initTopics: function () {
        var that = this;
        req = {
            url: '/topic/queryAll',
            method: 'POST',
            data: {
                userId: app.globalData.openId,
            },
            success: res => {
                console.log("/topic/queryAll", res.data)
                that.setData({
                    topicListAll: res.data.TopicList,
                    topicList: res.data.TopicList,
                })
            },
            fail: err => {
                console.log(err)
            }
        }
        app.requestWithAuth(req)
            .then(req.success)
            .catch(req.fail)
    },

    // 搜索相关
    searchInput: function () {
        var that = this
        console.log("searchInput", that.data.inputVal)

        req = {
            url: '/topic/queryByKeyword',
            method: 'POST',
            data: {
                userId: app.globalData.openId,
                keyword: that.data.inputVal,
            },
            success: res => {
                console.log("查询结果", res.data)
                that.setData({
                    topicList: res.data.TopicList,
                })
                console.log(this.data)
            },
            fail: err => {
                console.log(err)
            }
        }
        app.requestWithAuth(req)
            .then(req.success)
            .catch(req.fail)
    },

    selectEnd: function (e) {
        console.log("selectEnd", e);
        var topicId = e.currentTarget.dataset.topicid;
        var topicName = e.currentTarget.dataset.content;
        var arr = getCurrentPages()
        arr[arr.length - 2].setData({
            topicId: topicId,
            topicName: topicName,
            isTopicSelected: true,
        })
        console.log(arr[arr.length - 2].data)
        wx.navigateBack({
            delta: 1,
            success: function (res) {
            }
        })

    },

    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },

    hideInput: function () {
        var topicListAll = this.data.topicListAll;
        this.setData({
            inputVal: "",
            topicList: topicListAll,
            inputShowed: false
        });
    },

    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },

    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    }
})