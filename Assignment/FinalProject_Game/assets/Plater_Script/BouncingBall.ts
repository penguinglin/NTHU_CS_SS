const { ccclass, property } = cc._decorator;

@ccclass
export default class BouncingBall extends cc.Component {
    @property
    speed: number = 300;

    @property
    maxBounces: number = 3;

    private bounces: number = 0;
    private direction: cc.Vec3 = cc.v3(1, 1, 0);

    onLoad() {
        // 随机初始方向
        this.direction = cc.v3(Math.random() > 0.5 ? 1 : -1, Math.random() > 0.5 ? 1 : -1, 0).normalize();
    }

    update(dt: number) {
        this.node.position = this.node.position.add(this.direction.mul(this.speed * dt));

        // 获取相机节点
        const camera = cc.find("Canvas/Main Camera");

        // 获取相机四边的位置
        const left = camera.x -480;
        const right = camera.x +480;
        const top = camera.y +320;
        const bottom = camera.y -320;

        // 碰到边界反弹
        if (this.node.position.x <= left || this.node.position.x >= right) {
            this.direction.x *= -1;
            this.direction.y *= -1;
            this.bounces++;
        }
        if (this.node.position.y <= bottom || this.node.position.y >= top) {
            this.direction.x *= -1;
            this.direction.y *= -1;
            this.bounces++;
        }

        // 检查反弹次数
        if (this.bounces >= this.maxBounces) {
            this.node.destroy();
        }
    }
}