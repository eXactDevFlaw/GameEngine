import Phaser from "phaser";
import {
    BackgroundLayer1,
    BackgroundLayer2,
    BackgroundLayer3,
    BackgroundLayer4,
    BackgroundLayer5,
    BackgroundLayer6
} from "../../core/assetLoader.js";

const bgnLayerKeys = {
    bgl1: "background-1",
    bgl2: "background-2",
    bgl3: "background-3",
    bgl4: "background-4",
    bgl5: "background-5",
    bgl6: "background-6"
}

export default class ParallaxBackground {
    constructor(scene) {
        /**@type {Phaser.Scene} */ 
        this.scene = scene;
    }

    /**
     * 
     * @param {Phaser.scene} scene 
     */
    static preload(scene) {
        if (!scene.textures.exists(BackgroundLayer1)) scene.load.image(BackgroundLayer1); 
    }

    create(x, y) {
        let bgl1X = x;
        let bgl1Y = y;
        this.bgl1 = this.scene.add.sprite(bgl1X, bgl1Y, bgnLayerKeys.bgl1)
    }
}