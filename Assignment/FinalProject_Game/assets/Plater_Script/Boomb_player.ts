const { ccclass, property } = cc._decorator;
import LandmineAttack from './LandmineAttack'

@ccclass
export default class Boomb_player extends cc.Component {

    private anim: cc.Animation = null;
    private level: number = null;

    onLoad(){
        this.level= cc.find("Canvas/Player/LandmineAttack").getComponent(LandmineAttack).level;
    }

    start () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play("Boomb");

        // 設定動畫完成的回調函數
        this.anim.on('finished', this.onAnimationFinished, this);
    }

    update(dt){
        if(this.level == 0){
            this.node.scale = 1;
        }
        else if(this.level == 1){
            this.node.scale = 2;
        }
        else if(this.level == 2){
            this.node.scale = 3;
        }
        else if(this.level == 3){
            this.node.scale = 4;
        }
    }

    private onAnimationFinished() {
        // 隱藏或移除節點
        this.node.destroy();
    }

}
