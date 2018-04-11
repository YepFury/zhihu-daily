// pages/comments/comments.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    long: 0,
    short: 0,
    shortList: null,
    longList: null,
    likeImg: '../../images/praise_fill_small.png',
    likedImg: '../../images/praise_fill_small_liked.png',
    open: 'on'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    this.setData({
      long: options.long,
      short: options.short,
    })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/story/' + options.id + '/short-comments',
      success: function (res) {
        res.data.comments.map(function (item, index) {
          item.time = util.formatTime(new Date(item.time));
          item.isLiked = false;
        });
        that.setData({
          shortList: res.data.comments
        })
      }
    })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/story/' + options.id + '/long-comments',
      success: function (res) {
        that.setData({
          longList: res.data.comments
        })
      }
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