// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Menu from "./Menu";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Intro extends cc.Component {

    @property({ type: cc.AudioClip })
    lock: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:
    static AudioID_Start: number;

    // onLoad () {}
    protected onLoad(): void {
        //load bgm
        Intro.AudioID_Start = cc.audioEngine.playMusic(this.bgm, true);
        cc.audioEngine.setVolume(Intro.AudioID_Start, Menu.BGMVolume);
        console.log("StartOnLoad Menu.EffectVolume: ", Menu.EffectVolume);
    }

    start() {

    }

    BackMenu() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Menu");
        }, 0.5);

    }
}
