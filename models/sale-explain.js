import {Http} from "../utils/http";

class SaleExplain {
    static async getFixed() {
        const explains = await Http.request({
            url: ``
        });
        return explains.map(e => {
            return e.text;
        });
    }
}

export {
    SaleExplain
}