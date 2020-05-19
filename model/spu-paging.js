import {Http} from "../utils/http";
import {Paging} from "../utils/paging";

class SpuPaging {
    static async getLatestPaging() {
        return new Paging({
            url: `spu/latest`
        }, 3)
    }
}

export {
    SpuPaging
}