const {ccclass, property} = cc._decorator;

@ccclass
export default class Circle extends cc.Component {

    bg: cc.Node = null;

    start () {
        this.bg = this.node.getChildByName("Background");
    }

    update (dt) {
        if(this.bg.width < this.node.width){
            this.bg.width = (this.node.width - 10) * 0.1 + this.bg.width;
            this.bg.height = (this.node.height - 10) * 0.1 + this.bg.height;
        }
        if(this.bg.width > this.node.width){
            this.bg.width = this.node.width;
            this.bg.height = this.node.height;
        }
    }
}
