import {config} from "../config/config";

class Http {
    static request({url, data, callback, method = 'GET'}) {
        wx.request({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            success(res) {
                callback(res.data);
            }
        })
    }
}

export {
    Http
}
