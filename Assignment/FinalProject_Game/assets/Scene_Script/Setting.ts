import Menu from "./Menu";

const { ccclass, property } = cc._decorator;
@ccclass export default class Setting extends cc.Component {

  // static first_open = true;
  @property({ type: cc.AudioClip })
  click: cc.AudioClip = null;


  start() {
    // Create instances of Menu and Start classes
    const escButton = cc.find("ESC_BT", this.node);
    if (escButton) {
      escButton.on('click', this.onEscButtonClick, this);
    }

  }

  onEscButtonClick() {
    cc.director.resume();
    // Create a move-up animation
    console.log("Setting ESC Menu.EffectVolume: ", Menu.EffectVolume);
    let effect_value = Menu.EffectVolume * 10;
    cc.audioEngine.play(this.click, false, effect_value);
    this.scheduleOnce(() => {
      cc.tween(this.node)
        .to(0.5, { position: cc.v3(this.node.position.x, this.node.position.y + 500, this.node.position.z) }, { easing: 'backIn' })
        .call(() => {
          // Destroy the node after animation
          this.node.destroy();
        })
        .start();
    }, 0.5);
  }

  onSliderChange(event: cc.Slider) {

    console.log("Slider value: ", event.progress);
    Menu.BGMVolume = event.progress;
    cc.audioEngine.setMusicVolume(event.progress);
  }

  ononSliderChange2(event: cc.Slider) {
    console.log("Slider value: ", event.progress);
    Menu.EffectVolume = event.progress;
    console.log("Menu.BGMVolume: ", Menu.BGMVolume);
    console.log("Setting Menu.EffectVolume: ", Menu.EffectVolume);
    cc.audioEngine.setEffectsVolume(event.progress);
  }


}
