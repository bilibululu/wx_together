Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: false, //是否自动播放
    circular: true, //是否采用衔接滑动
    indicatorDots: true, //是否显示面板指示点
    scrollTop: '', //滑动的距离
    navFixed: false, //导航是否固定
    currentData: 0,
    pictures: [
      "http://pic1.win4000.com/wallpaper/7/58981aef2947c.jpg",
      "http://pic1.win4000.com/wallpaper/b/535f2c92cbe2a_270_185.jpg",
      "http://img3.imgtn.bdimg.com/it/u=143763430,3849919589&fm=15&gp=0.jpg",
      "http://img1.imgtn.bdimg.com/it/u=638880771,1982449750&fm=15&gp=0.jpg"
    ],
    recommendPictures: [
      "http://img3.imgtn.bdimg.com/it/u=338895088,3780206663&fm=26&gp=0.jpg",
      "http://img5.imgtn.bdimg.com/it/u=2598427595,2652637564&fm=15&gp=0.jpg",
      "http://img1.imgtn.bdimg.com/it/u=3806547188,2585718081&fm=15&gp=0.jpg",
      "http://img5.imgtn.bdimg.com/it/u=720416758,2573876011&fm=26&gp=0.jpg",
      "http://img5.imgtn.bdimg.com/it/u=1334930434,597258493&fm=26&gp=0.jpg"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    /** 设备信息 */
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },


  // 获取当前滑块的index
  bindchange: function (e) {
    console.log('获取当前滑块的index')
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    console.log('点击切换')
    const that = this;
    console.log(e.target.dataset.current)
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  //监听滑动
  layoutScroll: function (e) {
    this.data.scrollTop = this.data.scrollTop * 1 + e.detail.deltaY * 1;
    // console.log(this.data.scrollTop)
    // console.log(this.data.navFixed)

    /** 我这里写了固定值 如果使用rpx 可用query可以动态获取其他的高度 然后修改这里值 */
    /** 获取方法参考文档 */

    /** scrollTop 在模拟器上检测不是太灵敏 可在真机上测试 基本上不会出现延迟问题 */
    var navtopHeight = 160;
    if (this.data.scrollTop <= -navtopHeight) {
      this.setData({
        navFixed: true
      })
    } else {
      this.setData({
        navFixed: false
      })
    }
  },
})