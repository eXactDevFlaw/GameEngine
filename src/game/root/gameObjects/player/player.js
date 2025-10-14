import Phaser from "phaser";
import PlayerStateMachine from "./PlayerStateMachine.js";
import {
  // PLAYER_ASSETS
  PlayerAttack1,
  PlayerAttack2,
  PlayerAttack3,
  PlayerDead,
  PlayerDefend,
  PlayerHurt,
  PlayerIdle,
  PlayerJump,
  PlayerProtect,
  PlayerRun,
  PlayerRunAttack,
  PlayerWalk,

} from "../../core/assetLoader.js";

const PlayerConf = [
  { Path: PlayerAttack1, SpriteKey: "player-attack1", AnimKey: "player-attack1-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 4, rate: 5, rep: 0, },
  { Path: PlayerAttack2, SpriteKey: "player-attack2", AnimKey: "player-attack2-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 3, rate: 4, rep: 0, },
  { Path: PlayerAttack3, SpriteKey: "player-attack3", AnimKey: "player-attack3-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 3, rate: 4, rep: 0 },
  { Path: PlayerDead, SpriteKey: "player-dead", AnimKey: "player-dead-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 5, rate: 6, rep: 0 },
  { Path: PlayerDefend, SpriteKey: "player-defend", AnimKey: "player-defend-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 4, rate: 5, rep: 0 },
  { Path: PlayerHurt, SpriteKey: "player-hurt", AnimKey: "player-hurt-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 1, rate: 2, rep: 0 },
  { Path: PlayerIdle, SpriteKey: "player-idle", AnimKey: "player-idle-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 3, rate: 4, rep: -1 },
  { Path: PlayerJump, SpriteKey: "player-jump", AnimKey: "player-jump-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 5, rate: 6, rep: 0 },
  { Path: PlayerProtect, SpriteKey: "player-protect", AnimKey: "player-protect-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 0, rate: 1, rep: 0 },
  { Path: PlayerRun, SpriteKey: "player-run", AnimKey: "player-run-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 6, rate: 7, rep: -1 },
  { Path: PlayerRunAttack, SpriteKey: "player-runattack", AnimKey: "player-runattack-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 5, rate: 6, rep: 0 },
  { Path: PlayerWalk, SpriteKey: "player-walk", AnimKey: "player-walk-anim", frameWidth: 67, frameHeight: 86, startFrame: 0, endFrame: 7, rate: 8, rep: -1 }
];

export default class Player {
  constructor(scene) {
    /**@type {Phaser.Scene}*/
    this.scene = scene;
    this.speed = 0;
    this.colliderPool = [];
    this.isDead = false;
    this.currentMoveState = null;

    this.MOVE_STATES = {
      IDLE: 0,
      WALK: 1,
      RUN: 2,
      JUMP: 3,
    }
  }

  /**
   *
   * @param {Phaser.Scene} scene
   */
  static preload(scene) {
    PlayerConf.forEach(({ Path, SpriteKey, AnimKey, frameWidth, frameHeight }) => {
      if (!scene.textures.exists(SpriteKey)) scene.load.spritesheet(SpriteKey, Path, {
        frameWidth: frameWidth, frameHeight: frameHeight,
      });
    })
  }

  init() {
    this.playerStateMachine = new PlayerStateMachine(this);
    this.currentMoveState = this.MOVE_STATES.IDLE;
  }

  getKeyboard() {
    this.playerJump = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); 
    this.playerCrawl = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.playerMoveLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.playerMoveRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.playerAttack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
  }

  movementHandler() {
    if (this.playerJump.isDown) {
      console.log("ich springe");
      this.player.anims.play("player-jump-anim")
    } else {
      this.MOVE_STATES.IDLE
    }
    if (this.playerCrawl.isDown) console.log("ich krieche");
    if (this.playerMoveLeft.isDown) console.log("ich bewege mich nach links");
    if (this.playerMoveRight.isDown){
      console.log("ich bewege mich nach rechts");
      
    } 
    if (this.playerAttack.isDown) console.log("ich attackiere dich!");
  }

  createAnimation() {
    PlayerConf.forEach(({ SpriteKey, AnimKey, startFrame, endFrame, rate, rep }) => {
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

  create(x, y) {
    this.init();
    this.createAnimation()
    this.player = this.scene.physics.add.sprite(x, y, null)
    this.player.setScale(4)
    this.player.setGravityY(0)// ZERO FOR TESTING
    this.player.anims.play("player-idle-anim")
    this.getKeyboard();
  }

  setCamera(width, height) {
    this.scene.cameras.main.setBounds(0, 0, width, height);
    this.scene.cameras.main.startFollow(this.playerCharacter, true);
  }

  update(time, delta) {
    this.playerStateMachine.moveMachine()
    this.movementHandler()
  }
}
