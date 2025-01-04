// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Menu from "./Menu";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Stage1 extends cc.Component {

    @property({ type: cc.AudioClip })
    lock: cc.AudioClip = null;
    @property(cc.Prefab)
    gameSetting: cc.Prefab = null;

    @property(cc.Prefab)
    setting: cc.Prefab = null;

    private mainCamera: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.mainCamera = cc.find("Canvas/Main Camera");
    }

    start() {
        this.addButtonClickListener();
    }
    addButtonClickListener() {
        // find the button and add a click event listener
        const setting = cc.find("Canvas/Main Camera/Setting").getComponent(cc.Button);
        if (this.node.getParent().getChildByName("setting")) {
            console.log("this.node.getParent()", this.node);
            // let existingSettingNode = this.node.getParent();
            const stopMusic = cc.find("setting/Bgm_control/Bgm_bt").getComponent(cc.Button);
            const stopMusicHandler = new cc.Component.EventHandler();
            stopMusicHandler.target = this.node;
            stopMusicHandler.component = "Menu";
            stopMusic.clickEvents.push(stopMusicHandler);
        }
        const settingHandler = new cc.Component.EventHandler();
        settingHandler.target = this.node;
        settingHandler.component = "Menu";
        settingHandler.handler = "SettingWindow";
        setting.clickEvents.push(settingHandler);

    }
    SettingWindow() {
        //this.node.getParent()
        console.log("this.node.getParent(): ", this.node.getParent());
        const existingSettingNode = this.node.getParent().getChildByName("setting");

        if (existingSettingNode) {
            cc.log("Setting window is already open!");
            return;
        }
        console.log("Setting window is not open, creating one...");
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        // Load the Setting prefab
        let prefab = cc.instantiate(this.setting);
        prefab.name = "setting";
        this.node.getParent().addChild(prefab);
        // console.log("Prefab parent: ", prefab.getParent());

        // Set initial position above the screen
        prefab.setPosition(471.015, cc.winSize.height);

        // Set the slider positions for BGM and Effect volumes
        const bgmHandle = cc.find("Bgm_control/Bgm/Handle", prefab);
        if (bgmHandle) {
            let xPos = -198 + Menu.BGMVolume * (200 + 198);
            bgmHandle.setPosition(xPos, bgmHandle.position.y);
        }

        const effectHandle = cc.find("Effect_control/Effect/Handle", prefab);
        if (effectHandle) {
            let xPos = -198 + Menu.EffectVolume * (200 + 198);
            effectHandle.setPosition(xPos, effectHandle.position.y);
        }

        // Create a move-in animation
        cc.tween(prefab)
            .to(0.5, { position: cc.v3(this.mainCamera.x+470,this.mainCamera.y+330, 0) }, { easing: 'sineOut' })
            .call(() => {
                // Animation completed
                cc.log("Setting window animation completed!");
                cc.director.pause();
            })
            .start();
    }
    BackWin01() {

        const existingSettingNode = this.node.getParent().getChildByName("setting");
        const existingGameSettingNode = this.node.getParent().getChildByName("Gamesetting");

        if (existingSettingNode || existingGameSettingNode) {
            cc.log("Setting window is already open!");
            return;
        }
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("WinScene_True");
        }, 0.5);

    }

    BackWin02() {
        const existingSettingNode = this.node.getParent().getChildByName("setting");
        const existingGameSettingNode = this.node.getParent().getChildByName("Gamesetting");

        if (existingSettingNode || existingGameSettingNode) {
            cc.log("Setting window is already open!");
            return;
        }
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("WinScene_Normal");
        }, 0.5);

    }

    BackLose() {

        const existingSettingNode = this.node.getParent().getChildByName("setting");
        const existingGameSettingNode = this.node.getParent().getChildByName("Gamesetting");

        if (existingSettingNode || existingGameSettingNode) {
            cc.log("Setting window is already open!");
            return;

        }
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("LoseScene");
        }, 0.5);

    }

    BackMenu() {
        const existingSettingNode = this.node.getParent().getChildByName("setting");
        const existingGameSettingNode = this.node.getParent().getChildByName("Gamesetting");

        if (existingSettingNode || existingGameSettingNode) {
            cc.log("Setting window is already open!");
            return;
        }
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Menu");
        }, 0.5);

    }

    Pause() {
        //this.node.getParent()
        
        const existingSettingNode = this.node.getParent().getChildByName("setting");
        const existingGameSettingNode = this.node.getParent().getChildByName("Gamesetting");

        if (existingSettingNode || existingGameSettingNode) {
            cc.log("Setting window is already open!");
            return;
        }
        console.log("Setting window is not open, creating one...");
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        // Load the Setting prefab
        let prefab = cc.instantiate(this.gameSetting);
        prefab.name = "Gamesetting";
        this.node.getParent().addChild(prefab);
        // console.log("Prefab parent: ", prefab.getParent());

        // Set initial position above the screen
        // prefab.setPosition(471.015, cc.winSize.height);
        prefab.setPosition(471.015, cc.winSize.height);

        // Set the slider positions for BGM and Effect volumes


        // Create a move-in animation
        cc.tween(prefab)
            .to(0.5, { position: cc.v3(this.mainCamera.x+470,this.mainCamera.y+330, 0) }, { easing: 'sineOut' })
            .call(() => {
                // Animation completed
                cc.log("Setting window animation completed!");
                cc.director.pause();
            })
            .start();

    }

    // update (dt) {}
}
