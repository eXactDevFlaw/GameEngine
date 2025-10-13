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

const BackgroundConf = [
    { Path: BackgroundLayer1, ImageKey: "background-1", AnimKey: "background-1-anim", width: 524, height: 299},
    { Path: BackgroundLayer2, ImageKey: "background-2", AnimKey: "background-2-anim", width: 524, height: 246},
    { Path: BackgroundLayer4, ImageKey: "background-4", AnimKey: "background-4-anim", width: 475, height: 323},
    { Path: BackgroundLayer3, ImageKey: "background-3", AnimKey: "background-3-anim", width: 499, height: 235},
    { Path: BackgroundLayer5, ImageKey: "background-5", AnimKey: "background-5-anim", width: 520, height: 50},
]

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
        BackgroundConf.forEach(({Path, ImageKey, AnimKey, width, height}) => {
            if (!scene.textures.exists(ImageKey)) scene.load.image(ImageKey, Path, {
                width: width, height: height,
            })
        })
        ParallaxBackground.data = "Test"
    }

    createImage() {
        BackgroundConf.forEach(({ImageKey, AnimKey}) => {
            if (!this.scene.textures.exists(AnimKey)) {
                this.bg = this.scene.add.image(0, 0, ImageKey)
                this.bg.setScale(4,4)
                this.bg.setPosition(this.scene.scale.width * 0.5, this.scene.scale.height * 0.5)
                this.bg.depth = -1000
            }
        })
    }

    create(x, y) {
        this.createImage();
    }
}