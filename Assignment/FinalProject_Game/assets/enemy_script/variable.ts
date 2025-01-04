const { ccclass, property } = cc._decorator;

@ccclass
export default class GlobalVariables extends cc.Component {
    static gpt: boolean = false;

    // 其他共享变量可以在这里添加
}
