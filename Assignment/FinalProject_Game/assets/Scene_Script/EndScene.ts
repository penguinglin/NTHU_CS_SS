import Menu from "./Menu";
// import Start from "./Start";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EndScene extends cc.Component {

    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;

    @property({ type: cc.VideoPlayer })
    videoPlayer: cc.VideoPlayer = null;
    @property({ type: cc.AudioClip })
    click: cc.AudioClip = null;
    @property({ type: cc.Node })
    block: cc.Node = null;

    static AudioID_EndScene: number;
    private skip: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 添加键盘事件监听器
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        // 移除键盘事件监听器
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    start() {
        EndScene.AudioID_EndScene = cc.audioEngine.playMusic(this.bgm, true);
        cc.audioEngine.setVolume(EndScene.AudioID_EndScene, Menu.BGMVolume);

        this.playVideo();
        this.scheduleOnce(this.shrinkAndRemoveNodes, 40);
        this.scheduleOnce(this.jumpScene, 100); // 184秒（3分04秒）后直接进入EndScene
        // this.scheduleOnce(this.shrinkAndRemoveBlockAndVideoPlayer, 40);

        // this.scheduleOnce(this.shrinkAndRemoveVideoPlayer, 10);
    }

    playVideo() {
        if (this.videoPlayer) {
            this.videoPlayer.play();
        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.shrinkAndRemoveNodes();
                // this.skip = 1;
                break;
        }
    }

    jumpScene() {
        cc.audioEngine.stopAll();
        cc.game.end();
    }

    BackMenu() {
        // let effect_value = Menu.EffectVolume * 10;
        // cc.audioEngine.play(this.lock, false, effect_value);
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.click, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Menu");
        }, 0.5);
    }

    shrinkAndRemoveNodes() {
        if (this.skip == 1)
            return;
        this.skip = 1;

        if (this.block) {
            cc.tween(this.block)
                .to(1, { scale: 0 })
                .call(() => {
                    this.block.destroy();
                    this.block = null;
                })
                .start();
        }

        if (this.videoPlayer) {
            cc.tween(this.videoPlayer.node)
                .to(1, { scale: 0 }) // 在1秒内缩小到0倍
                .call(() => {
                    this.videoPlayer.node.destroy(); // 销毁 VideoPlayer 节点
                    this.videoPlayer = null; // 清除引用
                })
                .start();
        }
    }



    // update (dt) {}
}
