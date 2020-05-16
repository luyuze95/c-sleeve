import {Http} from "../utils/http";

class Banner {
    static locationB = 'b-1';
    static async getHomeLocationB() {
        return await Http.request({
            url: `53001/banner/1`
        });
    }
}

export {
    Banner
}