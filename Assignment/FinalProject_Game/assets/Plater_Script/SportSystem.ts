const { ccclass, property } = cc._decorator;

@ccclass
export default class SportSystem extends cc.Component {
    @property(cc.ProgressBar)
    staminaBar: cc.ProgressBar = null;

    @property
    maxStamina: number = 100;

    @property
    currentStamina: number = 100;

    @property
    staminaIncreaseRate: number = 50; // 每秒增加的体力值

    private player: cc.Node = null;

    onLoad() {
        this.player = cc.find("Canvas/Player");
        this.schedule(this.increaseStamina, 1); // 每秒调用一次增加体力值方法
    }

    increaseStamina() {
        this.currentStamina += this.staminaIncreaseRate;
        if (this.currentStamina > this.maxStamina) {
            this.currentStamina = this.maxStamina;
        }
        this.updateStaminaBar();
    }

    updateStaminaBar() {
        if (this.staminaBar) {
            cc.tween(this.staminaBar)
                .to(1, { progress: this.currentStamina / this.maxStamina })
                .start();
        }
    }

    resetStamina() {
        this.currentStamina = 0;
        this.updateStaminaBar();
        this.schedule(this.increaseStamina, 1.5);
    }
}
