var app = getApp()
Page({

  data: {
    toshow: {},
    circular: true,
    scrollTop: '',
    navFixed: false,
    currentData: 1
  },

  //获取动态展示
  onLoad: function (options) {
    var that = this
    //获取已经申请的动态
    if (that.data.currentData == 1) {
      wx.request({
        url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMyrequest',
        data: {
          ropenid: app.globalData.id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if (!res.data.error_code) {
            that.setData({
              toshow: res.data.msg
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
    //获取已发布的动态
    else {
      wx.request({
        url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMypublish',
        data: {
          popenid: app.globalData.id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if (!res.data.error_code) {
            that.setData({
              toshow: res.data
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

onPullDownRefresh:function(){
  var that = this
  //获取已经申请的动态
  if (that.data.currentData == 1) {
    wx.request({
      url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMyrequest',
      data: {
        ropenid: app.globalData.id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (!res.data.error_code) {
          that.setData({
            toshow: res.data.msg
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
  //获取已发布的动态
  else {
    wx.request({
      url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMypublish',
      data: {
        popenid: app.globalData.id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (!res.data.error_code) {
          that.setData({
            toshow: res.data
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

      //获取已经申请的动态
      if (that.data.currentData == 1) {
        wx.request({
          url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMyrequest',
          data: {
            ropenid: app.globalData.id
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data)
            if (!res.data.error_code) {
              that.setData({
                toshow: res.data.msg
              })

              console.log(that.data.toshow)
            }
            else{
              that.setData({
                toshow: {}
              })
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
      //获取已发布的动态
      else {
        wx.request({
          url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMypublish',
          data: {
            popenid: app.globalData.id
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data)
            if (!res.data.error_code) {
              that.setData({
                toshow: res.data
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

    }
  },

  //监听滑动
  layoutScroll: function (e) {
    this.data.scrollTop = this.data.scrollTop * 1 + e.detail.deltaY * 1;
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

//组队完成按钮
complete:function(e){
  var that = this;
  wx.showLoading({
    title: '发送请求中',
  })
 //发送完成请求
  wx.request({
    url: 'http://together123.applinzi.com/together/index.php/Home/Modifymsg/finishMsg',
    data: {
      message_id: e.currentTarget.dataset.id
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      console.log(res.data)
      //刷新显示
      wx.request({
        url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMypublish',
        data: {
          popenid: app.globalData.id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if (!res.data.error_code) {
            that.setData({
              toshow: res.data
            })
            console.log(that.data.toshow)
          }
        }
      })
      wx.hideLoading()
      wx.showToast({
        title: '组队完成',
        icon: 'none',
        duration: 2000
      })
    },
    fail: function () {
      wx.showToast({
        title: '发送失败',
        icon: 'none',
        duration: 2000
      })
    }
  })
},

//同意组队
agree:function(e){
  var that = this;
  wx.showLoading({
    title: '发送请求中',
  })
  //发送同意请求
  wx.request({
    url: 'http://together123.applinzi.com/together/index.php/Home/Modifymsg/acptRequest',
    data: {
      ropenid: e.currentTarget.dataset.oid,
      message_id: e.currentTarget.dataset.mid
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      console.log(res.data)
      //刷新显示
      wx.request({
        url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMypublish',
        data: {
          popenid: app.globalData.id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if (!res.data.error_code) {
            that.setData({
              toshow: res.data
            })
            console.log(that.data.toshow)
          }
        }
      })
      wx.hideLoading()
      wx.showToast({
        title: '已同意',
        icon: 'none',
        duration: 2000
      })
    },
    fail: function () {
      wx.showToast({
        title: '发送失败',
        icon: 'none',
        duration: 2000
      })
    }
  })
}
})