// pages/tab/essay/essaySendMessage/essaySendMessage.js
const app = getApp();
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

var socketOpen = false;
var frameBuffer_Data, session, SocketTask;
var url = 'ws://192.168.1.108:8080/Checky/socket/';

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    msgList: [],

    setData: '',
    targetUserId: '',
    targetUserName: '',
    targetUserAvatar: '',

    scrollHeight: '100vh',
    inputBottom: 0,
    contentSend: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    const toast = this.selectComponent("#toast")
    // initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
      targetUserAvatar: options.targetUserAvatar,
      targetUserId: options.targetUserId,
      targetUserName: options.targetUserName,
    });
    console.log(that.data)
    req = {
      url: '/friend/initMsgList',
      method: 'POST',
      header: {
        "sessionKey": app.globalData.sessionKey,
        "userId": app.globalData.openId
      },
      data: {
        "userId": app.globalData.openId,
        'targetUserId': that.data.targetUserId,
      },
      success(res) {
        console.log(res)
        that.setData({
          msgList: res.data.msgLists,
          inputVal: '',
        })
        SocketTask.onOpen(res => {
          socketOpen = true;
          console.log('监听 WebSocket 连接打开事件。', res)
        })
        SocketTask.onClose(onClose => {
          console.log('监听 WebSocket 连接关闭事件。', onClose)
          socketOpen = false;
          that.webSocket()
        })
        SocketTask.onError(onError => {
          console.log('监听 WebSocket 错误。错误信息', onError)
          socketOpen = false
        })
        SocketTask.onMessage(onMessage => {
          console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', onMessage)
          var onMessageData = JSON.parse(onMessage.data)
          console.log(onMessageData)
          if (onMessageData.state != 'init') {
            that.judgeDate(new Date(onMessageData.date));
            that.data.msgList.push({
              speaker: 'server',
              contentType: 'text',
              content: onMessageData.content,
              date: onMessageData.date,
            })
            var mg = that.data.msgList
            // var inputVal = '';
            that.setData({
              msgList: mg,
              inputVal: '',
            });
            console.log(that.data)
          }

        })
      },
      fail(err) {
        console.log(err)
        toast.toastShow('初始化消息列表失败', 'fa-exclamation-circle', 1000)
      }
    }
    app.requestWithAuth(req)
      .then(req.success)
      .catch(req.fail)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!socketOpen) {
      this.webSocket()
    }
  },

  webSocket: function() {
    // var urlTotal = url + app.globalData.openId
    var urlTotal = url + app.globalData.openId + '/' + app.globalData.sessionKey + '/' + this.data.targetUserId;
    console.log(urlTotal);
    // 创建Socket
    SocketTask = wx.connectSocket({
      url: urlTotal,
      data: 'data',
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function(res) {
        console.log('WebSocket连接创建', res);
        socketOpen = true;
      },
      fail: function(err) {
        toast.toastShow('网络异常', 'fa-exclamation-circle', 1000)
        console.log(err)
      },
    })
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

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (this.data.msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);
  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (this.data.msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    var timeNowStr = this.judgeDate(new Date);
    this.data.msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value,
      date: timeNowStr,
    })
    var mg = this.data.msgList
    // var inputVal = '';
    this.setData({
      msgList: mg,
      inputVal: '',
    });
    console.log(this.data);
    this.sendMessage(e.detail.value, timeNowStr);
  },

  contentChange: function(e) {
    var text = e.detail.value
    this.setData({
      contentSend: text
    })
  },

  sendButton: function(e) {
    var timeNowStr = this.judgeDate(new Date);
    this.data.msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: this.data.contentSend,
      date: timeNowStr,
    })
    var mg = this.data.msgList
    // var inputVal = '';
    this.setData({
      msgList: mg,
      inputVal: '',
    });
    console.log(this.data)
    this.sendMessage(this.data.contentSend, timeNowStr);
  },

  sendMessage: function(content, timeStr) {
    console.log("准备发送消息！", content, timeStr, socketOpen)
    var dateObj = {
      "content": content,
      "date": timeStr,
      "toUserId": this.data.targetUserId,
      "fromUserId": app.globalData.openId,
    };
    // 发送消息到服务器
    if (socketOpen) {
      wx.sendSocketMessage({
        data: JSON.stringify(dateObj),
        success: function(res) {
          console.log("发送成功", res)
        },
        fail: function(res) {
          console.log("发送失败", res)
        }
      })
    }
  },

  // 这里的judgedate只做自己页面的显示，不传回后台
  judgeDate: function(date) {
    var that = this;
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const da = [year, month, day].map(this.formatNumber).join('-')
    const time = [hour, minute, second].map(this.formatNumber).join(':')
    var dateNowStr = [da, time].join(' ')

    // 如果聊条历史记录不为空
    if (that.data.msgList.length > 0) {
      var millsDiff = 180000;
      console.log(that.data.msgList);
      var lastDate = that.data.msgList[that.data.msgList.length - 1].date;
      // lastDate = lastDate.substring(0, 19);
      lastDate = lastDate.replace(/-/g, '/');
      var lastTimestamp = new Date(lastDate).getTime();
      var nowTimestamp = date.getTime();
      if (nowTimestamp - lastTimestamp > millsDiff) { // 如果最新聊天消息与上一条相差大于三分钟
        that.data.msgList.push({
          speaker: 'time',
          contentType: 'text',
          content: dateNowStr,
          date: dateNowStr,
        })
        var mg = that.data.msgList
        // var inputVal = '';
        that.setData({
          msgList: mg,
          inputVal: '',
        });
      }
    } else { // 如果聊条历史记录为空
      that.data.msgList.push({
        speaker: 'time',
        contentType: 'text',
        content: dateNowStr,
        date: dateNowStr,
      })
      var mg = that.data.msgList
      // var inputVal = '';
      that.setData({
        msgList: mg,
        inputVal: '',
      });
    }
    return dateNowStr;
  },

  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  formatTimeWithSecond: function(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const da = [year, month, day].map(this.formatNumber).join('-')
    const time = [hour, minute, second].map(this.formatNumber).join(':')

    return [da, time].join(' ')
    // that.formatTimeWithSecond(new Date())
  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.closeSocket({
      success: function(res) {
        console.log("离开界面，成功关闭", res)
      },
      fail: function(res) {
        console.log("离开界面，关闭失败", res)
      }
    })
    wx.navigateBack({})
  }

})