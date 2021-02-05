class Food{
    foodEle:HTMLElement;
    constructor(){
        this.foodEle = document.getElementById('food') as HTMLElement;
    }
    //获取食物坐标
    get X(){
        return this.foodEle.offsetLeft
    }
    get Y(){
        return this.foodEle.offsetTop
    }
    //食物位置改变
    change(){
        // 水平 竖直都是 0~290的范围，且以10为单位 
        this.foodEle.style.top = Math.floor( Math.random()*30 ) * 10 + 'px';
        this.foodEle.style.left = Math.floor( Math.random()*30 ) * 10 + 'px';
    }
}
export default Food