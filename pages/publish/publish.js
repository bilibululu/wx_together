//holes.js
//获取应用实例
const app = getApp()

Page({
  data: {
    datail: "",//树洞内容
    // label1:"",//学习
    // label2:"",//运动
    // label3:"",//娱乐
    // label4:"",//日常
  },
  //text传递函数
  bindTextAreaBlur: function (e) {
    // console.log(e.detail.value)
    this.data.detail = e.detail.value
    //console.log(this.data.value)
  },
  //label按键
  // label1:function(e){
  //   var that=this//保存this
  //   wx.showLoading({
  //     title: '加载中',
  //   })

  //   var label={}
  //   if(that.data.label1){
  //     label=1
  //   }else if(that.data.label2){
  //     label=2
  //   }else if(that.data.label3){
  //     label=3
  //   } else{
  //     label=4
  //   }
  //    //与服务器交互
  //   wx.request({
  //     url: 'http://together123.applinzi.com/together/index.php/Home/Modifymsg/storeMsg', //动态发布接口地址
  //     data: {
  //       parea:label
  //     },
  //     method:'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded' // 默认值
  //     },
  //     //回调函数
  //     success (res) {
  //       console.log(res.data)//服务器返回的信息
  //       if(res.data.error_code!=0){
  //           wx.showLoading({
  //             // title: '哎呀！',
  //             // content:'不小心出问题了T^T'+res.data.msg,
  //             success:function(res){
  //               if(res.confirm){
  //                 console.log('用户点击确定')
  //               }else if(res.cancel){
  //                 console.log('用户点击取消')
  //               }
  //             }
  //           })
  //         }
  //         else if(res.data.error_code==0){
  //           wx.showLoading({
  //             title: 'wow',
  //             content:'动态发布成功了！',
  //             showCancel:false,
  //             success(res){},
  //           })
  //         }
  //       },
  //       fail:function(res){
  //       wx.showLoading({
  //         title: '哎呀！',
  //         content:'您的网络不在状态',
  //         success:function(res){
  //           if(res.confirm){
  //             console.log('用户点击确定')
  //           }else if(res.cancel){
  //             console.log('用户点击取消')
  //           }
  //         }
  //       })
  //       }
  //     })

  //   setTimeout(function(){
  //     wx.hideLoading()},2000)
  // },



  //send按键
  send: function (e) {
    var that = this//保存this
    wx.showLoading({
      title: '加载中',
    })
    // console.log(that.data.detail)
    // console.log(getApp().globalData.userInfo)
    //与服务器交互
    wx.request({
      url: 'http://together123.applinzi.com/together/index.php/Home/Modifymsg/storeMsg', //动态发布接口地址
      data: {
        Psn: getApp().globalData.user.user_id,
        Pnickname: getApp().globalData.userInfo.nickName,
        Pface: getApp().globalData.userInfo.avatarUrl,//头像
        Ptext: that.data.detail,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      //回调函数
      success(res) {
        console.log(res.data)//服务器返回的信息
        if (res.data.error_code != 0) {
          wx.showLoading({
            title: '哎呀！',
            content: '不小心出问题了T^T' + res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        else if (res.data.error_code == 0) {
          wx.showLoading({
            title: 'wow',
            content: '动态发布成功了！',
            showCancel: false,
            success(res) { },
            complete: function (res) {
              wx.reLaunch({
                url: '../community/community',
              })
            }
          })
        }
      },
      fail: function (res) {
        wx.showLoading({
          title: '哎呀！',
          content: '您的网络不在状态',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  //图片上传
  uploader: function () {
    var that = this;
    let imagesList = [];
    let maxSize = 1024 * 1024 * 5;//5M大小的图片
    let maxLength = 1;
    let flag = true;
    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function (res) {
        wx.showToast({//提示信息
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500
        })
        //图片大小是否超标
        for (let i = 0; i < res.tempFiles.length; i++) {
          if (res.tempFiles[i].size > maxSize) {
            flag = false;
            console.log(111)
            wx.showModal({//显示模拟对话框
              content: '图片太大，不允许上传',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
          }
        }
        //图片张数是否超标
        if (res.tempFiles.length > maxLength) {
          console.log('222');
          wx.showModal({
            content: '最多能上传' + maxLength + '张图片',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              }
            }
          })
        }

        if (flag == true && res.tempFiles.length <= maxLength) {
          that.setData({
            imagesList: res.tempFilePaths
          })
        }
        wx.uploadFile({
          url: '',//开发者服务器地址
          filePath: res.tempFilePaths[0],//需要上传的照片的位置能自动转到相册
          name: 'pphoto',//key
          header: {
            "Content-Type": "multipart/form-data",
            'Content-Type': 'application/json'
          },//http请求header
          success: function (data) {
            console.log(data);//在界面打印data
          },
          fail: function (data) {
            console.log(data);//打印data
          }
        })
        console.log(res);//打印res
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})
