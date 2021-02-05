class Snake {
    head: HTMLElement;//蛇头
    bodies: HTMLCollection;//蛇身 包括蛇头
    snakeBox: HTMLElement;//装蛇的容器
    constructor() {
        this.snakeBox = document.getElementById('snake') as HTMLElement;
        this.head = document.querySelector('div#snake div.head') as HTMLElement;
        this.bodies = this.snakeBox.getElementsByClassName('single') as HTMLCollection;
    }
    //蛇头坐标
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    //设置蛇头坐标
    set X(value: number) {
        if (this.X === value) return;//X值未变 
        //判断位置合法性
        if (value < 0 || value > 290) {
            throw new Error('不好意思撞墙了！！！')
        }
        //判断水平位置掉头
        if (this.bodies[1] && (value === (this.bodies[1] as HTMLElement).offsetLeft)) {
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }
        this.bodyMove();
        this.head.style.left = value + 'px';
        this.cheackHeadToBody();
    }
    set Y(value: number) {
        if (this.Y === value) return;//Y值未变 
        //判断位置合法性
        if (value < 0 || value > 290) {
            throw new Error('不好意思撞墙了！！！')
        }
        //判断水平位置掉头
        if (this.bodies[1] && (value === (this.bodies[1] as HTMLElement).offsetTop)) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        this.bodyMove();
        this.head.style.top = value + 'px';
        this.cheackHeadToBody();
    }
    //蛇移动方法 从后往前覆盖
    bodyMove() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let ele = this.bodies[i - 1] as HTMLElement;
            let preX = ele.offsetLeft,
                preY = ele.offsetTop;

            ele = this.bodies[i] as HTMLElement;
            ele.style.left = preX + 'px';
            ele.style.top = preY + 'px';
        };
    }
    //蛇身增加
    addSnake() {
        let createDiv = document.createElement('div');
        createDiv.className = 'single';
        this.snakeBox.append(createDiv)
    }
    //检测自己是否碰到自己身体
    cheackHeadToBody() {
        let x = this.head.offsetLeft,
            y = this.head.offsetTop;
        for (let i = 1; i < this.bodies.length; i++) {
            let ele = this.bodies[i] as HTMLElement;
            if (x === ele.offsetLeft && y === ele.offsetTop) {
                throw new Error('自己撞到自己啦！！！')
            }
        };
    }
}

export default Snake