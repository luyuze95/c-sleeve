import {Matrix} from "./matrix";
import {Fence} from "./fence";
import {CellStatus} from "../../core/enum";

class FenceGroup {

    spu;
    skuList = [];
    fences = [];

    constructor(spu) {
        this.spu = spu;
        this.skuList = spu.sku_list;
    }

    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id;
        if (!defaultSkuId) {
            return;
        }
        return this.skuList.find(s => s.id === defaultSkuId);
    }

    getSku(skuCode) {
        const fullSkuCode = this.spu.id + '$' + skuCode;
        const sku = this.spu.sku_list.find(s => s.code === fullSkuCode);
        return sku ? sku : null;
    }

    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status;
            }
        });
    }

    setCellStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status;
    }

    initFences() {
        const matrix = this._createMatrix(this.skuList);
        const fences = [];
        const AT = matrix.transpose();
        AT.forEach(r => {
            const fence = new Fence(r);
            fence.init();
            fences.push(fence);
        });
        this.fences = fences;
    }

    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j];
                cb(cell, i, j);
            }
        }
    }

    _createMatrix(skuList) {
        const m = [];
        skuList.forEach(sku => {
            m.push(sku.specs);
        });
        return new Matrix(m);
    }
}

export {
    FenceGroup
}