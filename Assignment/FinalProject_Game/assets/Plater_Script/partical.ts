
const { ccclass, property } = cc._decorator;

@ccclass
export default class Monster extends cc.Component {
    // @property(cc.Node)
    // player: cc.Node = null; // 引用玩家节点

    // @property(cc.Prefab)
    // exp: cc.Prefab = null;

    // @property(cc.Prefab)
    // video_game: cc.Prefab = null;

    // @property(cc.Prefab)
    // redbull: cc.Prefab = null;

    // @property(cc.Prefab)
    // chatgpt: cc.Prefab = null;

    // @property(cc.AudioClip)
    // hurtsound: cc.AudioClip = null;
    

    // 怪物速度
    speed: number = 500;
    // private animation: cc.Animation = null;

    // private life:number = 1;

    // private dead:boolean = false;
    

    onLoad() {


        // // 启用碰撞系统
        // cc.director.getCollisionManager().enabled = true;

        // 启用物理系统
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        p.gravity = cc.v2(0, 0);
    }

    getPlayerByName(name: string): cc.Node {
        // 使用 cc.find 或者 getChildByName 来找到玩家节点
        return cc.find(`Canvas/${name}`); // 假设玩家节点在 Canvas 下
    }

    update(dt: number) {
        // 如果玩家节点存在，计算追踪向量
            const player = this.getPlayerByName("Player");
            if (player) {
                // 添加偏移量
                const offsetX = 0;
                const offsetY = 0;

                // 计算带有偏移的目标位置
                const targetPosition = player.position.add(cc.v3(offsetX, offsetY,0));

                // 计算怪物到目标位置的距离
                const distance = this.node.position.sub(targetPosition).mag();

                // 如果距离小于等于10，怪物才移动
                if (distance >= 0) {
                    const direction = targetPosition.sub(this.node.position).normalize();
                    const velocity = direction.mul(this.speed * dt);
                    this.node.position = this.node.position.add(velocity);
                }
            }
    }




}
