import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";
import {Cart} from "../../models/cart";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        judger: Object,
        previewImg: String,
        currentSkuCount: Cart.SKU_MIN_COUNT
    },

    observers: {
        'spu': function (spu) {
            if (!spu) {
                return;
            }
            if (Spu.isNoSpec(spu)) {
                this.processNoSpec(spu);
            } else {
                this.processHasSpec(spu);
            }
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        processNoSpec(spu) {
            this.setData({
                noSpec: true
            });
            this.bindSkuData(spu.sku_list[0]);
            this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount);
        },

        processHasSpec(spu) {
            const fenceGroup = new FenceGroup(spu);
            fenceGroup.initFences();
            this.data.judger = new Judger(fenceGroup);
            const defaultSku = fenceGroup.getDefaultSku();
            if (defaultSku) {
                this.bindSkuData(defaultSku);
                this.setStockStatus(defaultSku.stock, this.data.currentSkuCount);
            } else {
                this.bindSpuData();
            }
            this.bindTipData();
            this.bindFenceGroupData(fenceGroup);
        },

        bindSpuData() {
            const spu = this.properties.spu;
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price,
            });
        },

        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock,
            });
        },

        bindTipData() {
            this.setData({
                skuIntact: this.data.judger.isSkuIntact(),
                currentValues: this.data.judger.getCurrentValues(),
                missingKeys: this.data.judger.getMissingKeys()
            });
        },

        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            });
        },

        setStockStatus(stock, currentCount) {
            this.setData({
                outStock:this.isOutOfStock(stock, currentCount)
            });
        },

        isOutOfStock(stock, currentCount) {
            return stock < currentCount;
        },

        onSelectCount(event) {
            const currentCount = event.detail.count;
            this.data.currentSkuCount = currentCount;

            if(this.data.judger.isSkuIntact()){
                const sku = this.data.judger.getDeterminateSku();
                this.setStockStatus(sku.stock, currentCount);
            }
        },

        onCellTap(event) {
            // console.log(event.detail);
            const data = event.detail.cell;
            const x = event.detail.x;
            const y = event.detail.y;
            const cell = new Cell(data.spec);
            cell.status = data.status;
            const judger = this.data.judger;
            judger.judge(cell, x, y);
            const skuIntact = judger.isSkuIntact();
            if (skuIntact) {
                const currentSku = judger.getDeterminateSku();
                this.bindSkuData(currentSku);
                this.setStockStatus(currentSku.stock, this.data.currentSkuCount);
            }
            this.bindTipData();
            this.bindFenceGroupData(judger.fenceGroup);
        }
    }
});
