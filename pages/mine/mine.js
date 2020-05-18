var app = getApp()
Page({

  data: {
    toshow: {},
    circular: true,
    scrollTop: '', 
    navFixed: false, 
    currentData: 1,//区域数
    btn_content:'删除',
  },

//获取动态展示
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
            toshow: res.data.data//PHP返回条件
          })
          console.log(that.data.toshow)
          //获取是否申请动态
          wx.request({
            url: '',
            data: {
              openid: app.globalData.id
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              that.data.btn_content = '已删除'
              wx.hideLoading()


            },
            fail: function () {
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 2000
              })
            }
          })

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
//删除帖子
apply:function(e){
  var that=this;
  console.log(e.currentTarget.dataset.id)
  // console.log(app.globalData.message_id)
  wx.showLoading({
    title: '删除中',
  })

  wx.request({
    url: 'http://together123.applinzi.com/together/index.php/Home/Modifymsg/deleteMsg',
    data: {
     message_id:e.currentTarget.dataset.id//message_id
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
     that.data.btn_content = '已删除'
     wx.hideLoading()
     
     
    },
    fail: function () {
      wx.showToast({
        title: '删除失败',
        icon: 'none',
        duration: 2000
      })
    }
  })
}
})