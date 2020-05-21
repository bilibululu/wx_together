var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isDirect:false
  },
  
  bindGetUserInfo(e) {
    var that=this;
    app.globalData.info = e.detail.userInfo;
    console.log(app.globalData.info)
    if(that.data.isDirect){
      wx.reLaunch({
        url: '../show/show'
      })
    }
    else {
      wx.redirectTo({
        url: '../register/register',
      })
    }
  },

  onLoad:function(){
    var that=this;
    wx.showLoading({
      title: '努力奔跑中！',
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })

      wx.login({
        success: function (res) {
          console.log(res.code)
          //发送请求
          wx.request({
            url: 'https://together123.applinzi.com/together/index.php/Home/Getuserinfo/getOpenid',
            data: { code: res.code },
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
              app.globalData.id = res.data.openid
              console.log(res.data)
              console.log(app.globalData.id)
              wx.request({
                url: 'https://together123.applinzi.com/together/index.php/Home/Getuserinfo/ifOpenid',
                data: { id: app.globalData.id },
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                success: function (res) {
                  console.log(res.data)
                  if (!res.data.error_code) {
                    that.setData({
                      isDirect:true
                    })
                    console.log(that.data.isDirect)
                  }
                  wx.hideLoading()
                },
                fail: function () {
                  wx.showToast({
                    title: '团子哦豁~',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            }
          })
        }
      })
    
  }
  
})