var app=getApp()
Page({
  data:{
  sname:'',
  student:'',
  number:'',
  avatarUrl:'',
  nickName:''

  },
  onShow:function(){
     this.setData({
        avatarUrl:app.globalData.info.avatarUrl,
        nickName:app.globalData.info.nickName
     })
  },
  name1:function(e){
     this.setData({
       sname: e.detail.value
     });
  },
  student1: function (e) {
    this.setData({
      student: e.detail.value
    });
  },
  number1: function (e) {
    this.setData({
      number: e.detail.value
    });
  },

  isTrue:function(){
    var that = this;
    wx.request({
      url: 'http://together123.applinzi.com/together/index.php/Home/Idveri/idVeri', 
      data: {
        name: that.data.sname,
        sId:that.data.student,
        contact: that.data.number,
        openid: app.globalData.id,
        nickname: app.globalData.info.nickname
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    
      success(res) {
        console.log(res.data)
      
        if(!res.data.error_code){
          wx.reLaunch({
            url: '../study/study',
          })
        }
        else{
          wx.showToast({
            title: '请输入真实的姓名和学号',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
 
})