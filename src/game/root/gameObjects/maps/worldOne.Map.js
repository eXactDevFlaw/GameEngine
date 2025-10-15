import Phaser from "phaser";
// IMPORT BACKGROUNDLAYER_CONFIG
import {
    BackgroundLayer1Pos,
    BackgroundLayer2Pos,
    BackgroundLayer3Pos,
    BackgroundLayer4Pos,
    BackgroundLayer5Pos,
    BackgroundLayer6Pos,
    BackgroundLayer7Pos,
} from "./worldOne.Config.js"
// IMPORT BACKGROUNDLAYER_ASSET
import {
    BackgroundLayer1,
    BackgroundLayer2,
    BackgroundLayer3,
    BackgroundLayer4,
    BackgroundLayer5,
    BackgroundLayer6,
    BackgroundLayer7,
} from "../../core/assetLoader.js";

const BackgroundConf = [
    { Path: BackgroundLayer1, ImageKey: "background-1" },
    { Path: BackgroundLayer2, ImageKey: "background-2" },
    { Path: BackgroundLayer3, ImageKey: "background-3" },
    { Path: BackgroundLayer4, ImageKey: "background-4" },
    { Path: BackgroundLayer5, ImageKey: "background-5" },
    { Path: BackgroundLayer6, ImageKey: "background-6" },
    { Path: BackgroundLayer7, ImageKey: "background-7" },
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
        this.parallaxLayer6Pool = [];
        this.parallaxLayer7Pool = [];
    }
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        BackgroundConf.forEach(({ Path, ImageKey }) => {
            if (!scene.textures.exists(ImageKey)) scene.load.image(ImageKey, Path)
        })
    }

    create(x, y) {
        BackgroundLayer1Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.depth = depth
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer1Pool.push(backImg);
        })

        BackgroundLayer2Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.depth = depth
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer2Pool.push(backImg);
        })

        BackgroundLayer3Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.depth = depth
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer3Pool.push(backImg);
        })

        BackgroundLayer4Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.depth = depth
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer4Pool.push(backImg);
        })

        BackgroundLayer5Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.depth = depth
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer5Pool.push(backImg);
        })

        this.floor = this.scene.physics.add.staticGroup()
        BackgroundLayer6Pos.forEach(({ x, y, depth, scale, ImageKey}) => {
            /**@type {Phaser.Physics.Arcade.Sprite} */
            let backImg = this.floor.create(x, y, ImageKey)
            backImg.setDepth(depth)
            backImg.setBodySize(2048, 50)
            backImg.setScale(scale)
        })

        BackgroundLayer7Pos.forEach(({ x, y, depth, scale, ImageKey }) => {
            let backImg = this.scene.add.image(x, y, ImageKey)
            backImg.depth = depth
            backImg.setScale(scale)
            backImg.origX = backImg.x
            backImg.origY = backImg.y
            this.parallaxLayer7Pool.push(backImg);
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