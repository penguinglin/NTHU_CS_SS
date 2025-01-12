const { ccclass, property } = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    // ===================== TODO =====================
    // 1. Add dynamic click event to StartButton to call this function
    start() {
        let startButton = new cc.Component.EventHandler();
        startButton.target = this.node;
        startButton.component = "Menu";
        startButton.handler = "loadGameScene";
        let button = cc.find("Canvas/UI/StartButton").getComponent(cc.Button);
        button.clickEvents.push(startButton);
    }
    // ================================================


    loadGameScene() {
        cc.director.loadScene("game");
    }
    // ================================================
}
