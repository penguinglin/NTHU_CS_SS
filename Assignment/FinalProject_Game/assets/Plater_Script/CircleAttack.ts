const { ccclass, property } = cc._decorator;
import ExperienceSystem from './ExperienceSystem'; 
import { PlayerController } from './PlayerControl';

@ccclass
export default class CircleAttack extends cc.Component {

    private experienceSystem: ExperienceSystem = null;
    private player: PlayerController = null;

    private level: number = 0;
    private circleAttackLevelLabel: cc.Label = null; // 引用 CircleAttackLevelLabel

    onLoad() {
        this.experienceSystem = cc.find("Canvas/Main Camera/ExperienceBar").getComponent(ExperienceSystem);
        this.player = cc.find("Canvas/Player").getComponent(PlayerController);
        
        // 查找 CircleAttackLevelLabel 节点并获取组件
        this.circleAttackLevelLabel = cc.find("Canvas/Main Camera/SkillUI/CircleAttackLevelLabel").getComponent(cc.Label);

        // 初始化 level 显示
        this.updateLevelLabel();

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(dt: number) {
        switch (this.level) {
            case 0:
                this.node.scale = 1;
                break;
            case 1:
                this.node.scale = 1.1;
                break;
            case 2:
                this.node.scale = 1.2;
                break;
            case 3:
                this.node.scale = 1.3;
                break;
        }
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.v:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && this.level < 3) {
                    this.experienceSystem.useUpgradePoint();
                    this.level += 1; // 按下 G 键消耗升级点数并增加 CircleAttack
                    this.player.playerLife *= 1.2;
                    this.player.playermaxLife *= 1.2;
                    console.log("level :", this.level);
                    console.log(this.player.playerLife);
                    this.updateLevelLabel(); // 更新显示的 level
                }
                break;
        }
    }

    private updateLevelLabel() {
        if (this.circleAttackLevelLabel) {
            this.circleAttackLevelLabel.string = `${this.level+1}`;
        }
    }
}


