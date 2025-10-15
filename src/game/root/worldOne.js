import Phaser from "phaser";
import Player from "./gameObjects/player/player.js";
import MushRoomMonsterOne from "./gameObjects/monster/MushroomOneMonster/MushroomMonster.js";
import MushRoomMonsterTwo from "./gameObjects/monster/MushroomTwoMonster/MushroomTwoMonster.js";
import WorldOneMap from "./gameObjects/maps/worldOne.Map.js";

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
    WorldOneMap.preload(this);
  }

  init() { }

  //Erzeugt Assets
  create() {
    /**@type {WorldOneMap} */
    this.WorldMap = new WorldOneMap(this);
    this.WorldMap.create();

    /**@type {Player} */
    this.player = new Player(this)
    this.player.create(100, 799)

    /**@type {MushRoomMonsterOne} */
    let newMushroom = new MushRoomMonsterOne(this);
    newMushroom.getPlayerRef(this.player)
    newMushroom.create(400, 400)
    this.monsterPool.push(newMushroom)

    /**@type {MushRoomMonsterTwo} */
    let newMushroomTwo = new MushRoomMonsterTwo(this);
    newMushroomTwo.getPlayerRef(this.player)
    newMushroomTwo.create(800, 800)
    this.monsterPool.push(newMushroomTwo)
  }

  update(time, delta) {
    this.WorldMap.update(time, delta)
    this.player.update(time, delta);
    this.monsterPool.forEach((/**@type {MushRoomMonsterOne}*/monster) => {
      monster.update(time, delta)
    })
  }
}
