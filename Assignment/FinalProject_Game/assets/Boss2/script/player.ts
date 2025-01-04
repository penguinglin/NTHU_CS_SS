const { ccclass, property } = cc._decorator;

@ccclass
export class Player extends cc.Component {

    @property()
    playerSpeed: number = 300;

    @property()
    playerlife = 10;

    private physicManager: cc.PhysicsManager = null;
    private rigidBody: cc.RigidBody = null;
    private moveDir = 0;
    private moveDown = 0;
    private leftDown: boolean = false;
    private rightDown: boolean = false;
    private upDown: boolean = false;
    private downDown: boolean = false;

    onLoad() {
        this.physicManager = cc.director.getPhysicsManager();
        this.physicManager.enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.rigidBody = this.getComponent(cc.RigidBody);

        if (this.rigidBody) {
            this.rigidBody.fixedRotation = true;
        }
    }

    update(dt) {
        let velocityX = this.playerSpeed * this.moveDir;
        let velocityY = this.playerSpeed * this.moveDown;
        this.rigidBody.linearVelocity = cc.v2(velocityX, velocityY);
        if(this.playerlife <= 0){
            this.node.destroy();
        }
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.leftDown = true;
                this.playerMove(-1);
                break;
            case cc.macro.KEY.right:
                this.rightDown = true;
                this.playerMove(1);
                break;
            case cc.macro.KEY.up:
                this.upDown = true;
                this.playerMoveY(1);
                break;
            case cc.macro.KEY.down:
                this.downDown = true;
                this.playerMoveY(-1);
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.leftDown = false;
                if (this.rightDown) {
                    this.playerMove(1);
                } else {
                    this.playerMove(0);
                }
                break;
            case cc.macro.KEY.right:
                this.rightDown = false;
                if (this.leftDown) {
                    this.playerMove(-1);
                } else {
                    this.playerMove(0);
                }
                break;
            case cc.macro.KEY.up:
                this.upDown = false;
                if (this.downDown) {
                    this.playerMoveY(-1);
                } else {
                    this.playerMoveY(0);
                }
                break;
            case cc.macro.KEY.down:
                this.downDown = false;
                if (this.upDown) {
                    this.playerMoveY(1);
                } else {
                    this.playerMoveY(0);
                }
                break;
        }
    }

    public playerMove(moveDir: number) {
        this.moveDir = moveDir;
    }

    public playerMoveY(moveDown: number) {
        this.moveDown = moveDown;
    }

    onBeginContact(contact, self, other){
        if(other.node.name == "Boss1"){
            this.playerlife -= 3;
        }
        if(other.node.name == "Boss1_2"){
            this.playerlife -= 3;
        }
        if(other.node.name == "Boss1_3"){
            this.playerlife -= 3;
        }
        if(other.node.name == "Boss1_4"){
            this.playerlife -= 3;
        }
        if(other.node.name == "Boomb"){
            this.playerlife -= 2;
        }
    }
}