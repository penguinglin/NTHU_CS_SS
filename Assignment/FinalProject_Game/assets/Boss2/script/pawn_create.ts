const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    pawn1: cc.Prefab = null;

    @property(cc.Prefab)
    pawn2: cc.Prefab = null;
    

    start () {
        this.pawn_create();
        this.schedule(this.pawn_create, 10);
    }

    pawn_create() {
        var pawn = cc.instantiate(this.pawn1);
        pawn.setPosition(240, 0);
        cc.find("Canvas/MonsterManager/Monsters").addChild(pawn);
        
        var small = cc.instantiate(this.pawn2);
        small.setPosition(-240, 0);
        cc.find("Canvas/MonsterManager/Monsters").addChild(small);
    }

    
}
