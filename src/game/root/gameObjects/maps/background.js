import Phaser from "phaser";
import {
    BackgroundLayer1,
    BackgroundLayer2,
    BackgroundLayer3,
    BackgroundLayer4,
    BackgroundLayer5,
    BackgroundLayer6
} from "../../core/assetLoader.js";

export default class ParallaxBackground {
    constructor(scene) {
        /**@type {Phaser.Scene} */ 
        this.scene = scene;
    }
}