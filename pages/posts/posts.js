// pages/posts/posts.js
//var postData = require("../../data/data.js")
import{postList} from '../../data/data.js'
//console.log(postList)


Page({
  /**
   * 页面的初始数据
   * 生命周期：load/show/ready；大多数都写在onload中，异步一些是写在show和ready中。
   * 条件渲染 wx:if={{}},  wx:else 
   * 列表渲染
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   * 也叫钩子函数，由浏览器进程自动调用
   * onload用的最多
   * ES6:如果变量名与值一样的话，那么可以只用写一个postList
   */
  async onLoad(options) {
    this.setData({
      postList})
    wx.setStorageSync('flag', true)
    // wx.clearStorageSync()
    // wx.removeStorageSync('key')
    // const flag = wx.getStorageSync('key') 获取同步的缓存数据。
    // 不管APP如何重启，这里的缓存可以一直保存

    //异步  async 与 await是最新的用法，promise也可以
    const flag = await wx.getStorage({
      key: 'flag',
      // 传统的用法
      // success(data){      //回调函数
      //   console.log(data.data)
      // }
    })

    // promise的用法
    // flag.then((value) =>{
    //   console.log(value)
    // })



  },

  onGoDetail(event){
    //const pid = event.currentTarget.dataset.postId //这是获得自定义属性的ID
    const pid = event.detail.pid | event.currentTarget.dataset.postId // 或
    console.log(pid)
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid=' + pid 
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