import Phaser from "phaser";
import { HisProfile } from "./core/assetLoader.js";

const keys = {
    someOtherKey: "some-otherPic",
}

export default class WorldOne extends Phaser.Scene {
    constructor(){
        super();
    }

     //Preloaded Assets
      preload() {
        this.load.image(keys.someOtherKey, HisProfile);
      }
    
      init() {}
    
      //Erzeugt Assets
      create() {
        this.firstPic = this.add.sprite(this.scale.width * 0.5, this.scale.height * 0.5, keys.someOtherKey)
      }
    
      update() {
      }
}