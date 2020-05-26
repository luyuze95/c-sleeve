import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";

Page({

  data: {
    showRealm:false
  },

  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);

    this.setData({
      spu
    })

  },

  onAddToCart(event) {
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.CART
    })
  },

  onBuy(event) {
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.BUY
    })
  },

  onGotoHome(event) {
    wx.switchTab({
      url:'/pages/home/home'
    })
  },

  onGotoCart(event) {
    wx.switchTab({
      url:'/pages/cart/cart'
    })
  },

  onSpecChange(event) {
    this.setData({
      specs:event.detail
    })
  },

  onReady: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});