// pages/more-movie/more-movie.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    _type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    this.data._type = type
    // console.log(app.gBaseUrl)
    wx.request({
      url: app.gBaseUrl + type,
      data:{
        start:0,
        count:12
      },
      success:(res)=>{
        this.setData({
          movies:res.data.subjects
        })
      },
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let title = '电影'
    switch(this.data._type){
      case 'in_theaters':
        title='正在热映'
        break
      case 'coming_soon':
        title = '即将上映'
        break
      case 'top250':
        title = '豆瓣Top250'
        break
    }
    wx.setNavigationBarTitle({
      title: title,
    })
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
  onPullDownRefresh: function () {  //事件的回调函数（类似递归吧） 这里配置是因为想自定义刷新效果；以加载数据的速度为基准。
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data:{
        start:0,
        count:12,
      },
      success:(res)=>{
        this.setData({
          movies:res.data.subjects  //把数据覆盖掉
        })
        wx.stopPullDownRefresh()  //主动关闭
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // [1,2,3...... 12,13,]
    // [0,1,2....11] + [12,13....23] + [24...35] + [36...47]
    wx.showNavigationBarLoading()
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data:{
        start: this.data.movies.length,  //看看从哪开始请求数据，这个就是目前已经请求的数据。 再请求12调
        count:12
      },
      success:(res)=>{
        // console.log(res)
        this.setData({
          movies:this.data.movies.concat(res.data.subjects)  //将新的12个数据直接加入到原来的数据中去。
        })
        wx.hideNavigationBarLoading()
      }
    })  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})