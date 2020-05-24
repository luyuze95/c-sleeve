import {Http} from "../utils/http";

class Spu {

    static isNoSpec(spu) {
        return spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0;

    }

    static getDetail(id) {
        return Http.request({
            url: `53006/maoyi/${id}`
        });
    }
}

export {
    Spu
}