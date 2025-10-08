import Phaser, { Time } from "phaser";
import { MyProfile } from "./core/assetLoader";
import WorldOne from "./worldOne.js";
import WorldTwo from "./worldTwo.js";
import SceneLoader from "./core/sceneLoader.js";
import GAME_DATA from "./core/mainGameHandler.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "main-scene",
    });
  }

  //Preloaded Assets
  preload() {}

  init() {
    //Denk ans Orchester - style = composition
    this.sceneLoader = new SceneLoader(this);
    GAME_DATA.SCENE_REFS.SCENE_LOADER_REF = this.sceneLoader;
  }

  initOnStartUp() {
    GAME_DATA.SCENE_REFS.SCENE_LOADER_REF.loadNewScene(
      null,
      WorldOne,
      `scene${Date.now()}`
    );
  }

  //Erzeugt Assets
  create() {
    this.init();
    this.initOnStartUp();
    this.time.delayedCall(3000, () => {
      GAME_DATA.SCENE_REFS.SCENE_LOADER_REF.loadNewScene(GAME_DATA.SCENE_REFS.SCENE_LOADER_REF.lastLoadedScene, WorldTwo, `scene${Date.now()}`);
      console.log(GAME_DATA.SCENE_REFS.SCENE_LOADER_REF.currentScene)
      console.log("Ich brauche 3 sekunden")
    })
  }

  update(time, delta) {
  }
}
