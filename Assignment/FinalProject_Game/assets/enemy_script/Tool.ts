const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    speed: number = 500;
    static gpt: boolean = false; // 使用静态变量以便所有实例共享

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

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name === 'Player' && selfCollider.node.name === "chatgpt") {
            console.log("gpt");
            NewClass.gpt = true;
            selfCollider.node.opacity = 0
            // 5秒后将gpt设回false
            this.scheduleOnce(() => {
                NewClass.gpt = false;
                selfCollider.node.destroy();
            }, 5);
        }
    }
    

    getPlayerByName(name: string): cc.Node {
        // 使用 cc.find 或者 getChildByName 来找到玩家节点
        return cc.find(`Canvas/${name}`); // 假设玩家节点在 Canvas 下
    }


    update(dt: number) {
        if(NewClass.gpt && this.node.name === "exp"){
            const player = this.getPlayerByName("Player");
            if (player) {
                // 添加偏移量
                const offsetX = 0;
                const offsetY = 0;

                // 计算带有偏移的目标位置
                const targetPosition = player.position.add(cc.v3(offsetX, offsetY, 0));

                // 计算怪物到目标位置的距离
                const distance = this.node.position.sub(targetPosition).mag();

                // 如果距离大于0，怪物才移动
                if (distance > 0) {
                    const direction = targetPosition.sub(this.node.position).normalize();
                    const velocity = direction.mul(this.speed * dt);
                    this.node.position = this.node.position.add(velocity);
                }
            }
        }
    }
}
