import Phaser from "phaser";
import MainScene from "./root/mainScene.js";

export default new Phaser.Game({
  type: Phaser.WEBGL,
  pixelArt: false,
  
  scale: {
    mode: Phaser.DOM.RESIZE,
    width: 1920,
    height: 1024,
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: 0,
      debug: true,
    },
  },

  scene: [
    MainScene,
  ],
});
