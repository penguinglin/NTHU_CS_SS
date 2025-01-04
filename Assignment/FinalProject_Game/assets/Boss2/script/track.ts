const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property()
    pawnspeed: number = 300;

    @property()
    pawnlife: number = 5;

    @property(cc.Prefab)
    BulletPrefab: cc.Prefab = null;

    private physicManager: cc.PhysicsManager = null;
    private rigidBody: cc.RigidBody = null;
    private player: cc.Node = null;
    private screenSize: cc.Size = null;
    private trackTimer: number = 0;
    private trackDuration: number = 5; // in seconds

    private bulletPool: cc.NodePool = new cc.NodePool(); // Node pool for bullets

    onLoad() {
        // this.physicManager = cc.director.getPhysicsManager();
        // this.physicManager.enabled = true;
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

        this.initBulletPool(); // Initialize the bullet pool
    }

    start() {
        this.trackTimer = 0;
        this.schedule(this.bulletcreate, 2);
    }

    update(dt) {
        console.log(this.trackTimer);
        if (this.player) {
            this.trackTimer += dt;
            if (this.trackTimer <= this.trackDuration) {
                this.track();
            } else {
                this.rigidBody.linearVelocity = cc.v2(0, 0); // Stop the character after 5 seconds
            }
        }
    }

    track() {
        if (this.player) {
            let direction = this.player.position.sub(this.node.position).normalize(); //this pos + dir = play pos
            if (Math.abs(this.player.position.sub(this.node.position).len() - 250) <= 10) {
                this.rigidBody.linearVelocity = cc.v2(0, 0);
                return;
            }
            let offset = direction.mul(250); // 250 units away from the player
            let targetPosition = this.player.position.sub(offset); // Calculate the target position

            let directionToTarget = targetPosition.sub(this.node.position).normalize();
            let newVelocity = directionToTarget.mul(this.pawnspeed);
            this.rigidBody.linearVelocity = cc.v2(newVelocity.x, newVelocity.y);
        }
    }

    bulletcreate() {
        if (this.player) {
            let bullet: cc.Node = null;
            if (this.bulletPool.size() > 0) {
                bullet = this.bulletPool.get();
            } else {
                bullet = cc.instantiate(this.BulletPrefab);
            }
            bullet.setPosition(this.node.x, this.node.y);
            cc.find("Canvas").addChild(bullet);
        }
    }

    initBulletPool() {
        for (let i = 0; i < 10; ++i) {
            let bullet = cc.instantiate(this.BulletPrefab);
            this.bulletPool.put(bullet);
        }
    }

    // Call this method when a bullet is no longer needed
    onBulletDestroyed(bullet: cc.Node) {
        this.bulletPool.put(bullet);
    }
}
