class Matrix {

    m;

    constructor(matrix) {
        this.m = matrix;
    }

    get rowsNum() {
        return this.m.length;
    }

    get colsNum() {
        return this.m[0].length;
    }

    forEach(cb) {
        for (let j = 0; j < this.colsNum; j++) {
            for (let i = 0; i < this.rowsNum; i++) {
                const element = this.m[i][j];
                cb(element, i ,j);
            }
        }
    }
}

export {
    Matrix
}