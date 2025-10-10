import Phaser from "phaser";
import Player from "./gameObjects/player/player.js";
import MushRoomMonsterOne from "./gameObjects/monster/MushroomOneMonster/MushroomMonster.js";
import MushRoomMonsterTwo from "./gameObjects/monster/MushroomTwoMonster/MushroomTwoMonster.js";
import ParallaxBackground from "./gameObjects/maps/background.js";

const keys = {
  worldOnePic: "worldOnePic",
};

export default class WorldOne extends Phaser.Scene {
  constructor() {
    super();
    this.monsterPool = [];
  }

  //Preloaded Assets
  preload() {
    Player.preload(this);
    MushRoomMonsterOne.preload(this);
    MushRoomMonsterTwo.preload(this);
    // ParallaxBackground.preload(this);
  }

  init() { }

  //Erzeugt Assets
  create() {
    this.player = new Player(this)
    this.player.create(100, 100)

    let newMushroom = new MushRoomMonsterOne(this);
    newMushroom.getPlayerRef(this.player)
    newMushroom.create(400, 400)
    this.monsterPool.push(newMushroom)

    let newMushroomTwo = new MushRoomMonsterTwo(this);
    newMushroomTwo.getPlayerRef(this.player)
    newMushroomTwo.create(800, 800)
    this.monsterPool.push(newMushroomTwo)
  }

  update(time, delta) {
    this.player.update(time, delta);
    //UPDATE LOOP FOR MONSTERS
    this.monsterPool.forEach((/**@type {MushRoomMonsterOne}*/monster) => {
      monster.update(time, delta)
    })
  }
}
