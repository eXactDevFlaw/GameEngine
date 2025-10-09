import Phaser from "phaser";
import Player from "./gameObjects/player/player.js";

const keys = {
  worldOnePic: "worldOnePic",
};

export default class WorldOne extends Phaser.Scene {
  constructor() {
    super();
  }

  //Preloaded Assets
  preload() {
    Player.preload(this);
  }

  init() {}

  //Erzeugt Assets
  create() {
    this.player = new Player(this)
    this.player.create(100, 100)
  }

  update(time, delta) {
    this.player.update(time, delta);
  }
}
