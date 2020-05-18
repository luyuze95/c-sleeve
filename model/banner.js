import {Http} from "../utils/http";

class Banner {
    static locationB = 'b-1';
    static locationG = 'b-2';

    static async getHomeLocationB() {
        return await Http.request({
            url: `53001/banner/1`
        });
    }

    static async getHomeLocationG() {
        return await Http.request({
            url: `53001/banner/2`
        });
    }
}

export {
    Banner
}