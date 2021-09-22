import{postList} from '../../data/data.js'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //做数据绑定的就加下划线，一个良好的编程习惯
    postData:{},
    collected:false,
    _pid:null,
    _postsCollected:{},
    isPlaying:false,
    _mgr: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData = postList[options.pid]
    this.data._pid = options.pid
    const postsCollected = wx.getStorageSync('posts_collected')

    this.data._postsCollected = postsCollected
    // if(postsCollected){
    //   this.data._postsCollected = postsCollected
    // }
    let collected = postsCollected[this.data._pid]

    if(collected === undefined){
      //如果undefined 说明文章从来未被收藏过
      collected = false
    }

    this.setData({
      postData,
      collected,
      isPlaying: this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    // //监听函数
    mgr.onPlay(this.onMusicStart)
    // mgr.onStop(this.onMusicStop)
    mgr.onPause(this.onMusicStop)
  },


  async onShare(event){
    const result = await wx.showActionSheet({
      itemList: ['分享到QQ','分享到微信','分享到魔法学院']
    })

  },

  currentMusicIsPlaying(){
    if(app.gIsPlayingMusic && app.gIsPlayingPostId === this.data._pid ){
      return true
    }
    return false
  },


  onMusicStart(event){
    const mgr = this.data._mgr
    
    const music = postList[this.data._pid].music 
    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImgUrl

    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid

    this.setData({ 
      isPlaying:true
    })
  },

  onMusicStop(){
    const mgr = this.data._mgr
    mgr.pause()  //这里 到底是stop还是pause取决于自己的业务逻辑
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying:false
    })
  },


  //难点
  async onCollect(event){
    //未收藏 -> 收藏
    const postsCollected = this.data._postsCollected //这里声明的是读取过后的缓存。
    postsCollected[this.data._pid] = !this.data.collected //这里是取返的过程
    
    //通过数据绑定更改UI层 
    this.setData({
      collected: !this.data.collected,
    })

    wx.setStorageSync('posts_collected', postsCollected)
    wx.showToast({
      title: !this.data.collected?'取消收藏':'收藏成功',
      duration: 3000,
    })


    //下面是showModel的用法，一般用上述轻体量的。
    // const result = await wx.showModal({
    //   title:"是否收藏文章"
    // })
    // if(result.confirm){
    //   const postsCollected = this.data._postsCollected //这里声明的是读取过后的缓存。
    //   postsCollected[this.data._pid] = !this.data.collected //这里是取返的过程
    
    // //通过数据绑定更改UI层 
    //   this.setData({
    //     collected: !this.data.collected
    //   })

    //   wx.setStorageSync('posts_collected', postsCollected)
    // }
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