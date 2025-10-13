import Phaser from "phaser";
import { 
    BackgroundLayer1Pos,
    BackgroundLayer2Pos,
    BackgroundLayer3Pos,
    BackgroundLayer4Pos,
    BackgroundLayer5Pos
} from "./worldOne.Config.js"
import {
    BackgroundLayer1,
    BackgroundLayer2,
    BackgroundLayer3,
    BackgroundLayer4,
    BackgroundLayer5
} from "../../core/assetLoader.js";

const BackgroundConf = [
    { Path: BackgroundLayer1, ImageKey: "background-1"},
    { Path: BackgroundLayer2, ImageKey: "background-2"},
    { Path: BackgroundLayer3, ImageKey: "background-3"},
    { Path: BackgroundLayer4, ImageKey: "background-4"},
    { Path: BackgroundLayer5, ImageKey: "background-5"},
]

export default class WorldOneMap {
    constructor(scene) {
        /**@type {Phaser.Scene} */ 
        this.scene = scene;
        this.parallaxLayer1Pool = [];
        this.parallaxLayer2Pool = [];
        this.parallaxLayer3Pool = [];
        this.parallaxLayer4Pool = [];
        this.parallaxLayer5Pool = [];
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

        BackgroundLayer2Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer2Pool.push(backImg);
        })

        BackgroundLayer3Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer3Pool.push(backImg);
        })

        BackgroundLayer4Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer4Pool.push(backImg);
        })

        BackgroundLayer5Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer5Pool.push(backImg);
        })
    }

    update(time, delta) {
        this.parallaxLayer1Pool.forEach((image) => {
            image.x += delta * 0.18;
        })

        this.parallaxLayer2Pool.forEach((image) => {
            image.x += delta * 0.16;
        })

        this.parallaxLayer3Pool.forEach((image) => {
            image.x += delta * 0.14;
        })

        this.parallaxLayer4Pool.forEach((image) => {
            image.x += delta * 0.12;
        })

        this.parallaxLayer5Pool.forEach((image) => {
            image.x -= delta * 0.1;
        })
    }
}