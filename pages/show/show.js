var app = getApp()
Page({

  data: {
    toshow: {},
    circular: true,
    scrollTop: '', //滑动的距离
    navFixed: false, //导航是否固定
    currentData: 1,
    btn_content:'申请'
  },


  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
      data: {
        Parea: that.data.currentData
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        if (!res.data.error_code) {
          that.setData({
            toshow: res.data.data
          })
          console.log(that.data.toshow)
        }
      },
      fail: function() {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })

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
  bindchange: function(e) {
    console.log('获取当前滑块的index')
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function(e) {
    console.log('点击切换')
    const that = this;
    console.log(e.target.dataset.current)
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })

      wx.request({
        url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
        data: {
          Parea: that.data.currentData
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          if (!res.data.error_code) {
            that.setData({
              toshow: res.data.data
            })
            console.log(that.data.toshow)
          }
        },
        fail: function () {
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          })
        }
      })

    }
  },

  //监听滑动
  layoutScroll: function(e) {
    this.data.scrollTop = this.data.scrollTop * 1 + e.detail.deltaY * 1;
    console.log(this.data.scrollTop)
    console.log(this.data.navFixed)

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

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    var that = this;
    wx.request({
      url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
      data: {
        Parea: that.data.currentData
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        if (!res.data.error_code) {
          that.setData({
            toshow: res.data.data
          })
          console.log(that.data.toshow)
          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
        }
      },
      fail: function() {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  onReachBottom: function() {

  },

apply:function(){
  var that=this;
  wx.showLoading({
    title: '申请组队中',
  })
  wx.request({
    url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
    data: {
     openid:app.globalData.id
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
     wx.hideLoading()
     
    },
    fail: function () {
      wx.showToast({
        title: '申请失败',
        icon: 'none',
        duration: 2000
      })
    }
  })
}
})