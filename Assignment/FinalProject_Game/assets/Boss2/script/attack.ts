const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property()
    bulletspeed: number = 400;

    private physicManager: cc.PhysicsManager = null;
    private rigidBody: cc.RigidBody = null;
    private player: cc.Node = null;
    private istouch: boolean = false;
    private screenSize: cc.Size = null;
    private direction: cc.Vec3 = null;

    onLoad() {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.rigidBody = this.getComponent(cc.RigidBody);
        if (!this.rigidBody) {
            console.error("RigidBody component not found");
            return;
        }

        this.screenSize = cc.view.getVisibleSize();

        this.player = cc.find("Canvas/Player");
        if (!this.player) {
            console.error("Player node not found");
        }
    }

    start() {
        this.setInitialDirection();  // 设置初始方向
    }

    update(dt) {
        if (this.node.y > cc.winSize.height) {
            this.node.destroy();
        }
        if (this.istouch) this.node.destroy();

        // 根据初始方向移动
        if (this.direction) {
            let newVelocity = this.direction.mul(this.bulletspeed);
            this.rigidBody.linearVelocity = cc.v2(newVelocity.x, newVelocity.y);
        }
    }

    setInitialDirection() {
        if (this.player) {
            this.direction = this.player.position.sub(this.node.position).normalize();
        }
    }

    onBeginContact(contact, self, other) {
        if (other.node.name == "Player") {
            this.istouch = true;
        }
    }

    onEndContact(contact, self, other) {
        if (other.node.name == "Player") {
            this.istouch = false;
        }
    }
}
