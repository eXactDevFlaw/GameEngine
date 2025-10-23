import Phaser from "phaser";
import MainScene from "./root/mainScene.js";

export default new Phaser.Game({
  type: Phaser.WEBGL,
  pixelArt: true,
  fps: 90,
  
  scale: {
    mode: Phaser.DOM.RESIZE,
    width: 1920,
    height: 1024,
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 1200},
      debug: true,
    },
  },

  scene: [
    MainScene,
  ],
});
