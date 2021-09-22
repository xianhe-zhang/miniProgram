// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    res: Object,

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   * 组件开发的独立性：组件的开发者不应该决定点击之后做什么事情。
   * 点击之后做什么事情应该有组件的使用者决定
   * 因此引出概念：自定义组件
   */
  methods: {
    onTap(event){
      const pid = this.properties.res.postId
      this.triggerEvent('posttap',{
        pid
      })
       //触发事件
    },
  }
})
