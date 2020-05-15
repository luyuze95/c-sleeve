// 业务对象

import {Http} from "../utils/http";

class Theme {
    static getHomeLocationA(callback) {
        Http.request({
            url: `53000/themes`,
            data: {
                name: "t-1"
            },
            callback: data => {
                callback(data);
            }
        });
    }
}

export {
    Theme
}