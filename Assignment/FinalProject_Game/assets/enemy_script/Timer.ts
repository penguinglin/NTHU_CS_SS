const { ccclass, property } = cc._decorator;

@ccclass
export default class Timer extends cc.Component {

    private elapsedTime: number = 0;  // 记录经过的时间
    private timerRunning: boolean = false;

    @property(cc.Label)
    label: cc.Label = null;  // 可选的：显示时间的标签

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 初始化计时器
        this.elapsedTime = 0;
    }

    startTimer() {
        this.elapsedTime = 0;
        this.timerRunning = true;
    }

    stopTimer() {
        this.timerRunning = false;
    }

    resetTimer() {
        this.elapsedTime = 0;
        this.updateLabel();
    }

    Time() {
        return this.elapsedTime
    }

    update(dt) {
        if (this.timerRunning) {
            this.elapsedTime += dt;
            this.updateLabel();
        }
    }

    updateLabel() {
        if (this.label) {
            const minutes = Math.floor(this.elapsedTime / 60);
            const seconds = Math.floor(this.elapsedTime % 60);
            const minuteStr = minutes < 10 ? '0' + minutes : minutes.toString();
            const secondStr = seconds < 10 ? '0' + seconds : seconds.toString();
            this.label.string = `${minuteStr}:${secondStr}`;
        }
    }
}
