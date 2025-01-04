const { ccclass, property } = cc._decorator;

@ccclass
export class MonsterManager extends cc.Component {

    @property(cc.Prefab)
    monsterPrefab0: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPrefab1: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPrefab2: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPrefab3: cc.Prefab = null;

    @property(cc.Prefab)
    monsterPrefab4: cc.Prefab = null;

    @property(cc.Node)
    monsterParent: cc.Node = null;

    @property(cc.Node)
    timerNode: cc.Node = null;  // 关联 Timer 节点

    @property(cc.Node)
    Bosslabel2: cc.Node = null;
    
    @property(cc.Node)
    Bosslabel1: cc.Node = null;

    @property(cc.Prefab)
    bossPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    bossPrefab2: cc.Prefab = null;

    @property(cc.AudioClip)
    bgm0: cc.AudioClip = null;

    @property(cc.AudioClip)
    bgm1: cc.AudioClip = null;

    @property(cc.AudioClip)
    bgm2: cc.AudioClip = null;

    @property(cc.AudioClip)
    entry: cc.AudioClip = null;


    private monsterPool: cc.NodePool;
    private spawnInterval: number = 0.3;  // 初始生成间隔

    playBackgroundMusic(b: cc.AudioClip) {
        if (b) {
            cc.audioEngine.playMusic(b, true); // true 表示循环播放
        }
    }

    // 停止背景音乐的方法
    stopBackgroundMusic() {
        cc.audioEngine.stopMusic();
    }

    playSoundEffect(a:cc.AudioClip) {
        if (a) {
            cc.audioEngine.playEffect(a, false);
        }
    }

    onLoad() {
        this.playBackgroundMusic(this.bgm0);
        // 找到 Timer 节点并开始计时器
        this.timerNode = cc.find("Canvas/Main Camera/timer");
        const timer = this.timerNode.getComponent("Timer");
        timer.startTimer();
        
        // 初始化怪物节点池
        this.monsterPool = new cc.NodePool();
        for (let i = 0; i < 800; i++) {
            let monster = this.createMonster();
            this.monsterPool.put(monster);
        }
        // 调度在100秒后生成Boss
        this.scheduleOnce(()=>{
            this.spawnBoss1()
            this.playSoundEffect(this.entry)
            this.scheduleOnce(()=>{cc.audioEngine.stopMusic();
            this.playBackgroundMusic(this.bgm1)}, 4);
        }, 95);

        // this.scheduleOnce(()=>{
        //     cc.director.loadScene("Menu");
        // }, 110);

        this.scheduleOnce(()=>{
            this.spawnBoss2()
            this.playSoundEffect(this.entry)
            this.scheduleOnce(()=>{cc.audioEngine.stopMusic();
            this.playBackgroundMusic(this.bgm2)}, 4);
        }, 150);
    }

    spawnBoss1() {
    
        // 显示Boss到达的标签
        if (this.Bosslabel1) {
            this.Bosslabel1.active = true;
        }
        this.scheduleOnce(()=>{
            this.Bosslabel1.active = false
            let boss = cc.instantiate(this.bossPrefab);
            this.monsterParent.addChild(boss);
            boss.setPosition(cc.find("Canvas/Main Camera").x, cc.find("Canvas/Main Camera").y +200);
        }, 3);
    }

    spawnBoss2() {
        if (this.Bosslabel2) {
            this.Bosslabel2.active = true;
        }
        this.scheduleOnce(()=>{
            this.Bosslabel2.active = false
            let boss = cc.instantiate(this.bossPrefab2);
            this.monsterParent.addChild(boss);
            boss.setPosition(cc.find("Canvas/Main Camera").x, cc.find("Canvas/Main Camera").y +200);
        }, 3);
    }
    

    start() {
        this.schedule(this.adjustSpawnRate, 0.5);  // 每秒调整一次生成速度
        this.schedule(this.spawnMonster, this.spawnInterval);
    }

    adjustSpawnRate() {
        const timer = this.timerNode.getComponent("Timer");
        const elapsedTime = timer.Time();

        if (elapsedTime >= 150) {
            // 超过 90 秒，停止生成怪物
            this.unschedule(this.spawnMonster);
            this.unschedule(this.adjustSpawnRate);
            return;
        }
        console.log("elapsedTime: ",elapsedTime)
        if(elapsedTime >= 100) {
            this.spawnInterval = 0.06;
        }
        else if(elapsedTime >= 90) {
            this.spawnInterval = 0.05;
        }
        else if(elapsedTime >= 80) {
            this.spawnInterval = 0.1;
        }
        else if(elapsedTime >= 60) {
            this.spawnInterval = 0.03;
        }
        else if (elapsedTime >= 30) {
            this.spawnInterval = 0.07;
        } 
        else if (elapsedTime >= 10) {
            this.spawnInterval = 0.1;
        } 
        else {
            this.spawnInterval = 0.3;
        }

        // 重新调度 spawnMonster 方法
        this.unschedule(this.spawnMonster);
        this.schedule(this.spawnMonster, this.spawnInterval);
    }

    spawnMonster() {
        const timer = this.timerNode.getComponent("Timer");
        const elapsedTime = timer.Time();
        let monster: cc.Node = null;

        console.log("this.monsterPool.size:", this.monsterPool.size() )
        
        if (this.monsterPool.size() > 0 && elapsedTime<=100) {
            monster = this.monsterPool.get(this.monsterPool);
        } 
        else {
            monster = this.createMonster();
        }
        // if(monster!= null) monster.getComponent("Monster").init(this.node)
        if(monster!= null){
            this.monsterParent.addChild(monster);
            monster.setPosition(this.getNewMonsterPosition());
            console.log("spawn spawn spawn spawn")
        }

        // 在特定时间后回收怪物
        this.scheduleOnce(() => this.recycleMonster(monster), 20);  // 假设5秒后回收
    }

    createMonster(): cc.Node {
        let prefabIndex = Math.floor(Math.random() * 5);
        let prefabArray = [this.monsterPrefab0, this.monsterPrefab1, this.monsterPrefab2, this.monsterPrefab3, this.monsterPrefab4];
        return cc.instantiate(prefabArray[prefabIndex]);
    }

    getNewMonsterPosition(): cc.Vec2 {
        let x = Math.floor(Math.random() * 8) + 1;
        let y = Math.floor(Math.random() * 4) + 1;
        let randX = 500;
        let randY = 500;

        if(x === 2){
            randY = -500;
            randX = 500;
        } else if(x === 3){
            randY = 500;
            randX = -500;
        } else if(x === 4){
            randY = -500;
            randX = -500;
        } else if(x === 5){
            randY = 250;
            randX = -500;
        } else if(x === 6){
            randY = 250;
            randX = 500;
        } else if(x === 7){
            randY = 500;
            randX = -250;
        } else if(x === 8){
            randY = 500;
            randX = 250;
        } else if(x === 9){
            randY = -250;
            randX = -500;
        }

        randY += y * 3;
        randX += y * 3;
        
        // randY = 0;
        // randX = 0;

        return cc.v2(randX, randY);
    }

    recycleMonster(monster: cc.Node) {
        // 回收怪物节点，放回池中
        // monster.removeFromParent(false);  // 不进行清理操作
        this.monsterPool.put(monster);
    }
}
