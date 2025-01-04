const { ccclass, property } = cc._decorator;
import ExperienceSystem from './ExperienceSystem'; 

@ccclass
export default class RingAttack extends cc.Component {
    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property
    radius: number = 100;

    @property
    speed: number = 5; // 角速度，控制子彈移動速度

    private angles: number[] = []; // 存儲每顆子彈的角度
    private bullets: cc.Node[] = []; // 存儲子彈節點

    private experienceSystem: ExperienceSystem = null;
    private ringAttackLevelLabel: cc.Label = null; // 引用 RingAttackLevelLabel

    private level: number = 0;

    onLoad() {
        this.experienceSystem = cc.find("Canvas/Main Camera/ExperienceBar").getComponent(ExperienceSystem);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        // 查找 RingAttackLevelLabel 节点并获取组件
        this.ringAttackLevelLabel = cc.find("Canvas/Main Camera/SkillUI/RingAttackLevelLabel").getComponent(cc.Label);

        // 初始化 level 显示
        this.updateLevelLabel();

        this.createBullets(2); // 初始化生成2顆子彈
    }

    update(dt: number) {
        this.updateRadius();

        // 更新每顆子彈的角度和位置
        for (let i = 0; i < this.bullets.length; i++) {
            this.angles[i] += this.speed * dt;
            let x = this.radius * Math.cos(this.angles[i]);
            let y = this.radius * Math.sin(this.angles[i]);
            this.bullets[i].setPosition(x, y);
        }
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.c:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && this.level < 3) {
                    this.experienceSystem.useUpgradePoint();
                    this.level += 1;
                    console.log("level:", this.level);
                    this.updateBullets(); // 更新子彈數量
                    this.updateLevelLabel(); // 更新显示的 level
                }
                break;
        }
    }

    private createBullets(count: number) {
        this.clearBullets(); // 清除當前的子彈

        for (let i = 0; i < count; i++) {
            let bullet = cc.instantiate(this.bulletPrefab);
            this.node.parent.addChild(bullet);
            this.bullets.push(bullet);
            this.angles.push((i / count) * Math.PI * 2); // 均勻分布角度
        }
    }

    private clearBullets() {
        // 清除現有子彈節點
        this.bullets.forEach(bullet => bullet.destroy());
        this.bullets = [];
        this.angles = [];
    }

    private updateBullets() {
        let bulletCount;
        switch (this.level) {
            case 0: bulletCount = 2; break;
            case 1: bulletCount = 4; break;
            case 2: bulletCount = 6; break;
            case 3: bulletCount = 8; break;
        }
        this.createBullets(bulletCount);
    }

    private updateRadius() {
        switch (this.level) {
            case 0: this.radius = 80; break;
            case 1: this.radius = 110; break;
            case 2: this.radius = 140; break;
            case 3: this.radius = 170; break;
        }
    }

    private updateLevelLabel() {
        if (this.ringAttackLevelLabel) {
            this.ringAttackLevelLabel.string = `${this.level+1}`;
        }
    }
}
