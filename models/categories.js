/**
 * @作者 7七月
 * @微信公号 林间有风
 * @开源项目 $ http://7yue.pro
 * @免费专栏 $ http://course.7yue.pro
 * @我的课程 $ http://imooc.com/t/4294850
 */
import {Http} from "../utils/http";

class Categories{
    roots = []
    subs = []

    async getAll() {
        const data = await Http.request({
            url:`category/all`
        })

        this.roots = data.roots
        this.subs = data.subs
    }

    getRoots() {
        return this.roots
    }

    getRoot(rootId) {
        return this.roots.find(r=>r.id == rootId)
    }

    getSubs(parentId) {
        return this.subs.filter(sub=>sub.parent_id == parentId)
        // return this.roots.find(r=>r.id === rootId)
    }

}

export {
    Categories
}