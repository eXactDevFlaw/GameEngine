import Phaser from "phaser";
// PLAYER ASSETS
import { PlayerIdle } from "../../core/assetLoader.js";

const keys = {
    idle_spritesheet_key: "idle_spritesheet",
    idle_animation_key: "idle_animation",
}

export default class Player {
    constructor(scene){
        /**@type {Phaser.Scene}*/
        this.scene = scene;
        this.speed = 0;
        this.collaiderPool = [];
        this.isDead = false;

    }

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        if(!scene.textures.exists(keys.idle_spritesheet_key)) scene.load.spritesheet(keys.idle_spritesheet_key, PlayerIdle, {frameWidth: 67, frameHeight: 86})
    }

    createAnimation() {
        if(!this.scene.anims.exists(keys.idle_animation_key)){
            this.idleAnim = this.scene.anims.create({
                key: keys.idle_animation_key,
                frames: this.scene.anims.generateFrameNumbers(keys.idle_spritesheet_key, {
                    start: 0,
                    end: 3,
                }),
                frameRate: 4,
                repeat: -1,
            })
        }
    }

    create(x, y) {
        this.createAnimation()
        this.playerCharacter = this.scene.physics.add.sprite(x, y, keys.idle_animation_key)
        this.playerCharacter.anims.play(this.idleAnim)
    }

    setCamera(width, height) {
        this.scene.cameras.main.setBounds(0, 0, width, height)
        this.scene.cameras.main.startFollow(this.playerCharacter, true)
    }

    update(time, delta) {

    }
}