//计分面板类
class ScorePanpel{
    coreEle:HTMLElement;
    levelEle:HTMLElement;
    maxLevel:number = 10;//最大等级
    upScore:number = 5 ;//几分升一级
    currScore:number = 0;//当前积分
    currLevel:number = 1 //当前等级
    constructor(maxLevel:number = 10 ,upScore:number = 5){
        this.coreEle = document.querySelector('.score_num') as HTMLElement,
        this.levelEle = document.querySelector('.level_num') as HTMLElement,
        this.maxLevel = maxLevel,
        this.upScore = upScore
    }
    addCore(){
        if (this.currLevel < this.maxLevel) {
            this.coreEle.innerHTML = `${++this.currScore}`;
            this.addLevel() 
        }
    }
    addLevel(){
        //到达指定积分升一级
        if ( (this.currScore%this.upScore) === 0 ) { 
            this.levelEle.innerHTML = `${++this.currLevel}`;
        }
    }
}
export default ScorePanpel