let container = document.getElementById('container'),
    score = document.getElementById('score'),
    start = document.getElementById('start'),
    reset = document.getElementById('reset'),
    speed = 2,
    clock = null;
//添加监听事件
start.addEventListener('click', () => {
    if (!clock) {
        init();
    }
});
reset.addEventListener('click', () => {
    if (clock) {
        clearInterval(clock);
        init();
    }
});
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('black')) {
        let value = +score.innerText;
        score.innerText = value + 1;
        if (value % 10 === 0) {
            speed += 2;
            console.log('speed up');
        } 
        e.target.classList.remove('black');
        e.target.parentNode.dataset.pass = 'true';
    } else {
        e.target.classList.add('error');
        fail();
    }
});
//创建一个新的div
function init() {
    container.innerHTML = `<div class="row">
					<div class="cell"></div>
					<div class="cell black"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>
				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell black"></div>
					<div class="cell"></div>
				</div>
				<div class="row">
					<div class="cell"></div>
					<div class="cell black"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>
				<div class="row">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell black"></div>
				</div>`;
    container.style.top = '-150px';
    speed = 2;
    score.innerText = '0';
    clock = setInterval(move, 30);
}
function createDiv(className) {
    let div = document.createElement('div');
    div.className = className;
    return div;
}
//删除最后一行
function deleteRow() {
    let con = container;
    if (con.childElementCount === 6) {
        con.removeChild(con.lastElementChild);
    }
}
function createCell() {
    let tem = ['cell', 'cell', 'cell', 'cell'],
        index = Math.floor(Math.random() * 4);
    tem[index] = 'cell black';
    return tem;
}
function createRow() {
    let con = container,
        row = createDiv('row'),
        arr = createCell();
    for (var i = 0; i < 4; i++) {
        row.appendChild(createDiv(arr[i])); 
    }
    con.insertBefore(row, con.firstChild);
}
function fail() {
    clearInterval(clock);
    alert(`你的最终得分是${score.innerText}`);
}
function move() {
    let con = container,
        top  = parseInt(getComputedStyle(con, null)['top']);
    if (speed + top > 0) {
        top = 0;
    } else {
        top += speed;
    }
    con.style.top = top + 'px';
    if (top === 0) {
        createRow();
        con.style.top = '-150px';
        deleteRow();
    } else if (top === (-150 + speed)) {
        let rows = con.children;
        if ((rows.length === 5) && (rows[rows.length - 1].dataset.pass !== 'true') ) {
            fail();
        }
    }
}