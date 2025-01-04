const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    player: cc.Node = null;

    start () {

    }

    update (dt) {
        let target_position = this.player.getPosition();
        let current_position = this.node.getPosition();
        current_position.lerp(target_position, 0.1, current_position);
        //current_position.y = cc.misc.clampf(target_position.y, 0, 220);
        this.node.setPosition(current_position);
    }
}