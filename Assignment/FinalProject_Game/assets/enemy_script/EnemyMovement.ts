const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyMovement extends cc.Component {
    onLoad() {
        let collider = this.getComponent(cc.Collider);
        if (collider) {
            collider.enabled = true;
        }

        // 启用碰撞系统
        cc.director.getCollisionManager().enabled = true;

        // 启用物理系统
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        p.gravity = cc.v2(0, 0);
    }

    
}
