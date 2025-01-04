import { PlayerController } from "./PlayerControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StaminaSystem extends cc.Component {
    @property(cc.ProgressBar)
    staminaBar: cc.ProgressBar = null;

    @property
    maxStamina: number = 100;

    @property
    currentStamina: number = 100;

    @property
    staminaDecreaseRate: number = 1; // 每秒减少的心力值

    private player: cc.Node = null;

    onLoad() {
        this.player = cc.find("Canvas/Player");
        this.schedule(this.decreaseStamina, 1.5); // 每秒调用一次减少心力值方法
    }

    /*decreaseStamina() {
        this.currentStamina -= this.staminaDecreaseRate;
        if (this.currentStamina < 0) {
            this.currentStamina = 0;
        }
        this.updateStaminaBar();

        // 根据心力值变化触发不同效果
        const playerController = this.player.getComponent("PlayerController");
        if(playerController) {
            console.log('playerController found');
        }else{
            console.log('playerController not found');
        }
        if (playerController) {
            if (this.currentStamina < 20) {
                playerController.applyScreenShake(true);
            } else {
                playerController.applyScreenShake(false);
            }

            if (this.currentStamina < 98) {
                playerController.applyVisionRestriction(true);
            } else {
                playerController.applyVisionRestriction(false);
            }

            if (this.currentStamina < 90) {
                playerController.applySpeedReduction(true);
            } else {
                playerController.applySpeedReduction(false);
            }
        }


    }*/

    Value(){
        return this.currentStamina;
    }

    decreaseStamina() {
        this.currentStamina -= this.staminaDecreaseRate;
        if (this.currentStamina < 0) {
            this.currentStamina = 0;
        }
        this.updateStaminaBar();

        // 根据心力值变化触发不同效果
        const playerController = this.player.getComponent(PlayerController);
        if (playerController) {
            console.log('playerController found');
            if (this.currentStamina < 70) {
                playerController.applyScreenShake(true);
            } else {
                playerController.applyScreenShake(false);
            }

            // 计算透明度
            let opacity = 0;
            if (this.currentStamina < 80) {     
                opacity = (80 - this.currentStamina) * 5;
                if(opacity>=180){
                    opacity = 180;
                
                } // 每下降 1% 增加 10 透明度
            }

            playerController.applyVisionRestriction(opacity);

            if (this.currentStamina < 60) {
                playerController.applySpeedReduction(true);
            } else {
                playerController.applySpeedReduction(false);
            }
        } else {
            console.log('playerController not found');
        }
    }

    addStamina(){
        this.currentStamina += 10;
        if (this.currentStamina > this.maxStamina) {
            this.currentStamina = this.maxStamina;
        }
        this.updateStaminaBar();
    
    }

    subStamina(){
        this.currentStamina -= 10;
        if (this.currentStamina > this.maxStamina) {
            this.currentStamina = this.maxStamina;
        }
        this.updateStaminaBar();
    
    }

    updateStaminaBar() {
        if (this.staminaBar) {
            this.staminaBar.progress = this.currentStamina / this.maxStamina;
        }
    }
}

