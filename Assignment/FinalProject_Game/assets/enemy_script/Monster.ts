import { MonsterManager } from './MonsterManager'; // 确保路径正确

const { ccclass, property } = cc._decorator;

@ccclass
export default class Monster extends cc.Component {
    // @property(cc.Node)
    // player: cc.Node = null; // 引用玩家节点

    @property(cc.Prefab)
    exp: cc.Prefab = null;

    @property(cc.Prefab)
    video_game: cc.Prefab = null;

    @property(cc.Prefab)
    redbull: cc.Prefab = null;

    @property(cc.Prefab)
    chatgpt: cc.Prefab = null;

    @property(cc.AudioClip)
    hurtsound: cc.AudioClip = null;
    

    // 怪物速度
    speed: number = 100;
    private animation: cc.Animation = null;

    private life:number = 1;

    private dead:boolean = false;
    

    onLoad() {

        // this.playAnimation(this.node.name+'_idle', () => {
        // });
        this.life = 5;
        this.dead = false;
        this.node.zIndex = 6
        if(this.node.name === "ice") this.life = 4;
        else if(this.node.name === "pumpkin") this.life = 3;
        else if(this.node.name === "bat") this.life = 2;
        else this.life = 1;

        //this.life = 5;

        if(this.node.name === "wind") this.speed = 250;
        if(this.node.name === "ice") this.speed = 80;
        if(this.node.name === "bat") this.speed = 150;

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

    getPlayerByName(name: string): cc.Node {
        // 使用 cc.find 或者 getChildByName 来找到玩家节点
        return cc.find(`Canvas/${name}`); // 假设玩家节点在 Canvas 下
    }

    update(dt: number) {
        // 如果玩家节点存在，计算追踪向量
        if(!this.dead){
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
    // onCollisionEnter(other, self) {
    //     console.log("collide");
    //     // 当怪物与其他物体碰撞时回收
    //     if (other.node.name === 'Player') {
    //         console.log("kill recy");
    //         this.getMonsterManager().recycleMonster(this.node);
    //     }
    // }

    changeColorTemporarily(node: cc.Node, color: cc.Color, duration: number) {
        const originalColor = node.color;
        node.color = color;

        this.scheduleOnce(() => {
            node.color = originalColor;
        }, duration);
    }

    playSoundEffect(a:cc.AudioClip) {
        if (a) {
            cc.audioEngine.playEffect(a, false);
        }
    }



    onBeginContact(contact, selfCollider, otherCollider) {
        // 当怪物与其他物体碰撞时回收
        if(this.dead) return;
        if ((otherCollider.node.name === 'Bullet' || otherCollider.node.name === 'Bullet_ring' || otherCollider.node.name === 'Boomb_player' || otherCollider.node.name === 'CircleAttack' || otherCollider.node.name === 'BouncingBall') && this.life >=1) { 
            this.life -=1;
            this.changeColorTemporarily(selfCollider.node, cc.Color.RED, 0.1);
            this.playSoundEffect(this.hurtsound);
    

            // console.log("collide: ", this.life);
        }
        if((otherCollider.node.name === 'Bullet' || otherCollider.node.name === 'Bullet_ring' || otherCollider.node.name === 'Boomb_player' || otherCollider.node.name === 'CircleAttack' || otherCollider.node.name === 'BouncingBall') && this.life <= 0){
                this.dead = true;

                // console.log("kill")
                
                const rigidBody = selfCollider.node.getComponent(cc.RigidBody);
                if (rigidBody) {
                    rigidBody.linearVelocity = cc.v2(0, 0);
                    rigidBody.angularVelocity = 0;
                }
                
                const collider = selfCollider.node.getComponent(cc.Collider);
                if (collider) {
                    collider.enabled = false;
                }

                
                
                this.playAnimation(this.node.name+'_die', () => {
                    const newNode = cc.instantiate(this.exp);
                    newNode.setPosition(this.node.x, this.node.y);
                    this.node.parent.addChild(newNode);
                    
                    let a = Math.floor(Math.random() * 1000) + 1
                    let b = Math.floor(Math.random() * 1000) + 1
                    let c = Math.floor(Math.random() * 1000) + 1
                    if(a<=10){
                        // console.log("yyyyyyyyyyyy")
                        const video_game = cc.instantiate(this.video_game);
                        video_game.setPosition(this.node.x, this.node.y);
                        this.node.parent.addChild(video_game);
                    }

                    if(b<=10){
                        //console.log("xxxxxxxxxxxx")
                        const redbull = cc.instantiate(this.redbull);
                        redbull.setPosition(this.node.x, this.node.y);
                        this.node.parent.addChild(redbull);
                    }

                    if(c<=20){
                        //console.log("xxxxxxxxxxxx")
                        const chatgpt = cc.instantiate(this.chatgpt);
                        chatgpt.setPosition(this.node.x, this.node.y);
                        this.node.parent.addChild(chatgpt);
                    }
    
                    this.getMonsterManager().recycleMonster(selfCollider.node);
                });
                
            
        }
    }

    playAnimation(animationName: string, callback: () => void) {
        const anim = this.getComponent(cc.Animation);
        if (anim) {
            anim.play(animationName);
            anim.on('finished', () => {
                callback();
                anim.off('finished'); // 移除监听器，以防重复调用
            }, this);
        } else {
            console.log("No animation component found.");
            callback(); // 如果没有动画组件，直接调用回调函数
        }
    }

    getMonsterManager(): MonsterManager {
        // 从节点层次结构中查找 MonsterManager
        return this.node.parent.parent.getComponent(MonsterManager);
    }

    // scheduleDestroyAndRespawn() {
    //     const monsterManager = this.getMonsterManager();
    //     // 3秒后销毁并重生
    //     cc.tween(this.node)
    //         .delay(49)
    //         .call(() => {
    //             // 回收怪物
    //             monsterManager.recycleMonster(this.node);
    //             // 重新生成怪物
    //             // monsterManager.spawnMonster();
    //         })
    //         .start();
    // }

    
}
