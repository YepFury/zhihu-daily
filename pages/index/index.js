// pages/index/index.js
const util = require('../../utils/util.js')
const logoArr = [
  '../../images/xin.png',
  '../../images/tui.png',
  '../../images/ying.png',
  '../../images/wu.png',
  '../../images/she.png',
  '../../images/gong.png',
  '../../images/cai.png',
  '../../images/hu.png',
  '../../images/you.png',
  '../../images/yin.png',
  '../../images/dong.png',
  '../../images/ti.png'
]
Page({
  onReachBottom: function () {
    console.log(util.formatTime(new Date()))
  },
  /**
   * 页面的初始数据
   */
  data: {
    swiperLists: null,
    navLists: null,
    dataLists: [],
    onBottomTimes: 0,
    animationData: null
  },
  getDetail: function (e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  navClick: function (e) {
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/subnav/subnav?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    this.getLists();
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/themes',
      success: function (res) {
        res.data.others.map(function (item, index) {
          item.miniLogo = logoArr[index];
        })
        that.setData({
          navLists: res.data.others
        })
      }
    })
  },
  /**
   * 获取新闻列表
   */
  getLists: function () {
    var that = this;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function (res) {
        var dataObj = {}
        dataObj.title = '今日要闻';
        dataObj.data = res.data.stories;
        that.setData({
          dataLists: that.data.dataLists.concat([dataObj]),
          swiperLists: res.data.stories.slice(0, 5)
        })
      }
    });

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
    this.getLists();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (this.data.onBottomTimes > 3) {
      console.log('触底了')
      return false;
    }
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/' + util.formatDate(new Date(new Date().getTime() - parseInt(this.data.onBottomTimes) * 24 * 60 * 60 * 1000)),
      success: function (res) {
        var dataObj = {}
        dataObj.title = util.titleFmt(new Date(new Date().getTime() - parseInt(that.data.onBottomTimes + 1) * 24 * 60 * 60 * 1000));
        dataObj.data = res.data.stories;
        that.setData({
          dataLists: that.data.dataLists.concat([dataObj])
        })
        that.data.onBottomTimes++;
      }
    });

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})