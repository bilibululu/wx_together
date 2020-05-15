//holes.js
//获取应用实例
const app = getApp()

Page({
  data: {
    datail: "",//树洞内容
    labelarray:[1,2,3,4],//标签
    index:-1,
    label:0,
    productInfo:""
  },

  //label传递函数
  label1:function(){
    this.setData({label:this.data.labelarray[this.data.index+1]})
    var that=this//保存this
    console.log(that.data.label)
    console.log('onLoad')
      wx.request({
        url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/getVsn', //真实的接口地址
        data: {vopenid:getApp().globalData.id},
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        method:"POST",
        success: function (res) {
   
          console.log(res.data)
          app.globalData.Industry=res.data.sId
          console.log(app.globalData.Industry)
          // that.data.Industry=res.data //数据库返回的学号
  //         that.setData({  
  //          Industry: res.data.pvsn //数据库返回的学号
  //         })  
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },
  
  label2:function(){
    this.setData({label:this.data.labelarray[this.data.index+2]})
    var that=this//保存this
    console.log(that.data.label)
    console.log('onLoad')
      wx.request({
        url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/getVsn', //真实的接口地址
        data: {vopenid:getApp().globalData.id},
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        method:"POST",
        success: function (res) {
   
          console.log(res.data)
  app.globalData.Industry=res.data.sId
          // that.data.Industry=res.data //数据库返回的学号
  //         that.setData({  
  //          Industry: res.data.pvsn //数据库返回的学号
  //         })  
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },
  label3:function(){
    this.setData({label:this.data.labelarray[this.data.index+3]})
    var that=this//保存this
    console.log(that.data.label)
    console.log('onLoad')
      wx.request({
        url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/getVsn', //真实的接口地址
        data: {vopenid:getApp().globalData.id},
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        method:"POST",
        success: function (res) {
   
          console.log(res.data)
  app.globalData.Industry=res.data.sId
          // that.data.Industry=res.data
          // getApp().globalData.Industry=res.data //数据库返回的学号
  //         that.setData({  
  //          Industry: res.data.pvsn //数据库返回的学号
  //         })  
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },
  label4:function(){
    this.setData({label:this.data.labelarray[this.data.index+4]})
    var that=this//保存this
    console.log(that.data.label)
    console.log('onLoad')
      wx.request({
        url: 'http://together123.applinzi.com/together/index.php/Home/Readmsg/getVsn', //真实的接口地址
        data: {vopenid:getApp().globalData.id},
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        method:"POST",
        success: function (res) {
   
          console.log(res.data)
  app.globalData.Industry=res.data.sId
          // that.data.Industry=res.data
          // getApp().globalData.Industry=res.data //数据库返回的学号
  //         that.setData({  
  //          Industry: res.data.pvsn //数据库返回的学号
  //         })  
        },
        fail: function (err) {
          console.log(err)
        }
      })
  },

  //text传递函数
  bindTextAreaBlur: function (e) {
    // console.log(e.detail.value)
    this.data.detail = e.detail.value
    //console.log(this.data.value)
  },
  
//图片上传

chooseImage: function () {
  var that = this;
  let maxSize = 1024 * 1024 * 5;//5M大小的图片
  let maxLength = 1;
  let flag = true;
  //选择图片部分
  wx.chooseImage({
    count: 1, //最多可以选择的图片总数
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

    success: function (res) {
      //返回选定照片的本地文件路径列表，tenpFilePaths可以作为img标签的src属性显示图片
      var temlFilePaths = res.tempFilePaths
      //启动上传等待中
      wx.showToast({
        title: '正在上传...',
        icon: 'loading',
        mask: true,
        duration: 500//延迟时间
      })
      // var uploadImgCournt=0
      
      for (let i = 0; i < res.tempFiles.length; i++) {
        //图片大小是否超标
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
      //如果上述条件都满足就更新productInfo
      if (flag == true && res.tempFiles.length <= maxLength) {
        that.setData({
          // imageList: res.tempFilePaths
          imageList: temlFilePaths
        })
        // console.log(res.tempFilePaths)
      }

      var productInfo=res.tempFilePaths[0]
          console.log(productInfo)
          that.setData({productInfo:productInfo})
      // wx.uploadFile({
      //   url: 'http://together123.applinzi.com/together/index.php/Home/Modifymsg/storeMsg',//开发者服务器地址
      //   filePath: res.tempFilePaths[0],//需要上传的照片的位置能自动转到相册图片的地址
      //   name: 'pphoto',//key
      //   header: {
      //     "Content-Type": "multipart/form-data",
      //     'Content-Type': 'application/json'
      //   },//http请求header
      //   //data是开发者服务器返回的数据
      //   success:function(){
      //     // var data=res.pphoto;
      //     // var productInfo=data;//地址
      //     var productInfo=res.tempFilePaths[0]
      //     console.log(productInfo)
      //     that.setData({"productInfo":productInfo})
      //   },
      //   success: function (data) {
      //     console.log(that.data.imagesList);//在界面打印data
      //   },
      //   fail: function (data) {
      //     console.log(that.data.imagesList);//打印data
      //   }
      // })
      console.log(res);//打印res
    },
    fail: function (res) {
      console.log(res);
    }
  })
},
previewImage: function (e) { 
  var current = e.publish.dataset.src 
  wx.previewImage({ 
  current: current, 
  urls: this.data.productInfo
  }) 
  console.log(current)
  console.log(urls)
},

  //send按键
  send: function (e) {
    var that = this//保存this
    wx.showLoading({
      title: '加载中',
    })
    console.log(that.data.detail)
    console.log(getApp().globalData.info)
    // var fs=wx.getFileSystemManager()//用于上传图片
    // var picture_ad=fs.readFileSync(that.data.productInfo,"base64",)
    // console.log(picture_ad)
    //与服务器交互
    wx.request({
      url: 'http://together123.applinzi.com/together/index.php/Home/Modifymsg/storeMsg', //动态发布接口地址
      data: {
        Psn:getApp().globalData.Industry,
        Pnickname: getApp().globalData.info.nickName,
        Pface: getApp().globalData.info.avatarUrl,//头像
        Ptext: that.data.detail,
        Parea:that.data.label,
        // Pphoto:picture_ad,
        Pphoto:that.data.productInfo,
        Popenid:getApp().globalData.id
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
                url: '../show/show',
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
})
