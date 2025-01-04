const { ccclass, property } = cc._decorator;
import ExperienceSystem from './ExperienceSystem'; 

@ccclass
export default class LandmineAttack extends cc.Component {

    @property(cc.Prefab)
    landminePrefab: cc.Prefab = null;

    @property()
    level: number = 0;

    private experienceSystem: ExperienceSystem = null;
    private landmineLevelLabel: cc.Label = null; // 引用 LandmineLevelLabel

    onLoad() {
        this.experienceSystem = cc.find("Canvas/Main Camera/ExperienceBar").getComponent(ExperienceSystem);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        // 查找 LandmineLevelLabel 节点并获取组件
        this.landmineLevelLabel = cc.find("Canvas/Main Camera/SkillUI/LandmineLevelLabel").getComponent(cc.Label);

        // 初始化 level 显示
        this.updateLevelLabel();
    }

    start() {
        this.schedule(this.placeLandmine, 2); // 每两秒调用一次placeLandmine方法
        console.log("placed landmine");
    }

    placeLandmine() {
        if (!this.landminePrefab) {
            cc.error("Player node or landmine prefab is not assigned!");
            return;
        }

        const playerPosition = this.node.parent.getPosition();
        const landmine = cc.instantiate(this.landminePrefab);
        landmine.setPosition(playerPosition);
        this.node.parent.parent.addChild(landmine);

        this.scheduleOnce(() => { landmine.active = false }, 5);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.z:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && this.level < 3) {
                    this.experienceSystem.useUpgradePoint();
                    this.level += 1;
                    console.log("level :", this.level);
                    this.updateLevelLabel(); // 更新显示的 level
                }
                break;
        }
    }

    private updateLevelLabel() {
        if (this.landmineLevelLabel) {
            this.landmineLevelLabel.string = `${this.level+1}`;
        }
    }
}
