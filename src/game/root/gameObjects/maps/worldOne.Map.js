import Phaser from "phaser";
import BackgroundLayer1Pos from "./worldOne.Config.js"
import {
    BackgroundLayer2,
    BackgroundLayer3,
    BackgroundLayer4,
    BackgroundLayer5,
    BackgroundLayer6
} from "../../core/assetLoader.js";

const BackgroundConf = [
    { Path: BackgroundLayer2, ImageKey: "background-1"},
    { Path: BackgroundLayer3, ImageKey: "background-2"},
    { Path: BackgroundLayer4, ImageKey: "background-3"},
    { Path: BackgroundLayer5, ImageKey: "background-4"},
    { Path: BackgroundLayer6, ImageKey: "background-5"},
]

export default class WorldOneMap {
    constructor(scene) {
        /**@type {Phaser.Scene} */ 
        this.scene = scene;
        this.parallaxLayer1Pool = [];
    }
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        BackgroundConf.forEach(({Path, ImageKey}) => {
            if (!scene.textures.exists(ImageKey)) scene.load.image(ImageKey, Path)
        })
    }

    create(x, y) {
        BackgroundLayer1Pos.forEach(({x, y, depth, scale, ImageKey}) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer1Pool.push(backImg);
        })
    }

    update(time, delta) {
        this.parallaxLayer1Pool.forEach((image) => {
            image.x -= delta * 0.5;
        })
    }
}