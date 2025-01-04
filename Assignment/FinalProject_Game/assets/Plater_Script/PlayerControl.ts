import ExperienceSystem from './ExperienceSystem'; // Import the ExperienceSystem class
import StaminaSystem from './StaminaSystem';
const { ccclass, property } = cc._decorator;
import SportSystem from './SportSystem';

import Timer from "../enemy_script/Timer"

@ccclass
export class PlayerController extends cc.Component {

    @property()
    playerSpeed: number = 300;

    @property()
    playerLife: number = 150;

    @property()
    playermaxLife: number = 150;

    @property(cc.Prefab)
    newAttackPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    ringAttackPrefab: cc.Prefab = null; // 新的散弹枪攻击预制体

    @property(cc.Prefab)
    landmineAttackPrefab: cc.Prefab = null;

    @property(cc.ProgressBar)
    LifeBar: cc.ProgressBar = null;

    @property(cc.Prefab)
    bouncingBallPrefab: cc.Prefab = null;

    @property(SportSystem)
    sportSystem: SportSystem = null;

    @property(cc.AudioClip)
    rollSound: cc.AudioClip = null;

    private moveDir: cc.Vec2 = cc.v2(0, 0);
    private upDown: boolean = false;
    private downDown: boolean = false;
    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private physicManager: cc.PhysicsManager = null;
    private idleFrame: cc.SpriteFrame = null;
    private anim: cc.Animation = null;
    private experienceSystem: ExperienceSystem = null;
    private contactMonsters: Set<cc.Node> = new Set();
    private invincible: boolean = false;
    private staminaSystem: StaminaSystem = null;
    private overlay: cc.Node = null;

    private dead: boolean = false;
    private iscircle: boolean = false;
    private isring: boolean = false;
    private ismoloto: boolean = false;
    private bouncingBallEnabled: boolean = false;
    private bouncelevel: number = -1;
    private level: number = 0;
    private BouncingBallAttackLevelLabel: cc.Label = null;
    private rigidBody: cc.RigidBody = null;

    onLoad() {
        // this.node.zIndex = 8
        this.BouncingBallAttackLevelLabel = cc.find("Canvas/Main Camera/SkillUI/BouncingBallAttackLevelLabel").getComponent(cc.Label);

        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;
        this.physicManager.gravity = cc.v2(0, -200);
        this.rigidBody = this.getComponent(cc.RigidBody);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // 获取 ExperienceSystem 组件
        this.experienceSystem = cc.find("Canvas/Main Camera/ExperienceBar").getComponent(ExperienceSystem);
        if (this.experienceSystem) {
            cc.log('ExperienceSystem component found');
            // 绑定 level-up 事件
            this.experienceSystem.node.on('level-up', this.onLevelUp, this);
        } else {
            cc.error('ExperienceSystem component not found');
        }

        this.staminaSystem = cc.find("Canvas/Main Camera/StaminaBar").getComponent(StaminaSystem);
        if (this.staminaSystem) {
            cc.log('StaminaSystem component found');
        } else {
            cc.error('StaminaSystem component not found');
        }

        this.overlay = cc.find("Canvas/Main Camera/Overlay");

    }

    start() {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim = this.node.getComponent(cc.Animation);

        // 确保一开始播放 idle 动画
        this.playAnimation("player_idle");
    }
    //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed * this.moveDir, this.getComponent(cc.RigidBody).linearVelocity.y);

    update(dt: number) {
        this.rigidBody.linearVelocity = cc.v2(this.playerSpeed * this.moveDir.x, this.playerSpeed * this.moveDir.y)
        if (this.moveDir.x !== 0) {
            this.node.scaleX = (this.moveDir.x >= 0) ? 1 : -1;
        }

        this.LifeBar.progress = this.playerLife / this.playermaxLife;
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = true;
                break;
            case cc.macro.KEY.d:
                this.rightDown = true;
                break;
            case cc.macro.KEY.w:
                this.upDown = true;
                break;
            case cc.macro.KEY.s:
                this.downDown = true;
                break;
            case cc.macro.KEY.e:
                if (this.experienceSystem) {
                    this.experienceSystem.addExperience(10); // 按下 E 键增加经验值
                }
                break;

            case cc.macro.KEY.p:
                this.playerLife += 10;
                break;

            case cc.macro.KEY.v:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && !this.iscircle) {
                    this.experienceSystem.useUpgradePoint();
                    this.spawnNewAttack(); // 按下 G 键消耗升级点数并增加 CircleAttack
                    this.iscircle = true;
                }
                break;
            case cc.macro.KEY.c:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && !this.isring) {
                    this.experienceSystem.useUpgradePoint();
                    this.spawnRingAttack();
                    this.isring = true;
                    console.log(123);
                }
                break;
            case cc.macro.KEY.z:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && !this.ismoloto) {
                    this.experienceSystem.useUpgradePoint();
                    this.spawnLandmineAttack();
                    this.ismoloto = true;
                }
                break;

            case cc.macro.KEY.o:
                this.staminaSystem.addStamina();
                console.log("Stamina++");
                break;

            case cc.macro.KEY.i:
                this.staminaSystem.subStamina();
                console.log("Stamina++");
                break;

            case cc.macro.KEY.b:
                if (this.experienceSystem && this.experienceSystem.upgradePoints > 0 && this.bouncelevel < 3) {
                    this.experienceSystem.useUpgradePoint();
                    this.enableBouncingBallAttack(); // 按下 J 键消耗升级点数并启用 BouncingBall 攻击方式
                    this.bouncelevel++;
                    if (this.bouncelevel + 1 <= 3) {
                        this.BouncingBallAttackLevelLabel.string = `${this.bouncelevel + 1}`;
                    }

                }
                break;


            case cc.macro.KEY.space:
                if (this.sportSystem && this.sportSystem.currentStamina === this.sportSystem.maxStamina) {
                    this.rollForward(); // 按下 R 键进行翻滚
                }
                break;
        }
        this.updateMoveDir();
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = false;
                break;
            case cc.macro.KEY.d:
                this.rightDown = false;
                break;
            case cc.macro.KEY.w:
                this.upDown = false;
                break;
            case cc.macro.KEY.s:
                this.downDown = false;
                break;
        }
        this.updateMoveDir();
    }

    private updateMoveDir() {
        this.moveDir.x = 0;
        this.moveDir.y = 0;
        if (this.leftDown) {
            this.moveDir.x -= 1;
            // this.playAnimation("player_left");
            this.playAnimation("player_right");
        }
        if (this.rightDown) {
            this.moveDir.x += 1;
            this.playAnimation("player_right");
        }
        if (this.upDown) {
            this.moveDir.y += 1;
            this.playAnimation("player_up");
        }
        if (this.downDown) {
            this.moveDir.y -= 1;
            this.playAnimation("player_down");
        }
        if (!this.leftDown && !this.rightDown && !this.upDown && !this.downDown) {
            this.playAnimation("player_idle");
        }
        this.moveDir.normalizeSelf();
    }

    playAnimation(animationName: string) {
        if (this.anim && (!this.anim.currentClip || this.anim.currentClip.name !== animationName)) {
            cc.log(`Playing animation: ${animationName}`);
            this.anim.play(animationName);
        }
    }

    private onLevelUp(level: number) {
        cc.log('Player leveled up to level:', level);
    }

    private spawnNewAttack() {
        if (this.newAttackPrefab) {
            const newAttack = cc.instantiate(this.newAttackPrefab);
            // this.node.zIndex = 8
            // newAttack.zIndex = 7
            this.playerLife *= 1.2;
            this.playermaxLife *= 1.2;
            newAttack.setPosition(0, 0); // 确保位置为相对于玩家节点
            this.node.addChild(newAttack); // 添加到玩家节点，并设置zIndex为-1确保在玩家图像下方
            cc.log('Spawned new CircleAttack');
        }
    }

    private spawnRingAttack() {
        if (this.ringAttackPrefab) {
            const ringAttack = cc.instantiate(this.ringAttackPrefab);
            ringAttack.setPosition(this.node.position); // 确保位置为相对于玩家节点
            this.node.addChild(ringAttack); // 添加到玩家的父节点，以便相对于玩家的位置
            cc.log('Spawned new ringAttack');
        }
    }

    private spawnLandmineAttack() {
        if (this.landmineAttackPrefab) {
            const landmineAttack = cc.instantiate(this.landmineAttackPrefab);
            landmineAttack.setPosition(this.node.position); // 确保位置为相对于玩家节点
            console.log(this.node.parent);
            this.node.addChild(landmineAttack); // 添加到玩家的父节点，以便相对于玩家的位置
            cc.log('Spawned newlandmineAttack');
        }
    }

    private enableBouncingBallAttack() {
        if (!this.bouncingBallEnabled) {
            this.bouncingBallEnabled = true;
            this.schedule(this.spawnBouncingBall, 3); // 每隔三秒发射一个新的球
            console.log('BouncingBall attack enabled');
        }
    }

    private spawnBouncingBall() {
        if (this.bouncingBallPrefab) {
            const bouncingBall = cc.instantiate(this.bouncingBallPrefab);
            bouncingBall.scale = 0.5 + 0.2 * this.bouncelevel;
            bouncingBall.setPosition(this.node.position); // 确保位置为相对于玩家节点
            this.node.parent.addChild(bouncingBall); // 添加到玩家的父节点，以便相对于玩家的位置
            cc.log('Spawned new BouncingBall');
        }
    }


    private rollForward() {
        const rollDistance = 300; // 翻滚距离
        const rollDuration = 0.3; // 翻滚时间

        // 计算翻滚的目标位置
        const rollDirection = cc.v3(this.moveDir.x, this.moveDir.y, 0).normalize().mul(rollDistance);
        const targetPosition = this.node.position.add(rollDirection);

        // 使用tween实现翻滚效果
        cc.tween(this.node)
            .to(rollDuration, { position: targetPosition }, { easing: 'quadInOut' })
            .call(() => {
                // 在翻滚完成时播放音效
                cc.audioEngine.playEffect(this.rollSound, false); // 假设音效资源的名字为 "roll_sound"
            })
            .start();

        // 重置体力值
        this.sportSystem.resetStamina();
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        console.log("this.playerLife:" , this.playerLife)
        if (this.playerLife <= 0) {
            // cc.audioEngine.stopAllEffects();
            cc.audioEngine.pauseAllEffects();
            cc.audioEngine.stopMusic();
            this.playAnimation("player_die");
            // const cover = cc.find("Canvas/Main Camera/Overlay1");
            // 例如，某个事件触发时调用
            this.applyVisionRestriction1(255);  // 从当前透明度渐变到255

            let time = cc.find("Canvas/Main Camera/timer").getComponent(Timer).Time()

            if (time >= 150) {
                this.scheduleOnce(() => {
                    // cc.audioEngine.stopAll();
                    cc.director.loadScene("LoseScene");
                }, 2.4);
            }
            else {
                this.scheduleOnce(() => {
                    // cc.audioEngine.stopAll();
                    cc.director.loadScene("Menu");
                }, 2.4);
            }
            return;
        }

        if (otherCollider.node.name === "bat" ||
            otherCollider.node.name === "ghast" ||
            otherCollider.node.name === "ice" ||
            otherCollider.node.name === "pumpkin" ||
            otherCollider.node.name === "wind" ||
            otherCollider.node.name === "Boomb" ||
            otherCollider.node.name === "bullet" ||
            otherCollider.node.name === "Boss1" ||
            otherCollider.node.name === "Boss1_2" ||
            otherCollider.node.name === "Boss1_3" ||
            otherCollider.node.name === "Boss1_4") {

            const damageMonster = otherCollider.node;

            if (!this.contactMonsters.has(damageMonster)) {
                this.contactMonsters.add(damageMonster);

                if (!this.invincible) {
                    this.changeColorTemporarily(selfCollider.node, cc.Color.RED, 0.1);
                    if (otherCollider.node.name === "Boomb") this.playerLife <= 40 ? 0 : this.playerLife -= 40;
                    else if (otherCollider.node.name === "Boss1" || otherCollider.node.name === "Boss1_2" || otherCollider.node.name === "Boss1_3" || otherCollider.node.name === "Boss1_4") this.playerLife <= 5 ? 0 : this.playerLife -= 5;
                    else if (otherCollider.node.name === "bullet") this.playerLife <= 20 ? 0 : this.playerLife -= 20;
                    else this.playerLife -= 2;
                    cc.log(`Player Life: ${this.playerLife}`);

                    this.invincible = true;
                    this.scheduleOnce(() => {
                        this.invincible = false;
                    }, 0.5);
                }

                // 设置一个计时器，每0.5秒检查一次
                damageMonster['damageInterval'] = this.schedule(() => {
                    if (this.contactMonsters.has(damageMonster) && !this.invincible) {
                        this.changeColorTemporarily(selfCollider.node, cc.Color.RED, 0.1);
                        if (otherCollider.node.name === "Boomb") this.playerLife <= 40 ? 0 : this.playerLife -= 40;
                        else if (otherCollider.node.name === "Boss1" || otherCollider.node.name === "Boss1_2" || otherCollider.node.name === "Boss1_3" || otherCollider.node.name === "Boss1_4") this.playerLife <= 5 ? 0 : this.playerLife -= 5;
                        else if (otherCollider.node.name === "bullet") this.playerLife <= 20 ? 0 : this.playerLife -= 20;
                        else this.playerLife -= 2;
                        cc.log(`Player Life: ${this.playerLife}`);

                        this.invincible = true;
                        this.scheduleOnce(() => {
                            this.invincible = false;
                        }, 0.3);
                    }
                }, 0.5);
            }
        }
        if (otherCollider.node.name === 'exp') {
            this.experienceSystem.addExperience(10);
            otherCollider.node.destroy();
            console.log("ss");
        }
        if (otherCollider.node.name === 'video_games') {
            // this.experienceSystem.addExperience(10);
            // this.playerLife + 20 >= 30 ? this.playerLife = 30 : this.playerLife += 20;
            this.staminaSystem.addStamina();
            // this.staminaSystem.addStamina();
            otherCollider.node.destroy();
            console.log("reveal: ", this.playerLife);
        }
        if (otherCollider.node.name === 'redbull') {
            // this.experienceSystem.addExperience(10);
            this.playerLife + 30 >= this.playermaxLife ? this.playerLife = this.playermaxLife : this.playerLife += 30;
            otherCollider.node.destroy();
            console.log("reveal: ", this.playerLife);
        }

        // if (otherCollider.node.name === 'redbull') {
        //     // this.experienceSystem.addExperience(10);
        //     this.playerLife + 20 >= 30 ? this.playerLife = 30 : this.playerLife += 20;
        //     otherCollider.node.destroy();
        //     console.log("reveal: ", this.playerLife);
        // }
    }

    changeColorTemporarily(node: cc.Node, color: cc.Color, duration: number) {
        const originalColor = node.color;
        node.color = color;

        this.scheduleOnce(() => {
            node.color = originalColor;
        }, duration);
    }

    onEndContact(contact, selfCollider, otherCollider) {
        if (this.contactMonsters.has(otherCollider.node)) {
            this.contactMonsters.delete(otherCollider.node);

            // 取消计时器
            this.unschedule(otherCollider.node['damageInterval']);
        }
    }

    applySpeedReduction(apply: boolean) {
        if (apply) {
            this.playerSpeed = 200; // 减速到原来的一半
            console.log("Speed reduced");
        } else {
            this.playerSpeed = 300; // 恢复原速度
            console.log("Speed restored");
        }
    }

    applyVisionRestriction(opacity: number) {
        if (this.overlay) {
            this.overlay.opacity = opacity;
        }
    }

    applyVisionRestriction1(targetOpacity: number) {
        const cover = cc.find("Overlay1");
        if (cover) {
            cc.tween(cover)
                .to(0.5, { opacity: targetOpacity })  // 1秒内将透明度变为目标值
                .start();
        }
    }


    applyScreenShake(apply: boolean) {
        if (apply) {
            this.schedule(this.shakeScreen, 0.05); // 画面摇晃
        } else {
            this.unschedule(this.shakeScreen); // 停止画面摇晃
        }
    }

    shakeScreen() {
        const shakeAmount = 15;
        const posX = (Math.random() - 0.5) * shakeAmount;
        const posY = (Math.random() - 0.5) * shakeAmount;
        this.node.position = this.node.position.add(cc.v3(posX, posY, 0));
    }
}
