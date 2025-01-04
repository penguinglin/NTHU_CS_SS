const { ccclass, property } = cc._decorator;

@ccclass
export default class ShotgunAttack extends cc.Component {
    @property
    damage: number = 10;

    @property
    duration: number = 0.5;

    @property
    bulletCount: number = 5;

    @property
    spreadAngle: number = 30;

    onLoad() {
        this.schedule(this.applyDamage, 1.0);
        this.scheduleOnce(this.destroySelf, this.duration);
    }

    applyDamage() {
        // 在这里实现对敌人的伤害逻辑
        for (let i = 0; i < this.bulletCount; i++) {
            const angle = (i - Math.floor(this.bulletCount / 2)) * (this.spreadAngle / (this.bulletCount - 1));
            cc.log(`Applying damage: ${this.damage} at angle ${angle}`);
            // 你可以在这里实现发射子弹的逻辑，例如创建子弹并设置其角度和速度
        }
    }

    destroySelf() {
        this.node.destroy();
    }
}

