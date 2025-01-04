const { ccclass, property } = cc._decorator;

@ccclass
export default class ParabolaMovement extends cc.Component {
    @property(cc.Vec2)
    startt: cc.Vec2 = new cc.Vec2(0, 0);

    @property(cc.Vec2)
    control: cc.Vec2 = new cc.Vec2(100, 200);

    @property(cc.Vec2)
    end: cc.Vec2 = new cc.Vec2(200, 0);

    @property
    duration: number = 2;

    onLoad() {
        // 初始化位置
        this.node.setPosition(this.startt);
    }

    start() {
        // 确保属性被正确初始化
        if (!this.start) this.startt = new cc.Vec2(0, 0);
        if (!this.control) this.control = new cc.Vec2(100, 200);
        if (!this.end) this.end = new cc.Vec2(200, 0);

        // 创建贝塞尔曲线动作，确保传入三个点
        const bezier = [this.control, this.control, this.end];
        const bezierAction = cc.bezierTo(this.duration, bezier);

        // 运行动作
        this.node.runAction(bezierAction);
    }
}
