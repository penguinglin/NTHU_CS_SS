const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    private moveDir = 1;
    private leftDown: boolean = false;
    private rightDown: boolean = false;

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {

    }



    update (dt) {
        if (this.moveDir != 0) {
            this.node.scaleX = (this.moveDir > 0) ? 0.1 : -0.1;
        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = true;
                this.playerMove(-1);
                break;
            case cc.macro.KEY.d:
                this.rightDown = true;
                this.playerMove(1);
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftDown = false;
                if (this.rightDown) {
                    this.playerMove(1);
                } else {
                    this.playerMove(0);
                }
                break;
            case cc.macro.KEY.d:
                this.rightDown = false;
                if (this.leftDown) {
                    this.playerMove(-1);
                } else {
                    this.playerMove(0);
                }
                break;
        }
    }

    private playerMove(moveDir: number) {
        this.moveDir = moveDir;
    }
}
