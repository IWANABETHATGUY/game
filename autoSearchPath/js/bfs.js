class Node {
    constructor(value, priority, parent = null) {
        this.value = value;
        this.priority = priority;
        this.parent = parent;
    }
}
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    insert(value, priority, parent) {
        let queObj = new Node(value, priority, parent); //创建队列元素对象
        if (this.isEmpty()) { //如果队列是空的，直接插入
            this.items.push(queObj);
        } else {
            let bAdded = false;
            for (let i = 0, len = this.items.length; i < len; i++) { 
                if (priority < this.items[i].priority) {
                    this.items.splice(i, 0, queObj); // 循环队列，如果优先级小于这个位置元素的优先级，插入
                    bAdded = true;
                    break;
                }
            }
            if (!bAdded) {
                this.items.push(queObj); // 如果循环一圈都没有找到能插队的位置，直接插入队列尾部
            }
        }
    }
    get() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}

class AFind {
    constructor(matrix, startR, startC, endR, endC, row, col) {
        this.matrix = matrix;
        this.startR = startR;
        this.startC = startC;
        this.endR = endR;
        this.endC = endC;
        this.row = row;
        this.col = col;
        this.Hlist = this.getHlist();
        this.Glist = this.getGlist();
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
    }
    //检测当前位置是否合法
    isLegal(row, col, matrix, marked) {
        return row >= 0 && row < 10 && col >= 0 && col < 10 && !marked[row][col] && matrix[row][col] !== 1;
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
    find(path) {
        let List = new PriorityQueue(),
            cur = null,
            result = null;
        List.insert([this.startR, this.startC], this.Hlist[this.startR][this.startC]);
        while (!List.isEmpty()) {
            cur = List.get();
            let r = cur.value[0],
                c = cur.value[1];
            this.marked[r][c] = 1;
            if (r === this.endR && c === this.endC) {
                result = cur;
                break;
            }
            for (let i = 0, len = this.direction.length; i < len; i++) {
                let newR = r + this.direction[i][0],
                    newC = c + this.direction[i][1];
                if (this.isLegal(newR, newC, this.matrix, this.marked)) {
                    this.Glist[newR][newC] = this.Glist[r][c] + 1;
                    List.insert([newR, newC], this.Hlist[newR][newC] + this.Glist[newR][newC], cur);
                }
            }
        }
        if (result) {
            while (result.parent) {
                path.push(result.value);
                result = result.parent;
            }
            path.push([this.startR, this.startC]);
            return path.reverse();
        }
        return path;
    }
    getPath() {
        let path = [];
        this.find(path);
        return path;
    }
    getDistace(a, b) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }
    getHlist() {
        let cur = [];
        copy(cur, this.matrix);
        let l = cur[0].length,
            endPosition = [this.endR, this.endC];
        for (let i = 0, len = cur.length; i < len; i++) {
            for (let j = 0; j < l; j++) {
                cur[i][j] = this.getDistace([i, j], endPosition);
            }
        }
        return cur;
    }
    getGlist() {
        let cur = [];
        copy(cur, this.matrix);
        let l = cur[0].length,
            endPosition = [this.startR, this.startC];
        for (let i = 0, len = cur.length; i < len; i++) {
            for (let j = 0; j < l; j++) {
                cur[i][j] = this.getDistace([i, j], endPosition);
            }
        }
        return cur;
    }
}

function copy (a, b) {
    for (let i = 0, len = b.length; i < len; i++) {
        a[i] = [];
        for (let j = 0, l = b[0].length; j < l; j++) {
            a[i][j] = b[i][j];
        }
    }
}
