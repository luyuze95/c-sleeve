import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";

class Judger {

    fenceGroup;
    pathDict = [];

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup;
        this._initPathDict();
    }

    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
    }

    judge(cell, x, y) {
        this._changeCurrentCellStatus(cell, x, y);
        this.fenceGroup.eachCell(this._changeOtherCellStatus);
    }

    _changeOtherCellStatus(cell, x, y) {

    }

    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED;
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING;
        }
    }
}

export {
    Judger
}