const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;


    start() {
        this.animateProgressBar();
    }

    animateProgressBar() {
        if (this.progressBar) {
            this.progressBar.progress = 0;
            cc.tween(this.progressBar)
                .to(3, { progress: 1 })
                .start();
        }

        // this.scheduleOnce(() => {
        //     cc.audioEngine.stopAll();
        //     cc.director.loadScene("Stage1");
        // }, 3);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("game");
        }, 3);
    }

}
