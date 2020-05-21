var app = getApp()
Page({

  data: {
    toshow: {},
    circular: true,
    scrollTop: '',
    navFixed: false,
    currentData: 1,
    content1: '申请抱团',
    content2: '已申请'
  },

  //获取动态展示
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
      data: {
        Parea: that.data.currentData
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (!res.data.error_code) {
          that.setData({
            toshow: res.data.data
          })
          for (var i = 0; i < that.data.toshow.length; i++) {
            var isinvited = "toshow[" + i + "].isinvited"
            if (that.data.toshow[i].popenid == app.globalData.id) {
              that.setData({
                [isinvited]: 2
              })
            }
          }

         console.log(that.data.toshow)

          //获取是否申请动态
          wx.request({
            url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/ifRequest',
            data: {
              openid: app.globalData.id
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if(res.data.error_code!=2){
              for (var i = 0; i < that.data.toshow.length; i++) {
                var isinvited = "toshow[" + i + "].isinvited"
                if (that.data.toshow[i].popenid==app.globalData.id){
                  that.setData({
                    [isinvited]: 2
                  })
                }
                else{
                that.setData({
                  [isinvited]: 0
                })
                }
                for (var n = 0; n < res.data.msgid.length; n++) {
                  if (that.data.toshow[i].message_id == (res.data.msgid[n].rmessageid)) {
                    that.setData({
                      [isinvited]: 1
                    })
                  }
                }
              }
              }
              console.log(that.data.toshow)
            }
            
          })

        }
      },
      fail: function () {
        wx.showToast({
          title: 'you可能断网了',
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
      
      console.log(that.data.toshow)
      wx.request({
        url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
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
            for (var i = 0; i < that.data.toshow.length; i++) {
              var isinvited = "toshow[" + i + "].isinvited"
              if (that.data.toshow[i].popenid == app.globalData.id) {
                that.setData({
                  [isinvited]: 2
                })
              }
            }
            console.log(that.data.toshow)
            //获取是否申请动态
            wx.request({
              url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/ifRequest',
              data: {
                openid: app.globalData.id
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                console.log(res.data)
                if (res.data.error_code != 2) {
                for (var i = 0; i < that.data.toshow.length; i++) {
                  var isinvited = "toshow[" + i + "].isinvited"
                  if (that.data.toshow[i].popenid == app.globalData.id) {
                    that.setData({
                      [isinvited]: 2
                    })
                  }
                  else {
                    that.setData({
                      [isinvited]: 0
                    })
                  }
                  for (var n = 0; n < res.data.msgid.length; n++) {
                    if (that.data.toshow[i].message_id == (res.data.msgid[n].rmessageid)) {
                      that.setData({
                        [isinvited]: 1
                      })
                    }
                  }
                }
                }
                console.log(that.data.toshow)
              },

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

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    var that = this;
    wx.request({
      url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
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
          for (var i = 0; i < that.data.toshow.length; i++) {
            var isinvited = "toshow[" + i + "].isinvited"
            if (that.data.toshow[i].popenid == app.globalData.id) {
              that.setData({
                [isinvited]: 2
              })
            }
          }

          //获取是否申请动态
          wx.request({
            url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/ifRequest',
            data: {
              openid: app.globalData.id
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              console.log(res.data)
              if (res.data.error_code != 2) {
              for (var i = 0; i < that.data.toshow.length; i++) {
                var isinvited = "toshow[" + i + "].isinvited"
                if (that.data.toshow[i].popenid == app.globalData.id) {
                  that.setData({
                    [isinvited]: 2
                  })
                }
                else {
                  that.setData({
                    [isinvited]: 0
                  })
                }
                for (var n = 0; n < res.data.msgid.length; n++) {
                  if (that.data.toshow[i].message_id == (res.data.msgid[n].rmessageid)) {
                    that.setData({
                      [isinvited]: 1
                    })
                  }
                }
              }
              }
              console.log(that.data.toshow)
            },

          })

          wx.hideNavigationBarLoading()
          wx.stopPullDownRefresh()
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
  },


  apply: function (e) {
    var that = this;
    wx.showLoading({
      title: '申请抱团中',
    })

    wx.request({
      url: 'https://together123.applinzi.com/together/index.php/Home/Modifymsg/doRequest',
      data: {
        openid: app.globalData.id,
        message_id: e.currentTarget.dataset.id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        wx.showToast({
          title: '已申请抱团',
          icon:'success',
          duration:3000
        })
        wx.request({
          url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
          data: {
            Parea: that.data.currentData
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data)
            if (!res.data.error_code) {
              that.setData({
                toshow: res.data.data
              })
             
              //获取是否申请动态
              wx.request({
                url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/ifRequest',
                data: {
                  openid: app.globalData.id
                },
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function (res) {
                  console.log(res.data)
                  if (res.data.error_code != 2) {
                  for (var i = 0; i < that.data.toshow.length; i++) {
                    var isinvited = "toshow[" + i + "].isinvited"
                    if (that.data.toshow[i].popenid == app.globalData.id) {
                      that.setData({
                        [isinvited]: 2
                      })
                    }
                    else {
                      that.setData({
                        [isinvited]: 0
                      })
                    }
                    for (var n = 0; n < res.data.msgid.length; n++) {
                      if (that.data.toshow[i].message_id == (res.data.msgid[n].rmessageid)) {
                        that.setData({
                          [isinvited]: 1
                        })
                      }
                    }
                  }
                  }
                  console.log(that.data.toshow)
                },

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