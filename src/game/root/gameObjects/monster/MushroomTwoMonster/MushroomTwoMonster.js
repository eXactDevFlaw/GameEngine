import Phaser from "phaser";
import MushroomTwoMachine from "./MushroomTwoMonsterStateMachine.js";
import {
    MushroomTwoAttack,
    MushroomTwoDie,
    MushroomTwoFly,
    MushroomTwoHit,
    MushroomTwoIdle,
    MushroomTwoSmash,
} from "../../../core/assetLoader.js";

const MonsterConf = [
    { Path: MushroomTwoAttack, SpriteKey: "mushTwo-attack", AnimKey: "mushTwo-attack-anim", frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 11, rate: 12, rep: 0 },
    { Path: MushroomTwoDie, SpriteKey: "mushTwo-die", AnimKey: "mushTwo-die-anim", frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 16, rate: 17, rep: 0 },
    { Path: MushroomTwoIdle, SpriteKey: "mushTwo-idle", AnimKey: "mushTwo-idle-anim", frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7, rate: 8, rep: -1 },
    { Path: MushroomTwoHit, SpriteKey: "mushTwo-hit", AnimKey: "mushTwo-hit-anim", frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 3, rate: 4, rep: 0 },
    { Path: MushroomTwoFly, SpriteKey: "mushTwo-fly", AnimKey: "mushTwo-fly-anim", frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7, rate: 8, rep: 0 },
    { Path: MushroomTwoSmash, SpriteKey: "mushTwo-smash", AnimKey: "mushTwo-smash-anim", frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7, rate: 8, rep: 0 },
]


export default class MushRoomMonsterTwo {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.isDead = false;
        this.playerRef = null;
        this.currentMoveState = null;

        this.MOVE_STATES = {
            IDLE: 0,
            MOVE: 1,
        }
    }
    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    static preload(scene) {
        MonsterConf.forEach(({ Path, SpriteKey, AnimKey, frameWidth, frameHeight }) => {
            if (!scene.textures.exists(SpriteKey)) scene.load.spritesheet(SpriteKey, Path, {
                frameWidth: frameWidth, frameHeight: frameHeight,
            });
        });
    };

    init() {
        this.MoveStateMachine = new MushroomTwoMachine(this);
        this.currentMoveState = this.MOVE_STATES.IDLE;
    }

    createAnimation() {
        MonsterConf.forEach(({ SpriteKey, AnimKey, startFrame, endFrame, rate, rep }) => {
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
        this.init();
        this.createAnimation()
        this.mushroom = this.scene.physics.add.sprite(x, y, null)
        this.mushroom.setScale(4)
        this.mushroom.setGravityY(0)// ZERO FOR TESTING
        this.mushroom.anims.play("mushTwo-idle-anim")
    }

    update(time, delta) {
        this.MoveStateMachine.MoveMachine()
    }
}