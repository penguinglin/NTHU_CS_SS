// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Menu from "./Menu";

const { ccclass, property } = cc._decorator;

@ccclass
export default class History extends cc.Component {

    @property({ type: cc.AudioClip })
    lock: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;

    @property(cc.Label)
    usernameLabel: cc.Label = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    static AudioID_Start: number;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    protected onLoad(): void {
        //load bgm
        // 获取数据
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, get the UID
                const userUUID = user.uid;

                // Fetch data from Firebase using the UID
                this.fetchDataFromFirebase(userUUID);
            } else {
                // User is not signed in, handle accordingly
                console.log("User is not signed in");
            }
        });
        History.AudioID_Start = cc.audioEngine.playMusic(this.bgm, true);
        cc.audioEngine.setVolume(History.AudioID_Start, Menu.BGMVolume);
        console.log("StartOnLoad Menu.EffectVolume: ", Menu.EffectVolume);
    }

    fetchDataFromFirebase(userUUID: string) {
        // Use the current user's UID to build the database reference path
        const dbRef = firebase.database().ref(`users/${userUUID}`);

        // Listen for data changes
        dbRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                this.updateLabels(data.username.username, data.time.time);
            }
        });
    }

    updateLabels(username: string, timeInSeconds: number) {
        if (this.usernameLabel) {
            this.usernameLabel.string = username;
        }

        if (this.scoreLabel) {
            const formattedTime = this.formatTime(timeInSeconds);
            this.scoreLabel.string = "Fastest Time: " + formattedTime;
        }
    }

    formatTime(timeInSeconds: number): string {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }

    padZero(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }

    start() {
        let startbtn = new cc.Component.EventHandler();
        startbtn.target = this.node;
        startbtn.component = "History";
        startbtn.handler = "BackMenu";
        cc.find("Canvas/Back").getComponent(cc.Button).clickEvents.push(startbtn);
    }

    BackMenu() {
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.lock, false, effect_value);
        this.scheduleOnce(() => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Menu");
        }, 0.5);

    }

    // update (dt) {}
}
