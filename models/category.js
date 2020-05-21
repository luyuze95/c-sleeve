import {Http} from "../utils/http";

class Category {
    static async getHomeLocationC() {
        return await Http.request({
            url: `53002/category`
        })
    }
}

export {
    Category
}