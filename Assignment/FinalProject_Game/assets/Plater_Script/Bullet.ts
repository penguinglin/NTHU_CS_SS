const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {
    @property
    speed: number = 300; // 調整速度為 300

    private direction: cc.Vec3 = cc.Vec3.ZERO;

    // 设置子弹的移动方向
    setDirection(direction: cc.Vec2) {
        this.direction = new cc.Vec3(direction.x, direction.y, 0).normalize();
    }

    update(deltaTime: number) {
        const deltaMove = this.direction.mul(this.speed * deltaTime);
        this.node.position = this.node.position.add(deltaMove);

        //如果子彈超出畫面，則銷毀子彈
        const visibleSize = cc.view.getVisibleSize();
        if (this.node.x < -visibleSize.width  ||
            this.node.x > visibleSize.width  ||
            this.node.y < -visibleSize.height  ||
            this.node.y > visibleSize.height ) {
            this.node.destroy();
        }
    }
}