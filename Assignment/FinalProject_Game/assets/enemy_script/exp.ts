// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    onLoad() {
        this.node.zIndex = 5

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

        this.scheduleOnce(() => {
            this.node.destroy();
        }, 20);
    }

    // onBeginContact(contact, selfCollider, otherCollider) {
    //     if (otherCollider.node.name === 'Player') {
        
    //         // selfCollider.node.removeFromParent(false);
    //         console.log("exp")
    //         selfCollider.node.destroy();
    //     }
    // }
}
