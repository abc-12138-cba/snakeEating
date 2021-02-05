import Food from './Food';//Food类
import ScorePanpel from './ScorePanpel';//计分板类
import Snake from './Snake';//蛇类

//游戏的控制器
class GameControl {
    food: Food;
    scorePanpel: ScorePanpel;
    snake: Snake;
    ifLive: boolean = true;
    direction: string = 'ArrowRight'
    constructor() {
        this.food = new Food();
        this.scorePanpel = new ScorePanpel();
        this.snake = new Snake();

        this.init();//初始化 游戏开始
    }
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run();
    }
    keydownHandler(event: KeyboardEvent) {
        //判断按键合法性
        if (! /^(ArrowDown|ArrowUp|ArrowLeft|ArrowRight)$/.test(event.key)) return;  
        this.direction = event.key; 
    }
    run(){
        let x = this.snake.X,
        y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
                y -= 10;
                break;
            case 'ArrowDown':
                y += 10;
                break;
            case 'ArrowLeft':
                x -= 10;
                break;
            case 'ArrowRight':
                x += 10;
                break;
        }
        //检查是否吃到食物
        this.cheackEat(x,y);
        try {
            this.snake.X = x;
            this.snake.Y = y
        } catch (error) {
            console.log( error );
            alert(error.message)
            this.ifLive = false
        }
         

        this.ifLive && setTimeout(this.init.bind(this),300 - (this.scorePanpel.currLevel * 30));  
    }
    //判断是否吃到食物
    cheackEat(currX:number,currY:number){
        if ( (this.food.X === currX) && (this.food.Y === currY ) ) {
            this.food.change();
            this.snake.addSnake();
            this.scorePanpel.addCore();
        }
    }
}
export default GameControl