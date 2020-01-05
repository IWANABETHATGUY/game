class BFS {
  constructor(grid, start, end, R, C) {
    this.grid = grid;
    this.start = start;
    this.end = end;
    this.Row = R;
    this.Col = C;
    this.pre = Array.from({ length: 10 }).map(arr =>
      Array.from({ length: 10 }).fill(-1)
    );
    this.marked = Array.from({ length: 10 }).map(arr =>
      Array.from({ length: 10 }).fill(0)
    );
  }

  findPath() {
    let start = this.start[0] * this.Col + this.start[1];
    let dirs = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    let q = [start];
    let r = Math.floor(start / this.Col);
    let c = start % this.Col;
    this.marked[r][c] = 1;
    let flag;
    while (q.length) {
      flag = false;
      let cur = q.shift();
      let r = Math.floor(cur / this.Col);
      let c = cur % this.Col;
      
      for (let i = 0; i < dirs.length; i++) {
        let nr = r + dirs[i][0];
        let nc = c + dirs[i][1];
        if (
          this.inArea(nr, nc) &&
          this.grid[nr][nc] !== 1 &&
          !this.marked[nr][nc]
        ) {
          this.marked[nr][nc] = 1;
          let pos = nr * this.Col + nc;
          q.push(pos);
          this.pre[nr][nc] = cur;
        }
        if (nr === this.end[0] && nc === this.end[1]) {
          flag = true
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    if (flag) {
      let resPath = [];
      let cur = this.end[0] * this.Col + this.end[1];
      while (cur !== start) {
        let r = Math.floor(cur / this.Col);
        let c = cur % this.Col;
        resPath.push([r, c]);
        cur = this.pre[r][c]
      }
      resPath.push([r, c]);
      resPath.reverse()
      console.log(resPath)
      return resPath;
    }
    return []
  }
  inArea(r, c) {
    return r >= 0 && r < this.Row && c >= 0 && c < this.Col;
  }
}
