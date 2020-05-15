var app=getApp()
Page({

  data: {
  toshow:{}
  },


  onLoad: function (options) {
   var that=this
    wx.request({
      url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
      data: {Parea:1},
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        if(!res.data.error_code){
          that.setData({
            toshow:res.data.data
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
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    var that = this;
    wx.request({
      url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/showMsg',
      data: { Parea: 1 },
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        if (!res.data.error_code) {
          that.setData({
            toshow: res.data.data
          })
          console.log(that.data.toshow)
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
  onReachBottom: function () {

  },

 
})