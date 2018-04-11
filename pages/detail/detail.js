// pages/detail/detail.js
var WxParse = require('../../wxParse/wxparse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    content: '',
    postImg: '',
    title: '',
    imgSource: '',
    comments: 0,
    long: 0,
    short: 0,
    like: 0,
    likeImg: '../../images/praise.png',
    isLiked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 新闻详情
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      success: function (res) {
        that.setData({
          id: res.data.id,
          title: res.data.title,
          imgSource: res.data.image_source,
          postImg: res.data.image,
          content: WxParse.wxParse('article', 'html', res.data.body, that, 5)
        })
      }
    })
    // 新闻额外信息
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/story-extra/' + options.id,
      success: function (res) {
        that.setData({
          long: res.data.long_comments,
          short: res.data.short_comments,
          comments: res.data.comments,
          like: res.data.popularity
        })
      }
    })
  },
  // 点赞
  onLiked: function (e) {
    if (!this.isLiked) {
      this.isLiked = true;
      this.setData({
        likeImg: '../../images/praise_s.png',
        like: this.data.like + 1
      })
    } else {
      this.isLiked = false;
      this.setData({
        likeImg: '../../images/praise.png',
        like: this.data.like - 1
      })
    }
  },
  scanComments: function (e) {
    const id = e.currentTarget.id
    const long = e.currentTarget.dataset.long
    const short = e.currentTarget.dataset.short
    wx.navigateTo({
      url: '/pages/comments/comments?id=' + id + '&long=' + long + '&short=' + short
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

  }
})