// pages/subnav/subnav.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postImg: '',
    description: '',
    editors: null,
    articleLists: null,
    showEditotList: false
  },
  showList: function () {
    console.log(1)
    this.setData({
      showEditotList: !this.data.showEditotList
    })
  },
  getDetail: function (e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/theme/' + options.id,
      success: function (res) {
        that.setData({
          postImg: res.data.background,
          description: res.data.description,
          editors: res.data.editors,
          articleLists: res.data.stories
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