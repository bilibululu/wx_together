
const app = getApp()

Page({
  data: {
    datail: "",
    labelarray:[1,2,3,4],//标签
    index:-1,
    label:0,
    score1:'#f7f7f7',
    score2:'#f7f7f7',
    score3:'#f7f7f7',
    score4:'#f7f7f7',
    a:0,
    color1:'#ffffff',
    color2:'##5cbcaf'
  },
  //label传递函数
  label1:function(){
    
    var that=this//保存this
    that.setData({
      a:1
    })
    if(that.data.a==1|that.data.a==0){
      that.setData({
        score1: 'rgb(48, 133, 126)',
        score2:'#f7f7f7',
        score3:'#f7f7f7',
        score4:'#f7f7f7'
      })
    }else{
      that.setData({
        score1:'#f7f7f7'
      })
    }
    this.setData({label:this.data.labelarray[this.data.index+1]})
    console.log(that.data.label)
    console.log('onLoad')
      wx.request({
        url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/getVsn', 
        data: {vopenid:getApp().globalData.id},
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        method:"POST",
        success: function (res) {
          console.log(res.data)
          app.globalData.Industry=res.data.sId
          console.log(app.globalData.Industry)
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },
  
  label2:function(){
    var that=this
    that.setData({
      a:2
      })
    if(that.data.a==2|that.data.a==0){
      that.setData({
        score2: 'rgb(48, 133, 126)',
        score1:'#f7f7f7',
        score3:'#f7f7f7',
        score4:'#f7f7f7'
      })
    }else{
      that.setData({
        score2:'#f7f7f7'
      })
    }
    
    this.setData({label:this.data.labelarray[this.data.index+2]})
    console.log(that.data.label)
    console.log('onLoad')
      wx.request({
        url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/getVsn', //真实的接口地址
        data: {vopenid:getApp().globalData.id},
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        method:"POST",
        success: function (res) {
   
          console.log(res.data)
          app.globalData.Industry=res.data.sId 
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },
  label3:function(){
    this.setData({label:this.data.labelarray[this.data.index+3]})
    var that=this//保存this
    that.setData({
      a:3
    })
    if(that.data.a==3|that.data.a==0){
      that.setData({
        score3: 'rgb(48, 133, 126)',
        score2:'#f7f7f7',
        score1:'#f7f7f7',
        score4:'#f7f7f7'
      })
    }else{
      that.setData({
        score3:'#f7f7f7'
      })
    }
   
    console.log(that.data.label)
    console.log('onLoad')
      wx.request({
        url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/getVsn', //真实的接口地址
        data: {vopenid:getApp().globalData.id},
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        method:"POST",
        success: function (res) {
          console.log(res.data)
          app.globalData.Industry=res.data.sId 
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },
  label4:function(){
    this.setData({label:this.data.labelarray[this.data.index+4]})
    var that=this//保存this
    that.setData({
      a:4
    })
    if(that.data.a==4|that.data.a==0){
      that.setData({
        score4: 'rgb(48, 133, 126)',
        score2:'#f7f7f7',
        score3:'#f7f7f7',
        score1:'#f7f7f7'
      })
    }else{
      that.setData({
        score4:'#f7f7f7'
      })
    }
    
    console.log(that.data.label)
    console.log('onLoad')
      wx.request({
        url: 'https://together123.applinzi.com/together/index.php/Home/Readmsg/getVsn', //真实的接口地址
        data: {vopenid:getApp().globalData.id},
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        method:"POST",
        success: function (res) {
   
          console.log(res.data)
          app.globalData.Industry=res.data.sId
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },

  //text传递函数
  bindTextAreaBlur: function (e) {
    this.data.detail = e.detail.value
  },
  


  //send按键
  send: function (e) {
    var that = this//保存this
    wx.showLoading({
      title: '加载中',
    })
    console.log(that.data.detail)
    console.log(getApp().globalData.info)
    //与服务器交互
    wx.request({
      url: 'https://together123.applinzi.com/together/index.php/Home/Modifymsg/storeMsg', //动态发布接口地址
      data: {
        Psn:getApp().globalData.Industry,
        Pnickname: getApp().globalData.info.nickName,
        Pface: getApp().globalData.info.avatarUrl,//头像
        Ptext: that.data.detail,
        Parea:that.data.label,
        Popenid:getApp().globalData.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      //回调函数
      success(res) {
        wx.hideLoading()
        console.log(res.data)//服务器返回的信息
        if (res.data.error_code != 0) {
          wx.showToast({
            title: '要选择分区哦！',
            icon: 'loading',
            duration: 2000
          })
        }
        else if (res.data.error_code == 0) {
          wx.showToast({
            title: '噼里啪啦，动态发布！',
            icon: 'success',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.switchTab({ url: '/pages/show/show' })
              }, 1000);
            }
          })
        }
      },
      
      fail: function (res) {
        wx.showToast({
          title: '哦了个豁~',
          icon: 'none',
          duration: 2000
        })
      }
    })
    that.setData({
      a: 0,
      score1: '#f7f7f7',
      score2:'#f7f7f7',
      score3:'#f7f7f7',
      score4:'#f7f7f7'
    })
  },
})
