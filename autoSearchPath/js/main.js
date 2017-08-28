let controler = document.getElementsByClassName('controler')[0],
    container = document.getElementsByClassName('container')[0],
    button = document.getElementById('button'),
    aFind = document.getElementById('aFind'),
    startElement = null,
    endElement = null,
    activeHelper = null,
    posArray = [],
    quickBuild = false;
init();

//
aFind.addEventListener('click', () => {
    let result = getMatrix(posArray),
        A = new AFind(result.arr, result.start[0], result.start[1], result.end[0], result.end[1], 10, 10),
        path = A.getPath();
    for (let i = 0, len = path.length; i < len; i++) {
        setTimeout(() => {
            posArray[path[i][0]][path[i][1]].classList.add('active');
        }, i * 200);
        setTimeout(() => {
            posArray[path[i][0]][path[i][1]].classList.remove('active');
        }, i * 200 + 200);
    }
});
//
button.addEventListener('click', () => {
    let result = getMatrix(posArray),
        arr = result.arr,
        D = new DfsFind(arr, result.start[0], result.start[1], 10, 10),
        path = D.getPath();
    for (let i = 0, len = path.length; i < len; i++) {
        setTimeout(() => {
            posArray[path[i][0]][path[i][1]].classList.add('active');
        }, i * 200);
        setTimeout(() => {
            posArray[path[i][0]][path[i][1]].classList.remove('active');
        }, i * 200 + 200);
    }
});
//
controler.addEventListener('click', (e) => {
    let target = e.target;
    if (activeHelper && activeHelper === target) {
        target.classList.remove('active');
        activeHelper = null;
    } else if (target.classList.contains('helper') && activeHelper !== target) {
        if (activeHelper) {
            activeHelper.classList.remove('active');
            target.classList.add('active');
        } else {
            target.classList.add('active');
        }
        activeHelper = target;
        
    }
});
container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    quickBuild = true;
    let target = e.target;
    if (activeHelper) {
        switch (activeHelper.innerText) {
        case 'Build' :
            if (target.className === 'item') {
                target.classList.add('block');
            }
            break;
        case 'Destory':
            target.classList.remove('block');
            break;
        case 'Start':
            if (!startElement && target.className === 'item') {
                target.classList.add('start');
                startElement = target;
            } else if (target.className === 'item') {
                startElement.className = 'item';
                target.className = 'item start';
                startElement = target;
            }
            break;
        case 'End':
            if (!endElement && target.className === 'item') {
                target.classList.add('end');
                endElement = target;
            } else if (target.className === 'item') {
                endElement.className = 'item';
                target.className = 'item end';
                endElement = target;
            }
            break;
        default:
            break;
        }
    }

});

container.addEventListener('mousemove', (e) => {
    if (quickBuild && activeHelper && activeHelper.innerText === 'Build' && e.target.className === 'item' ) {
        e.target.classList.add('block');
    }
});
document.addEventListener('mouseup', () => {
    quickBuild = false;
});
//Function

function init() {
    let rows = container.getElementsByClassName('row');
    for (let i = 0, len = rows.length; i < len; i++) {
        let items = rows[i].getElementsByClassName('item');
        posArray[i] = [];
        for (let j = 0, l = items.length; j < l; j++) {
            posArray[i].push(items[j]);
        }
    }
}

function getMatrix(eleArray) {
    let l = eleArray[0].length,
        arr = [],
        start = [],
        end = [],
        ele = null;
    for (let i = 0, len = eleArray.length; i < len; i++) {
        arr[i] = [];
        for (let j = 0; j < l; j++) {
            ele = eleArray[i][j];
            switch (ele.className) {
            case 'item':
                arr[i][j] = 0;
                break;
            case 'item block':
                arr[i][j] = 1;
                break;
            case 'item start':
                start.push(i, j);
                arr[i][j] = 2;
                break;
            case 'item end':
                end.push(i, j);            
                arr[i][j] = 3;
                break;
            default:
                break;
            }
        }
        
    }
    return {
        start : start,
        end : end,
        arr : arr
    };

}


