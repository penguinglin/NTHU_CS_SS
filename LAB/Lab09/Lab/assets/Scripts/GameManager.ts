const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Node)
    circleContainer: cc.Node = null;

    @property(cc.Node)
    cover_red: cc.Node = null;

    @property(cc.Node)
    cover: cc.Node = null;

    @property(cc.Node)
    gameoverPanel: cc.Node = null;

    @property(cc.Prefab)
    circlePrefab: cc.Prefab = null;

    @property({ type: cc.AudioClip })
    bgm: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    bgm_2: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    correctSound: cc.AudioClip = null;

    level = [["level", "plusTime_sec", "minusTime_sec", "n_by_n", "nextLevel", "type", "type_option_arr"], ["level1", "1", "1", "2", "3", "CLOSER", "1"], ["level2", "0.98", "1", "3", "2", "CLOSER", "2"], ["level3", "0.96", "1", "3", "3", "CLOSER", "3"], ["level4", "0.94", "1", "3", "2", "CLOSER", "3"], ["level5", "0.92", "1", "4", "2", "CLOSER", "4"], ["level6", "0.9", "1", "4", "3", "CLOSER", "5"], ["level7", "0.88", "1", "4", "2", "CLOSER", "5"], ["level8", "0.86", "1", "4", "3", "CLOSER", "6"], ["level9", "0.84", "1", "5", "3", "CLOSER", "6"], ["level10", "0.82", "1", "5", "2", "CLOSER", "6"], ["level11", "0.8", "1", "5", "3", "CLOSER", "7"], ["level12", "0.78", "1.2", "5", "2", "CLOSER", "7"], ["level13", "0.76", "1.2", "5", "2", "CLOSER", "7"], ["level14", "0.74", "1.2", "5", "2", "CLOSER", "7"], ["level15", "0.72", "1.2", "6", "2", "CLOSER", "8"], ["level16", "0.7", "1.2", "6", "4", "CLOSER", "8"], ["level17", "0.68", "1.2", "6", "2", "CLOSER", "8"], ["level18", "0.66", "1.2", "6", "3", "CLOSER", "9"], ["level19", "0.64", "1.2", "6", "2", "CLOSER", "9"], ["level20", "0.62", "1.3", "7", "3", "CLOSER", "9"], ["level21", "0.6", "1.3", "7", "1", "CLOSER", "9"], ["level22", "0.58", "1.3", "7", "1", "CLOSER", "10"], ["level23", "0.56", "1.3", "7", "1", "CLOSER", "10"], ["level24", "0.54", "1.3", "7", "1", "CLOSER", "10"], ["level25", "0.52", "1.3", "7", "200", "CLOSER", "10"], ["MAX", "0", "1.3", "7", "80", "CLOSER", "10"]];
    colorSet = [["colorId", "color_r", "color_g", "color_b"], ["color0", "90", "45", "145"], ["color1", "145", "35", "135"], ["color2", "215", "15", "120"], ["color3", "230", "35", "45"], ["color4", "245", "150", "30"], ["color5", "250", "220", "5"], ["color6", "180", "210", "55"], ["color7", "5", "190", "115"], ["color8", "5", "150", "175"], ["color9", "24", "75", "169"]];

    curLevel: number = 1;
    levelWinCount: number = 0;
    gameLevel: number = 1;

    remainTime: number = 20;

    levelText: cc.Label;
    timeText: cc.Label;

    targetColor: cc.Color;
    baseColor: cc.Color;
    curCloserArr: cc.Color[] = [];

    gameover = false;

    flag: boolean = false;

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    start() {
        this.initProperties();
        this.playBGM()
        this.newRound();
    }

    initProperties() {
        this.levelText = cc.find("Canvas/UI/LEVEL/number").getComponent(cc.Label);
        this.timeText = cc.find("Canvas/UI/TIME/number").getComponent(cc.Label);
    }

    update(dt) {
        if (!this.gameover) {
            this.updateUI(dt);
            if (this.remainTime == 0) {
                this.gameover = true;
                this.onGameover();
            }
        }

        if (this.gameLevel >= 10 && !this.flag) {
            this.stopBGM();
            this.playAdvanceBGM();
            this.flag = true;
        }
    }

    playAdvanceBGM() {
        cc.audioEngine.playMusic(this.bgm_2, true);
    }

    onKeyDown(event) {
        if (event.keyCode == cc.macro.KEY.k) {
            this.getResult(null, "Ans");
        }
    }

    newRound() {
        this.checkCloserArr();
        let row = parseInt(this.level[this.curLevel][3]);
        this.spawnCircle(row);
    }

    checkCloserArr() {
        if (this.curCloserArr.length <= 1) {
            let index = Math.floor(Math.random() * 10);
            let indexL = (index + 9) % 10;
            let p = parseInt(this.level[this.curLevel][6]) + 1;
            let u = cc.color(parseInt(this.colorSet[index + 1][1]), parseInt(this.colorSet[index + 1][2]), parseInt(this.colorSet[index + 1][3]));
            let d = cc.color(parseInt(this.colorSet[indexL + 1][1]), parseInt(this.colorSet[indexL + 1][2]), parseInt(this.colorSet[indexL + 1][3]));
            let c = cc.color(Math.ceil((d.getR() - u.getR()) / p), Math.ceil((d.getG() - u.getG()) / p), Math.ceil((d.getB() - u.getB()) / p));
            this.curCloserArr.length = 0;
            this.curCloserArr.push(u);
            for (let f = 1; f <= p; f++) {
                let m = cc.color(u.getR() + c.getR() * f, u.getG() + c.getG() * f, u.getB() + c.getB() * f);
                if (Math.abs(d.getR() - m.getR()) + Math.abs(d.getG() - m.getG()) + Math.abs(d.getB() - m.getB()) >= 10) {
                    this.curCloserArr.push(m);
                }
            }
            this.curCloserArr.push(d);
        }
        this.targetColor = this.curCloserArr.shift();
        this.baseColor = this.curCloserArr[0];
    }



    getResult(event, customEventData) {
        if (this.gameover) return;

        if (customEventData == "Ans") {
            this.gameLevel++;
            this.levelWinCount++;
            if (this.levelWinCount == parseInt(this.level[this.curLevel][4])) {
                this.levelWinCount = 0;
                this.curLevel++;
                if (this.curLevel > 26) {
                    this.curLevel = 26;
                }
            }
            this.remainTime += parseFloat(this.level[this.curLevel][1]);
            this.newRound();

            this.playEffect();
        } else {
            let offset = 4;
            this.circleContainer.runAction(cc.sequence(
                cc.moveTo(0.05, cc.v2(offset, -110.5)),
                cc.moveTo(0.05, cc.v2(-offset, -110.5)),
                cc.moveTo(0.05, cc.v2(offset, -110.5)),
                cc.moveTo(0.05, cc.v2(-offset, -110.5)),
                cc.moveTo(0.05, cc.v2(0, -110.5))
            ));

            this.cover_red.runAction(cc.sequence(
                cc.fadeIn(0.1),
                cc.delayTime(0.1),
                cc.fadeOut(0.1)
            ));
            this.remainTime -= parseFloat(this.level[this.curLevel][2]);
        }
    }

    updateUI(dt) {
        this.levelText.string = this.gameLevel.toString();

        this.remainTime -= dt;
        if (this.remainTime < 0) {
            this.remainTime = 0;
        }
        this.timeText.string = this.remainTime.toFixed(2).toString().replace(".", ":");
    }

    onGameover() {
        this.cover.runAction(cc.fadeTo(0.2, 128));
        this.gameoverPanel.active = true;
        this.gameoverPanel.runAction(cc.fadeIn(0.2));
        let LEVELText = this.gameoverPanel.getChildByName("LEVEL").getComponent(cc.Label);
        LEVELText.string = "Lv. " + this.gameLevel.toString();
        this.stopBGM();
    }

    loadMenu() {
        cc.director.loadScene("menu");
    }

    playBGM() {
        // ===================== TODO =====================
        // 1. Play music. The audio clip to play is this.bgm
        cc.audioEngine.playMusic(this.bgm, true);
        // ================================================

    }

    stopBGM() {
        // ===================== TODO =====================
        // 1. Stop music. 
        cc.audioEngine.stopMusic();
        // ================================================
    }

    playEffect() {
        // ===================== TODO =====================
        // 1. Play sound effect. The audio clip to play is 
        //    this.correctSound
        cc.audioEngine.playEffect(this.correctSound, false);
        // ================================================
    }

    spawnCircle(row: number) {
        cc.log("spawn " + row + "*" + row);

        this.clearCircle();

        let containerSize = 380;
        if (row == 2) {
            containerSize = 246;
        } else if (row == 3) {
            containerSize = 369;
        }
        let circleSize = containerSize / row;

        // ===================== TODO =====================
        // 1. Update the size of circleContainer
        //
        // 2. Spawn [row]*[row] circles (this.circlePrefab)
        //    under circleContainer.
        //    (Be child nodes of the circleContainer node)
        // 
        //    Hints:  cc.instantiate(), cc.Node.addChild()
        // 
        // 3. All circles should be place like a square matrix.
        //    There is no space between each circle in each
        //    row and each column.
        // 
        //    e.g. 
        //    A 3*3 matrix of circles is look like:
        //    https://i.imgur.com/NuLEiyY.png
        //    A 4*4 matrix of circles is look like:
        //    https://i.imgur.com/Ij8GDvx.png
        // 
        //    Hints:  Layout component
        // 
        // 4. The width and height of each circle is 
        //    [circleSize].
        // 
        // 5. Only ONE of the circles is the answer.
        // 
        //    Hints:  Math.floor(Math.random() * 12) will return a random number between 0 and 12 
        // 
        // 6. There is a child node named "Background" under
        //    the circle node. You should change the color
        //    of the "Background" node to this.targetColor
        //    if it is the answer. Otherwise, change the color to
        //    this.baseColor.
        // 
        // 7. Add a click event to the Button component of
        //    each circle so that when you click on it,
        //    GameManager.getResult() will be called.
        // 
        // 8. If the circle is the answer, customEventData
        //    of the click event should be "Ans". Please refer to 
        //    GameManager.getResult() for more details.

        this.circleContainer.width = containerSize;
        this.circleContainer.height = containerSize;


        let answer = Math.floor(Math.random() * row * row);
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < row; j++) {
                let circle = cc.instantiate(this.circlePrefab);
                circle.width = circleSize;
                circle.height = circleSize;
                circle.setPosition((i - (row - 1) / 2) * circleSize, (j - (row - 1) / 2) * circleSize);
                this.circleContainer.addChild(circle);


                if (answer == i * row + j) {
                    circle.getChildByName("Background").color = this.targetColor;
                    circle.on(cc.Node.EventType.MOUSE_UP, (e) => {
                        this.getResult(e, 'Ans');
                    })
                } else {
                    circle.getChildByName("Background").color = this.baseColor;
                    circle.on(cc.Node.EventType.MOUSE_UP, (e) => {
                        this.getResult(e, 'Wrong');
                    })
                }


            }
        }
        // 
        //================================================
    }

    clearCircle() {
        this.circleContainer.removeAllChildren();
    }
}
