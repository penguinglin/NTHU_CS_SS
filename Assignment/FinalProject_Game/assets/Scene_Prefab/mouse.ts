const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    testPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    alternatePrefab: cc.Prefab = null;

    private testInstance: cc.Node = null;

    onLoad() {
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
    }

    onMouseMove(event: cc.Event.EventMouse) {
        if (!this.testInstance) {
            this.testInstance = cc.instantiate(this.testPrefab);
            this.node.addChild(this.testInstance);
        }
        this.updatePosition(event);
    }

    onMouseDown(event: cc.Event.EventMouse) {
        if (this.testInstance) {
            this.testInstance.destroy();
            this.testInstance = cc.instantiate(this.alternatePrefab);
            this.node.addChild(this.testInstance);
            this.updatePosition(event);
        }
    }

    onMouseUp(event: cc.Event.EventMouse) {
        if (this.testInstance) {
            this.testInstance.destroy();
            this.testInstance = cc.instantiate(this.testPrefab);
            // this.node.zIndex = 5
            this.node.addChild(this.testInstance);
            this.updatePosition(event);
        }
    }

    updatePosition(event: cc.Event.EventMouse) {
        let pos = event.getLocation();
        pos = this.node.convertToNodeSpaceAR(pos);
        this.testInstance.setPosition(pos);
    }
}
