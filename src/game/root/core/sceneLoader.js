import Phaser from "phaser";
import MainScene from "../mainScene.js";
import GAME_DATA from "./mainGameHandler.js";

export default class SceneLoader {
  constructor(scene) {
    /**
     * @type {MainScene}
     */
    this.mainScene = scene;
    this.currentScene = null;
    this.lastLoadedScene = null;
  }

  /**
   *
   * @param {Phaser.Scene} oldScene
   * @param {Phaser.Scene} sceneToLoad
   * @param {string} sceneKeyLaunch
   */
  loadNewScene(oldScene, sceneToLoad, sceneKeyLaunch) {
    this.lastLoadedScene = sceneKeyLaunch;
    this.currentScene = this.mainScene.scene.add(
      sceneKeyLaunch,
      sceneToLoad,
      true
    );
    this.mainScene.scene.launch(sceneKeyLaunch);
    GAME_DATA.CURRENT_GAME_STATE.CURRENT_SCENE = sceneKeyLaunch;
    if (oldScene) {
      this.mainScene.scene.remove(oldScene);
    }
  }
}
