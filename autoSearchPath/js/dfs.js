class DfsFind {
    constructor(matrix, startRow, startCol, row, col) {
        this.arr = matrix;
        this.startRow = startRow;
        this.startCol = startCol;
        this.row = row;
        this.col = col;
        if (!this.arr || !this.row, !this.col) {
            throw Error('arguments is not legal need 3');
        }
        this.direction = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];
        this.marked = this.getMatrix();
        console.log(this.marked);
    }
    //检测当前位置是否合法
    isLegal(row, col, arr, marked) {
        return row >= 0 && row < 10 && col >= 0 && col < 10 && !marked[row][col] && arr[row][col] !== 1;
    }
    //得到一个新的矩阵
    getMatrix() {
        let arr = [];
        for (let i = 0; i < this.row; i++) {
            arr[i] = [];
            for (let j = 0; j < this.col; j++) {
                arr[i][j] = 0;
            }
        }
        return arr;
    }
    find(matrix, marked, row, col, path ) {
        if (matrix[row][col] === 3) {
            path.push([row, col]);
            return true;
        } else {
            marked[row][col] = 1;
            path.push([row, col]);
        }
        for (let i = 0, len = this.direction.length; i < len; i++) {
            if (this.isLegal(row + this.direction[i][0], col + this.direction[i][1], matrix, marked)) {
                if (this.find(matrix, marked, row + this.direction[i][0], col + this.direction[i][1], path)) {
                    return true;
                }
                marked[row + this.direction[i][0]][col + this.direction[i][1]] = 0;
                path.pop();
            }
        }
        return false;
    }
    getPath() {
        let path = [];
        this.find(this.arr, this.marked, this.startRow, this.startCol, path);
        return path;
    }
}