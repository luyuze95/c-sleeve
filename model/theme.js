// 业务对象

import {Http} from "../utils/http";

class Theme {
    static async getHomeLocationA() {
        return await Http.request({
            url: `53000/themes`,
            data: {
                name: "t-1"
            }
        });
    }
}

export {
    Theme
}