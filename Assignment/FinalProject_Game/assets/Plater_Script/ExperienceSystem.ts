const { ccclass, property } = cc._decorator;

@ccclass
export default class ExperienceSystem extends cc.Component {
    @property(cc.Label)
    levelLabel: cc.Label = null;

    @property(cc.ProgressBar)
    experienceBar: cc.ProgressBar = null;

    @property(cc.Label)
    upgradePointsLabel: cc.Label = null; // 新增升级点数的 Label

    @property
    maxExperience: number = 100;

    @property
    currentExperience: number = 0;

    @property
    levelUpExperience: number = 100;

    @property
    upgradePoints: number = 0; // 升级点数

    @property(cc.AudioClip)
    upgrade: cc.AudioClip = null;

    private level: number = 1;
    playSoundEffect(a:cc.AudioClip) {
        if (a) {
            cc.audioEngine.playEffect(a, false);
        }
    }

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.updateUI(); // 游戏开始时更新 UI
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    
    addExperience(amount: number) {
        this.currentExperience += amount;
        cc.log(`Experience added: ${amount}, currentExperience: ${this.currentExperience}`);
        if (this.currentExperience >= this.levelUpExperience) {
            this.levelUp();
        }
        this.updateUI();
    }

    //經驗值滿了升級
    levelUp() {
        this.level++;
        this.currentExperience -= this.levelUpExperience;
        this.levelUpExperience *= 1.8; // 每次升级后需要更多经验
        this.upgradePoints++; // 增加一个升级点数

        this.playSoundEffect(this.upgrade)

        // 触发 level-up 事件
        cc.log(`Level up! New level: ${this.level}`);
        this.node.emit('level-up', this.level);
        this.updateUI();
    }

    //更新技能點數
    updateUI() {
        this.levelLabel.string = 'Lv' + this.level;
        this.experienceBar.progress = this.currentExperience / this.levelUpExperience;
        this.upgradePointsLabel.string = 'Points: ' + this.upgradePoints; // 更新升级点数
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        if (event.keyCode === cc.macro.KEY.e) {
            this.addExperience(10); // 按下 E 键增加经验值
        }
    }

    useUpgradePoint() {
        if (this.upgradePoints > 0) {
            this.upgradePoints--;
            this.updateUI(); // 使用升级点数后更新 UI
            return true;
        }
        return false;
    }
}



