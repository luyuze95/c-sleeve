// pages/home/home.js
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        themeESpu: [],
        bannerB: null,
        grid: [],
        activityD: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.initAllData();
        this.initBottomSpuList();
    },

    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging();
        const data = await paging.getMoreData();
        if (!data) {
            return;
        }
        wx.lin.renderWaterFlow(data.items);
    },

    /**
     * 初始化数据
     */
    async initAllData() {
        const theme = new Theme();
        await theme.getThemes();
        // 永远保证调用的简单，可以接受复杂的定义
        const themeA = theme.getHomeLocationA();
        const themeE = theme.getHomeLocationE();
        const themeF = theme.getHomeLocationF();
        const themeH = theme.getHomeLocationH();
        let themeESpu = [];
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu();
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }
        const bannerB = await Banner.getHomeLocationB();
        const bannerG = await Banner.getHomeLocationG();
        const grid = await Category.getHomeLocationC();
        const activityD = await Activity.getHomeLocationD();
        this.setData({
            themeA,
            themeE,
            themeF,
            themeH,
            themeESpu,
            bannerB,
            bannerG,
            grid,
            activityD
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});