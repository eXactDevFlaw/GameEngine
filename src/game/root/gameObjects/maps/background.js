import Phaser from "phaser";
import { assetBackgroundImagePostions } from "../../core/assetConfig.js";
import {
    BackgroundLayer1,
    BackgroundLayer2,
    BackgroundLayer3,
    BackgroundLayer4,
    BackgroundLayer5,
    BackgroundLayer6
} from "../../core/assetLoader.js";

const BackgroundConf = [
    { Path: BackgroundLayer2, ImageKey: "background-2", AnimKey: "background-2-anim",x: 0, y: 0, width: 524, height: 246},
    { Path: BackgroundLayer3, ImageKey: "background-3", AnimKey: "background-3-anim",x: 0, y: 0, width: 499, height: 235},
    { Path: BackgroundLayer4, ImageKey: "background-4", AnimKey: "background-4-anim",x: 0, y: 0, width: 475, height: 323},
    { Path: BackgroundLayer5, ImageKey: "background-5", AnimKey: "background-5-anim",x: 0, y: 0, width: 520, height: 293},
    { Path: BackgroundLayer6, ImageKey: "background-6", AnimKey: "background-6-anim",x: 800, y: 800, width: 520, height: 50}
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
    }

    createImage() {
        BackgroundConf.forEach(({ImageKey, AnimKey, x, y, width, height}) => {
            if (!this.scene.textures.exists(AnimKey)) {
                this.bg = this.scene.add.image(x, y, ImageKey)
                this.bg.setScale(4,4)
                // this.bg.setPosition(this.scene.scale.width * 0.5, this.scene.scale.height * 0.5)
                this.bg.depth = -1000
            }
        })
    }

    create(x, y) {
        this.createImage();
    }
}