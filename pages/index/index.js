var app = getApp()
Page({
  data: {
   
  },
  //登录获取code
  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code)
        //发送请求
        wx.request({
          url: 'http://together123.applinzi.com/together/index.php/Home/Getuserinfo/getOpenid', 
          data: { code: res.code },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            app.globalData.id=res.data.openid
            console.log(res.data)
            console.log(app.globalData.id)
            wx.request({
              url: 'http://together123.applinzi.com/together/index.php/Home/Getuserinfo/ifOpenid',
              data: { id: app.globalData.id },
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },
              method: 'POST',
              success: function (res) {

                console.log(res.data)
                if (!res.data.error_code) {
                  wx.showModal({
                    title: '提示',
                    content: '您已完成认证，是否进入？',
                    success(res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.reLaunch({
                          url: '../publish/publish',
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                        
                      }
                    }
                  })
                
                  
                }
                else {
                  wx.redirectTo({
                    url: '../register/register',
                  })
                }

              },
              fail: function () {
                wx.showToast({
                  title: '登陆失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }) 
          }
        })
      }
    }),
      wx.getUserInfo({
        success: function (res) {
          console.log(res.userInfo)
            app.globalData.info=res.userInfo;
          console.log(app.globalData.info)
        }
     })    
  }
  
})