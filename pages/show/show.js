var app = getApp()
Page({

  data: {
    toshow: {},
    circular: true,
    scrollTop: '',
    navFixed: false,
    currentData: 1,
    content1: '申请抱团',
    content2: '已申请',
    //用于发布消息后加的
    open_id:"openid",
    model_id:"-qZ6a8B702CT0k_Tl3gPCpFkbqN91Xtu5mRjDbJN1fI",
    name:"",
    sId:"",
    relation_way:"",
    text:""
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
    var $msgid = e.currentTarget.dataset.id;
    console.log($msgid)
    var msgid=$msgid
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


        that.setData({
          name:res.data.data.name,
          sId:res.data.data.sId,
          relation_way:res.data.data.contact,
          text:res.data.data.text
        })
        console.log('printname:',that.data.name)
        console.log('printsId:',that.data.sId)
        console.log('printcontact:',that.data.relation_way)
        console.log('printtext',that.data.text)

/////////////////////////////////////////////////////////////////////////////////////////////////////////模板信息
        //获取access_token
          wx.request({
            url:'https://together123.applinzi.com/together/index.php/Home/Accesstoken/getTokenCurl',
            method: 'GET',
            dataType: 'json',
            success: function (res) {
              app.globalData.access_token=res.data.access_token
              console.log('access_token: ', res.data.access_token)
              console.log('获取access_token成功')
            },
            fail: function (res) {
              console.log('获取access_token失败')
             },
            complete: function (res) { 
              console.log('获取access_token完成')
            },
          })
        //获取发布消息对象的openid
        var openid="";
          wx.request({
            url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/getPopenid',//给message_id传openid
            method:'POST',
            data:{
                message_id:msgid
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success:function(res){
              console.log('pdata:',res.data)
              console.log('popenid:',res.data.popenid)
              openid=res.data.popenid
              console.log('dopenid:',openid)
            }
          })

          //向数据库申请姓名，学号，联系方式和动态内容
          //模板id
          var template = that.data.model_id;
          //4个关键词
          var keyword_name = that.data.name;
          var keyword_sId = that.data.sId;
          var keyword_rw = that.data.relation_way;
          var keyword_text = that.data.text;
          //printkey
          console.log('name:',keyword_name)
          console.log('sId:',keyword_sId)
          console.log('relation_way:',keyword_rw)
          console.log('text:',keyword_text)
          //消息下发
          var template_id ="-qZ6a8B702CT0k_Tl3gPCpFkbqN91Xtu5mRjDbJN1fI";
          wx.requestSubscribeMessage({
            tmplIds: ['-qZ6a8B702CT0k_Tl3gPCpFkbqN91Xtu5mRjDbJN1fI'],
            success(res) {
            //发送access_token请求
              wx.request({
                url: 'https://together123.applinzi.com/together/index.php/Home/Dingyue/sendMsg',
                data:{
                  access_token: app.globalData.access_token,
                  //数据包
                  data:{
                  //openid
                    "touser": openid,
                  //模板id
                    "template_id": template_id,
                    "page": "mine",
                    "miniprogram_state": "developer",
                    "lang": "zh_CN",
                    "data": {
                      "number1": {
                        "value": msgid
                      },
                      "thing2": {
                        "value": keyword_name
                      },
                      "number3": {
                        "value": keyword_sId
                      },
                      "thing4": {
                        "value": keyword_rw
                      }
                    }
                  }
                },
                success: function(res) {
                  console.log("订阅成功");
                  console.log(res);
                },
                fail: function(res) {
                  console.log("订阅失败");
                },
              })
            }
          })
      

   
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////




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