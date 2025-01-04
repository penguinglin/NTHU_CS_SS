import Menu from "./Menu";
import GlobalData from "./GlobalData";

const { ccclass, property } = cc._decorator;



@ccclass
export default class Start extends cc.Component {

    //audio
    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    click: cc.AudioClip = null;
    //perfab property
    @property(cc.Prefab)
    signIn: cc.Prefab = null;
    @property(cc.Prefab)
    signUp: cc.Prefab = null;


    private signInPag: cc.Prefab = null;
    private signUpPag: cc.Prefab = null;
    static AudioID_Start: number;
    // private effect_value: number = Menu.EffectVolume * 10;




    protected onLoad(): void {
        //load bgm
        Start.AudioID_Start = cc.audioEngine.playMusic(this.bgm, true);
        cc.audioEngine.setVolume(Start.AudioID_Start, Menu.BGMVolume);
        console.log("StartOnLoad Menu.EffectVolume: ", Menu.EffectVolume);
    }
    start() {
        this.addMouseEvents(cc.find("Canvas/SignIn"));
        this.addMouseEvents(cc.find("Canvas/SignUp"));
        this.addMouseEvents(cc.find("Canvas/Guest"));
        this.addMouseEvents(cc.find("Canvas/ESC_BT"));

        // Add floating effect to Mark and Mark2 nodes
        this.addFloatingEffect(cc.find("Canvas/Mark"));
        this.addFloatingEffect1(cc.find("Canvas/Mark2"));
        // link click
        let startbtn = new cc.Component.EventHandler();
        let signinBt = new cc.Component.EventHandler();
        let signupBt = new cc.Component.EventHandler();
        let stopGamebtn = new cc.Component.EventHandler();

        startbtn.target = this.node;
        startbtn.component = "Start";
        startbtn.handler = "loadMenu";
        cc.find("Canvas/Guest").getComponent(cc.Button).clickEvents.push(startbtn);

        signinBt.target = this.node;
        signinBt.component = "Start";
        signinBt.handler = "signinScene";
        cc.find("Canvas/SignIn").getComponent(cc.Button).clickEvents.push(signinBt);

        signupBt.target = this.node;
        signupBt.component = "Start";
        signupBt.handler = "signUPScene";
        cc.find("Canvas/SignUp").getComponent(cc.Button).clickEvents.push(signupBt);

        stopGamebtn.target = this.node;
        stopGamebtn.component = "Start";
        stopGamebtn.handler = "jumpScene";
        cc.find("Canvas/ESC_BT").getComponent(cc.Button).clickEvents.push(stopGamebtn);
    }

    addMouseEvents(node: cc.Node) {
        node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }
  onMouseEnter(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Guest") {
                buttonComponent.node.opacity = 200;
            } else if (node.name === "ESC_BT") {
                buttonComponent.node.opacity = 250;
                console.log("ESC_BT opacity: ", buttonComponent.node.opacity);
            }
            else {
                buttonComponent.node.opacity = 180;
            }
        }
    }

    onMouseLeave(event) {
        const node = event.target;
        const buttonComponent = node.getComponent(cc.Button);
        if (buttonComponent) {
            if (node.name === "Guest") {
                buttonComponent.node.opacity = 150;
            } else if (node.name === "ESC_BT") {
                //let node's picture opacity = 200;
                buttonComponent.node.opacity = 200;
            }
            else {
                buttonComponent.node.opacity = 120;
            }
        }
    }

    addFloatingEffect(node: cc.Node) {
        if (node) {
            cc.tween(node)
                .repeatForever(
                    cc.tween()
                        .by(1, { position: cc.v3(0, 10, 0) }, { easing: 'sineInOut' })
                        .by(1, { position: cc.v3(0, -10, 0) }, { easing: 'sineInOut' })
                )
                .start();
        }
    }
    addFloatingEffect1(node: cc.Node) {
        if (node) {
            cc.tween(node)
                .repeatForever(
                    cc.tween()
                        .by(1.2, { position: cc.v3(0, 8, 0) }, { easing: 'sineInOut' })
                        .by(1.2, { position: cc.v3(0, -8, 0) }, { easing: 'sineInOut' })
                )
                .start();
        }
    }

    loadMenu() {
        const existingSignWinNode = this.node.getParent().getChildByName("SignWin");
        const existingSignUpNode = this.node.getParent().getChildByName("SignUp");
        if (existingSignWinNode || existingSignUpNode) {
            cc.log("Sign-in or Sign-up window already exists!");
            return;
        }

        // 播放點擊音效
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.click, false, effect_value);

        // 开始淡出动画
        let white = this.node.getChildByName("White");
        GlobalData.isStart = 1;

        cc.tween(white)
            .to(0.5, { opacity: 255 })  // 1 秒钟内将透明度变为 0
            .call(() => {
                cc.audioEngine.stopAll();
                cc.director.loadScene("Menu");
            })
            .start();
    }


    signinScene() {
        // Check if SignWin node already exists
        const existingSignWinNode = this.node.getParent().getChildByName("SignWin");
        const existingSignUpNode = this.node.getParent().getChildByName("SignUp");
        if (existingSignWinNode || existingSignUpNode) {
            cc.log("Sign-in or Sign-up window already exists!");
            return;
        }

        // Load prefab "SignIn"
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.click, false, effect_value);
        let prefab = cc.instantiate(this.signIn);
        prefab.name = "SignWin"; // Set node name
        this.node.getParent().addChild(prefab);
        prefab.setScale(0);

        // Create a scale-in animation
        cc.tween(prefab)
            .to(0.2, { scale: 1 }, { easing: 'backOut' })
            .start();
        prefab.setPosition(413.235, 320);
    }

    signUPScene() {
        // Check if SignUp node already exists
        const existingSignWinNode = this.node.getParent().getChildByName("SignWin");
        const existingSignUpNode = this.node.getParent().getChildByName("SignUp");
        if (existingSignWinNode || existingSignUpNode) {
            cc.log("Sign-in or Sign-up window already exists!");
            return;
        }
        let effect_value = Menu.EffectVolume * 10;
        cc.audioEngine.play(this.click, false, effect_value);
        // Load prefab "SignUp"
        let prefab = cc.instantiate(this.signUp);
        prefab.name = "SignUp"; // Set node name
        this.node.getParent().addChild(prefab);
        prefab.setScale(0);

        // Create a scale-in animation
        cc.tween(prefab)
            .to(0.2, { scale: 1 }, { easing: 'backOut' })
            .start();
        prefab.setPosition(413.235, 320);
    }

    jumpScene() {
        const existingSignWinNode = this.node.getParent().getChildByName("SignWin");
        const existingSignUpNode = this.node.getParent().getChildByName("SignUp");
        if (existingSignWinNode || existingSignUpNode) {
            cc.log("Sign-in or Sign-up window already exists!");
            return;
        }

        cc.audioEngine.stopAll();
        cc.game.end();
    }
}
