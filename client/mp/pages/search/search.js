const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    hotKey: [],
    result: []
  },
  watch: {//需要监听的字段
    'query': function (value) {
      this._debounce(this._getResult, 200)(this.data.query)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.initWatch(this)
    this._getHotKey()
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  bindKeyInput: function (e) {
    this.setData({
      query: e.detail.value
    })
  },
  addQuery: function (e) {
    const query = e.currentTarget.dataset.query
    this.setData({
      query: query
    })
  },
  clearQuery: function () {
    this.setData({
      query: ''
    })
  },
  jumpToDetail: function (e) {
    const id = e.currentTarget.dataset.routeId
    wx.navigateTo({
      url: `/pages/route-line/route-line?id=${encodeURIComponent(id)}&downOrUp=down`
    })
  },
  _getHotKey: function () {
    wx.request({
      url: 'https://api.limonplayer.cn/jsonp/zhoushanbus/getHotKey',
      header: {
        "content-type": "json"
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            hotKey: res.data.data
          })
        }
      }
    })
  },
  _getResult: function (q) {
    wx.request({
      url: `https://api.limonplayer.cn/jsonp/zhoushanbus/search?w=${q}`,
      header: {
        "content-type": "json"
      },
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            result: res.data.data
          })
        }
      }
    })
  },
  _debounce: function (func, delay) {
    let timer
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
})