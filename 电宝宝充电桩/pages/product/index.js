// pages/product/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskIsShow: false,
    userLongitude:114.207034,
    userLatitude:30.550434,
    markers:[
      {
        iconPath:'../../static/images/position_go.png',
        id:0,
        longitude:114.207034,
        latitude:30.550434,
        width:40,
        height:38
      }
    ],
    markersContent:{
    }
  },
  
  popupShow: function () {

    var that = this
    console.log('id:' + that.data.markersContent.id)
    wx.showModal({
      title: '请核对充电桩号是否一致',
      content: that.data.markersContent.deviceNum,
      confirmColor:'#23C675',
      success(res) {
        if (res.confirm) {
          // 点击确认按钮 跳转到支付页面
          wx.navigateTo({
            url:'../payment/index?id=' + that.data.markersContent.id
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  openLocation: function () {
    const location = {
      latitude: this.data.markers[0].latitude,
      longitude: this.data.markers[0].longitude,
      scale: 14,
      address: this.data.markersContent.address,
      name:'充电桩'
    }
    wx.openLocation(location)
  },
  /**
   * 生命周期函数
   */
  onLoad(option) {
    // option可以获取跳转过来的参数
    if(option){
      console.log(option)
      console.log(option.id)
      var longitude = parseFloat(option.longitude)
      var latitude = parseFloat(option.latitude)
      var that = this
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          that.setData({
            userLongitude: res.longitude,
            userLatitude: res.latitude 
          })
        },
        fail(err) {
          wx.showToast({
            title:'请打开位置授权，否则无法正确定位',
            icon:'none',
            dutation:3000
          })
        }
      }),
      that.setData({
        'markers[0].longitude':longitude,
        'markers[0].latitude':latitude,
        'markersContent.address':option.address,
        'markersContent.deviceNum':option.deviceNum,
        'markersContent.port':option.port,
        'markersContent.id':option.id
      })
    }
  }
})