import Phaser from "phaser";
import MushroomOneMachine from "./MushroomMonsterStateMachine.js";
import {
    MushroomOneAttack,
    MushroomOneDie,
    MushroomOneHit,
    MushroomOneIdle,
    MushroomOneRun
} from "../../../core/assetLoader.js";

const MonsterConf = [
    { Path: MushroomOneAttack, SpriteKey: "mushOne-attack", AnimKey: "mushOne-attack-anim", frameWidth: 80, frameHeight: 64, startFrame: 0, endFrame: 9, rate: 9, rep: 0 },
    { Path: MushroomOneDie, SpriteKey: "mushOne-die", AnimKey: "mushOne-die-anim", frameWidth: 80, frameHeight: 64, startFrame: 0, endFrame: 14, rate: 15, rep: 0 },
    { Path: MushroomOneIdle, SpriteKey: "mushOne-idle", AnimKey: "mushOne-idle-anim", frameWidth: 80, frameHeight: 64 , startFrame: 0, endFrame: 6, rate: 7, rep: -1 },
    { Path: MushroomOneHit, SpriteKey: "mushOne-hit", AnimKey: "mushOne-hit-anim", frameWidth: 80, frameHeight: 64, startFrame: 0, endFrame: 4, rate: 5, rep: 0  },
    { Path: MushroomOneRun, SpriteKey: "mushOne-run", AnimKey: "mushOne-run-anim", frameWidth: 80, frameHeight: 64, startFrame: 0, endFrame: 7, rate: 8, rep: -1 },
]

const MOVE_STATES = {
    IDLE: 0,
    MOVE: 1,
}

export default class MushRoomMonsterOne{
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.isDead = false;
        this.playerRef = null;
        this.currentMoveState = MOVE_STATES.IDLE
    }
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        MonsterConf.forEach(({Path, SpriteKey, AnimKey, frameWidth, frameHeight}) => {
            if (!scene.textures.exists(SpriteKey)) scene.load.spritesheet(SpriteKey, Path, {
                frameWidth: frameWidth, frameHeight: frameHeight, 
            });
        });
    };

    createAnimation() {
        MonsterConf.forEach(({SpriteKey, AnimKey, startFrame, endFrame, rate, rep}) => {
            if (!this.scene.anims.exists(AnimKey)) {
                this.scene.anims.create({
                    key: AnimKey,
                    frames: this.scene.anims.generateFrameNumbers(SpriteKey, {
                        start: startFrame,
                        end: endFrame,
                    }),
                    frameRate: rate,
                    repeat: rep
                });
            };
        });
    };

    getPlayerRef(playerRef) {
        this.playerRef = playerRef
    }

    create(x, y) {
        this.currentMoveState = MOVE_STATES.IDLE
        this.createAnimation()
        this.mushroom = this.scene.physics.add.sprite(x, y, null)
        this.mushroom.setScale(2)
        this.mushroom.setGravityY(0)// ZERO FOR TESTING
        this.mushroom.anims.play("mushOne-idle-anim")
    }

    update(time, delta) {
        MushroomOneMachine.MoveMachine(this)
    }
}