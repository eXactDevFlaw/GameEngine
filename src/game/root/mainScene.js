import Phaser, { Time } from "phaser";
import { MyProfile } from "./core/assetLoader";

const keys = {
  firstPicKey: "eins",
};

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "main-scene",
    });
  }

  //Preloaded Assets
  preload() {
    this.load.image(keys.firstPicKey, MyProfile);
  }

  init() {}

  //Erzeugt Assets
  create() {
    this.myPic = this.add.sprite(
      this.scale.width * 0.5,
      this.scale.height * 0.5,
      keys.firstPicKey
    );
    this.text = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5 - 100);
    this.text.setScale(4);
    this.text2 = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5);
    this.text2.setScale(4);
  }

  update(time, delta) {
    // MS nach start engine
    this.text.text = time

    // tackt pro Hz
    this.text2.text = delta

    this.myPic.setX(this.scale.width * 0.5 + Math.sin(time/1000 * 2) * 500)
  }
}
