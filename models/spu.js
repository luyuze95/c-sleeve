import {Http} from "../utils/http";

class Spu {
    static getDetail(id) {
        return Http.request({
            url: `53006/maoyi/${id}`
        });
    }
}

export {
    Spu
}