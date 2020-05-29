

class HistoryKeyword {
    static MAX_ITEM_COUNT = 20;
    static KEY = 'keywords';

    keywords = [];

    constructor() {
        if(typeof HistoryKeyword.instance === 'object'){
            return HistoryKeyword.instance
        }
        HistoryKeyword.instance = this;
        this.keywords = this._getLocalKeywords();
        return this
    }

// 不存在实例属性
// 单例模

    // 缓存中写入数据
    // [七]
    // 20
    // 去重
    save(keyword) {
        const items = this.keywords.filter(k => {
            return k === keyword
        });
        if (items.length !== 0) {
            return
        }
        if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
            this.keywords.pop()
        }
        this.keywords.unshift(keyword);
        this._refreshLocal()

        //  ------->
        // [万花，七秀，藏剑] 3
        // 万花
        // 栈还是队列
    }

    get() {
        return this.keywords
    }

    clear() {
        this.keywords = [];
        this._refreshLocal()
    }

    _refreshLocal() {
        wx.setStorageSync(HistoryKeyword.KEY, this.keywords)
    }

    _getLocalKeywords() {
        const keywords = wx.getStorageSync(HistoryKeyword.KEY);
        if (!keywords) {
            wx.setStorageSync(HistoryKeyword.KEY, []);
            return []
        }
        return keywords
    }

}

export {
    HistoryKeyword
}