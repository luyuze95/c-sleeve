import {Cell} from "./cell";

class SkuPending {

    pending = [];
    size;

    constructor(size) {
        this.size = size;
    }

    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell, i);
        }
    }

    isIntact() {
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false;
            }
        }
        return true;
    }

    _isEmptyPart(index) {
        return !this.pending[index];
    }

    insertCell(cell, x) {
        this.pending[x] = cell;
    }

    removeCell(x) {
        this.pending[x] = null;
    }

    findSelectedCellByX(x) {
        return this.pending[x];
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x];
        if (!pendingCell) {
            return false;
        }
        return cell.id === pendingCell.id;
    }
}

export {
    SkuPending
}