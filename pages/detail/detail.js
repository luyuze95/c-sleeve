import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../models/sale-explain";
import {getWindowHeightRpx} from "../../utils/system";

Page({

  data: {
    showRealm:false
  },

  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);

    const explain =await SaleExplain.getFixed();
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100;

    this.setData({
      spu,
      explain,
      h
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
})