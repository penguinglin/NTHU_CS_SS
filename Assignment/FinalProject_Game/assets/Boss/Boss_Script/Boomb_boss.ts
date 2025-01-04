const { ccclass, property } = cc._decorator;

@ccclass
export default class Boomb_boss extends cc.Component {

    private anim: cc.Animation = null;

    @property({type: cc.AudioClip})
    boomb: cc.AudioClip = null;

    start () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play("Boomb");
        cc.audioEngine.playEffect(this.boomb, false);

        // 設定動畫完成的回調函數
        this.anim.on('finished', this.onAnimationFinished, this);
    }

    private onAnimationFinished() {
        // 隱藏或移除節點
        this.node.destroy();
    }
}
