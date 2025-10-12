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
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if (!scene.textures.exists(bgnLayerKeys.bgl1)) scene.load.image(bgnLayerKeys.bgl1, BackgroundLayer1)
        ParallaxBackground.data = "Test"
    }

    create(x, y) {
        this.bgl1 = this.scene.add.image(0, 0, bgnLayerKeys.bgl1)
        this.bgl1.setScale(4, 4)
        this.bgl1.setPosition(this.scene.scale.width * 0.5, this.scene.scale.height * 0.5)
        this.bgl1.depth = -1000
    }
}