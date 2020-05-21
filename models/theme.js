// 业务对象

import {Http} from "../utils/http";

class Theme {
    static locationA = 't-1';
    static locationE = 't-2';
    static locationF = 't-3';
    static locationH = 't-4';

    themes = [];

    async getThemes() {
        this.themes = await Http.request({
            url: `53000/themes`
        });
    }

    getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA);
    }

    getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE);
    }

    getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF);
    }

    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH);
    }

    static getHomeLocationESpu() {
        return Theme.getThemeSpuByName('4');
    }

    static getThemeSpuByName(name) {
        return Http.request({
            url: `53004/with_spu/${name}`
        })
    }
}

export {
    Theme
}