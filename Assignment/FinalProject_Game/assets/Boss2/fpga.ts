const { ccclass, property } = cc._decorator;

import {PlayerController} from "../Plater_Script/PlayerControl"
import StaminaSystem from "../Plater_Script/StaminaSystem"
import Timer from "../enemy_script/Timer"

import GlobalData from "../Scene_Script/GlobalData";

@ccclass
export default class Boss2 extends cc.Component {

    @property()
    bosslife: number = 40;

    // @property()
    // bossattack: number = 1;

    // @property(cc.Prefab)
    // BossPrefab: cc.Prefab = null;

    // @property(cc.Prefab)
    // BoombPrefab: cc.Prefab = null;

    @property(cc.ProgressBar)
    LifeBar: cc.ProgressBar = null;

    @property(cc.Node)
    timerNode: cc.Node = null;  // 关联 Timer 节点

    private player: cc.Node = null;
    private rigidBody: cc.RigidBody = null;
    private screenSize: cc.Size = null;
    private physicManager: cc.PhysicsManager = null;
    private istouch: boolean = false;
    // private anim: cc.Animation = null;
    private invincible: boolean = false;

    onLoad() {
        this.bosslife = 50;
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.rigidBody = this.getComponent(cc.RigidBody);
        if (!this.rigidBody) {
            console.error("RigidBody component not found");
            return;
        }

        this.screenSize = cc.view.getVisibleSize();

        // 动态查找玩家节点
        this.player = cc.find("Canvas/Player");
        if (!this.player) {
            console.error("Player node not found");
        }
    }

    start() {
        // this.anim = this.getComponent(cc.Animation);
        // this.anim.play("rotate");
    }

    
    update(dt) {
        console.log("ttime: ",cc.find("Canvas/Main Camera/timer").getComponent(Timer).Time()); 
        if (this.bosslife <= 0) {
            cc.audioEngine.stopAllEffects();
            cc.audioEngine.stopMusic();
            let stam = cc.find("Canvas/Main Camera/StaminaBar").getComponent(StaminaSystem).Value()

            if(GlobalData.sigin===false){
                if(stam<=30) cc.director.loadScene("LoseScene");
                else if(stam<60 && stam>30) cc.director.loadScene("WinScene_Normal");
                else if(stam>=60) cc.director.loadScene("WinScene_True");
                return
            }
            // 暫停計時
            // cc.find("Canvas/Main Camera/timer").getComponent(Timer).stopTimer();
            let score = cc.find("Canvas/Main Camera/timer").getComponent(Timer).Time();

            
            // 获取当前登录用户的 UID
            let user = firebase.auth().currentUser;
            let userIdd = user.uid;
            const dbRef = firebase.database().ref('users/'+ userIdd);
            let time
            // Listen for data changes
            dbRef.on('value', (snapshot) => {
                const data = snapshot.val();
                time = Math.floor(data.time.time);
            });

            let a = time===0?score:Math.min(time,score);

    
            if (user) {
                console.log("user:", user +"  "+ userIdd)
                let userId = user.uid;
                let userScoreRef = firebase.database().ref('users/' + userId+"/time/");
                
                if(stam<=30) cc.director.loadScene("LoseScene");
                else if(stam<60 && stam>30) cc.director.loadScene("WinScene_Normal");
                else if(stam>=60) cc.director.loadScene("WinScene_True");
                
                firebase.database().ref('users/' + userId+"/time/").set({
                    time: a,
                }).then(() => {
                }).catch(error => {
                    console.error("Failed to save email to database:", error);
                });


                
                firebase.database().ref('leaderboard/' + a)
                .update(
                    {email: user.email
                });

                firebase.database().ref('users/' + userId+"/time/").set({
                    time: a,
                }).then(() => {
                }).catch(error => {
                    console.error("Failed to save email to database:", error);
                });
                return
                // 切换到菜单场景
                
            } 
            else {
                console.error("No user is signed in.");
                if(stam<=30) cc.director.loadScene("LoseScene");
                else if(stam<60 && stam>30) cc.director.loadScene("WinScene_Normal");
                else if(stam>=60) cc.director.loadScene("WinScene_True");
                return
            }
            cc.director.loadScene("Menu")
        }
    
        // 更新生命条
        this.LifeBar.progress = this.bosslife / 50;
    }
    

    // moveToPlayer() {
    //     if (this.player) {
    //         let direction = this.player.position.sub(this.node.position).normalize();
    //         let newVelocity = direction.mul(this.bossspeed);
    //         this.rigidBody.linearVelocity = cc.v2(newVelocity.x, newVelocity.y);
    //     }
    // }

    // Split() {
    //     const camera = cc.find("Canvas/Main Camera");
    //     //console.log(123);
    //     console.log(this.node.name);
    //     if(this.node.name != "Boss1_4"){
    //         let rand = Math.random();
    //         let pos1x = null;
    //         let pos1y = null;
    //         if(rand <0.25){
    //             pos1x = camera.x-480;
    //             pos1y = camera.y-320;
    //         }
    //         else if(rand <0.5){
    //             pos1x = camera.x-480;
    //             pos1y = camera.y+320;
    //         }
    //         else if(rand <0.75){
    //             pos1x = camera.x+480;
    //             pos1y = camera.y-320;
    //         }
    //         else{
    //             pos1x = camera.x+480;
    //             pos1y = camera.y+320;
    //         }
    //         let item1 = cc.instantiate(this.BossPrefab);
    //         item1.setPosition(this.node.x-20, this.node.y);
    //         this.node.parent.addChild(item1);
    //         let rand2 = Math.random();
    //         let pos2x = null;
    //         let pos2y = null;
    //         if(rand2 <0.25){
    //             pos1x = camera.x-480;
    //             pos1y = camera.y-320;
    //         }
    //         else if(rand2 <0.5){
    //             pos1x = camera.x-480;
    //             pos1y = camera.y+320;
    //         }
    //         else if(rand2 <0.75){
    //             pos1x = camera.x+480;
    //             pos1y = camera.y-320;
    //         }
    //         else{
    //             pos1x = camera.x+480;
    //             pos1y = camera.y+320;
    //         }

    //         let item2 = cc.instantiate(this.BossPrefab);
    //         item2.setPosition(this.node.x+20, this.node.y);
    //         this.node.parent.addChild(item2);
    //     }
    //     let item3 = cc.instantiate(this.BoombPrefab);
    //     item3.setPosition(this.node.x-1, this.node.y-1);
    //     this.node.parent.addChild(item3);
    //     this.node.destroy();
    // }

    changeColorTemporarily(node: cc.Node, color: cc.Color, duration: number) {
        const originalColor = node.color;
        node.color = color;

        this.scheduleOnce(() => {
            node.color = originalColor;
        }, duration);
    }

    onBeginContact(contact, self, other) {
        // if (other.node.name == "Player") {
        //     this.istouch = true;
        //     this.bosslife -= 5;
        //     //console.log(this.bosslife);
        // }
        const damageMonster = other.node;
        if(other.node.name === 'Bullet' || other.node.name === 'Bullet_ring' || other.node.name === 'Boomb_player' || other.node.name === 'CircleAttack' || other.node.name === 'BouncingBall'){
            if (!this.invincible) {
                console.log("hit fpga")
                this.changeColorTemporarily(self.node, cc.Color.RED, 0.1);
                this.bosslife -= 1;
                this.invincible = true;
                    this.scheduleOnce(() => {
                        this.invincible = false;
                    }, 0.5);
            }
        }
        // damageMonster['damageInterval'] = this.schedule(() => {
        //     if (this.contactMonsters.has(damageMonster) && !this.invincible) {
        //         this.changeColorTemporarily(self.node, cc.Color.RED, 0.1);
        //         this.bosslife -= 1;
                

        //         this.invincible = true;
        //         this.scheduleOnce(() => {
        //             this.invincible = false;
        //         }, 0.5);
        //     }
        // }, 0.5);
    }

    // onEndContact(contact, self, other) {
    //     if (other.node.name == "Player") {
    //         this.istouch = false;
    //     }
    // }
}
