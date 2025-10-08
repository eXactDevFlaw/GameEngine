import Phaser from "phaser";
import { MyProfile } from "./core/assetLoader.js";

const keys = {
    firstPicKey: "first",
}

export default class WorldTwo extends Phaser.Scene {
    constructor(){
        super();
    }

     //Preloaded Assets
      preload() {
        this.load.image(keys.firstPicKey, MyProfile);
      }
    
      init() {}
    
      //Erzeugt Assets
      create() {
        this.firstPic = this.add.sprite(this.scale.width * 0.5, this.scale.height * 0.5, keys.firstPicKey)
      }
    
      update() {
      }
}