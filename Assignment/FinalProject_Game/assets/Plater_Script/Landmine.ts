const { ccclass, property } = cc._decorator;

@ccclass
export default class Landmine extends cc.Component {
    @property(cc.Prefab)
    BoombPrefab: cc.Prefab = null;

    private rigidBody: cc.RigidBody = null;
    private physicManager: cc.PhysicsManager = null;

    onLooad(){
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.rigidBody = this.getComponent(cc.RigidBody);
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === "bat" ||
        otherCollider.node.name === "ghast" ||
        otherCollider.node.name === "ice" ||
        otherCollider.node.name === "pumpkin" ||
        otherCollider.node.name === "wind") {
            let boomb = cc.instantiate(this.BoombPrefab);
            boomb.setPosition(this.node.position);
            this.node.parent.addChild(boomb);
            this.node.destroy();
        }
    }
}