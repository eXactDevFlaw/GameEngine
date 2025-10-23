import Phaser from "phaser";
import PlayerStateMachine from "./PlayerStateMachine.js";
import WorldOne from "../../worldOne.js";
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
  PlayerRun,
  PlayerWalk,
} from "../../core/assetLoader.js";

const PlayerConf = [
  { Path: PlayerAttack1, SpriteKey: "player-attack1", AnimKey: "player-attack1-anim", frameWidth: 96, frameHeight: 84, startFrame: 0, endFrame: 5, rate: 6, rep: 0, },
  { Path: PlayerAttack2, SpriteKey: "player-attack2", AnimKey: "player-attack2-anim", frameWidth: 96, frameHeight: 84, startFrame: 0, endFrame: 4, rate: 5, rep: 0, },
  { Path: PlayerAttack3, SpriteKey: "player-attack3", AnimKey: "player-attack3-anim", frameWidth: 96, frameHeight: 84, startFrame: 0, endFrame: 5, rate: 6, rep: 0 },
  { Path: PlayerDead, SpriteKey: "player-dead", AnimKey: "player-dead-anim", frameWidth: 96, frameHeight: 84, startFrame: 0, endFrame: 11, rate: 12, rep: 0 },
  { Path: PlayerDefend, SpriteKey: "player-defend", AnimKey: "player-defend-anim", frameWidth: 96, frameHeight: 84, startFrame: 0, endFrame: 5, rate: 6, rep: 0 },
  { Path: PlayerHurt, SpriteKey: "player-hurt", AnimKey: "player-hurt-anim", frameWidth: 96, frameHeight: 84, startFrame: 0, endFrame: 3, rate: 4, rep: 0 },
  { Path: PlayerIdle, SpriteKey: "player-idle", AnimKey: "player-idle-anim", frameWidth: 96, frameHeight: 84, startFrame: 0, endFrame: 6, rate: 7, rep: -1 },
  { Path: PlayerJump, SpriteKey: "player-jump", AnimKey: "player-jump-anim", frameWidth: 34, frameHeight: 37, startFrame: 0, endFrame: 2, rate: 3, rep: 0 },
  { Path: PlayerRun, SpriteKey: "player-run", AnimKey: "player-run-anim", frameWidth: 96, frameHeight: 84, startFrame: 0, endFrame: 7, rate: 8, rep: -1 },
  { Path: PlayerWalk, SpriteKey: "player-walk", AnimKey: "player-walk-anim", frameWidth: 96, frameHeight: 84, startFrame: 0, endFrame: 7, rate: 8, rep: -1 }
];

export default class Player {
  constructor(scene) {
    /**@type {WorldOne}*/
    this.scene = scene;
    this.speed = 300;
    this.colliderPool = [];
    this.isDead = false;
    this.isHurt = false;
    this.currentMoveState = null;
    this.worldCollider = null;

    this.attackJustPressed = false;
    this.isInAttack = false;
    this.isInRunAttk = false;


    this.isFloor = true;
    this.isJump = false;

    this.CURRENT_MOVE_X = 0;
    this.CURRENT_MOVE_Y = 0;

    this.MOVE_STATES = {
      IDLE: 1,
      WALK: 2,
      RUN: 3,
      JUMP: 4,
      BLOCK: 5,
      NORMAL_ATTACK: 6,
      RUN_ATTACK: 7,
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
    new PlayerStateMachine(this);
    this.currentMoveState = this.MOVE_STATES.IDLE;
  }

  getKeyboard() {
    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.playerJump = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.playerCrawl = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.playerMoveLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.playerMoveRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.playerAttack = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.playerBlock = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.playerRun = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
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
    this.getKeyboard();
    //CREATE_PLAYER_GAME_OBJECT
    this.player = this.scene.physics.add.sprite(x, y, null)
    this.player.depth = 3
    this.player.anims.play("player-idle-anim")
    this.player.body.setSize(20, 30)
    this.player.body.setOffset(38, 31)
    this.player.setScale(5)

    //World Collider!!!!
    this.worldCollider = this.scene.physics.add.collider(this.scene.WorldMap.floor, this.player, () => {
      if (this.isDead) {
        this.worldCollider.destroy();
      }
      this.isFloor = true;
    });

    this.scene.cameras.main.startFollow(this.player, false, 0.1, 0.1)
    this.scene.cameras.main.setBounds(0, 0, 20000, 1024)
  }

  setCamera(width, height) {
    this.scene.cameras.main.setBounds(0, 0, width, height);
    this.scene.cameras.main.startFollow(this.playerCharacter, true);
  }

  controllInputsCheck() {
    if (!this.isJump) {
      this.GroundHandler();
    }

    if (this.isJump) {
      this.JumpHandler();
    }
  }

  GroundHandler() {
    if (!this.isInAttack) {

      //:::::::::::::::::::::::::::::: LEFT_MOVEMENT :::::::::::::::::::::::::::::::::::::::::::: //
      if (this.playerMoveLeft.isDown || this.cursorKeys.left.isDown && this.playerBlock.isUp) {
        if (this.playerMoveLeft.isDown && this.playerRun.isDown) {
          this.CURRENT_MOVE_X = -2
          if (!this.isInRunAttk) {
            PlayerStateMachine.Instance.changeMoveState(this.MOVE_STATES.RUN)
          }
        } else {
          this.CURRENT_MOVE_X = -1
          if (!this.isInRunAttk) {
            PlayerStateMachine.Instance.changeMoveState(this.MOVE_STATES.WALK)
          }
        }
        //:::::::::::::::::::::::::::::: RIGHT_MOVEMENT :::::::::::::::::::::::::::::::::::::::::::: //
      } else if (this.playerMoveRight.isDown || this.cursorKeys.right.isDown && this.playerBlock.isUp) {
        if (this.playerMoveRight.isDown && this.playerRun.isDown) {
          this.CURRENT_MOVE_X = 2
          if (!this.isInRunAttk) {
            PlayerStateMachine.Instance.changeMoveState(this.MOVE_STATES.RUN)
          }
        } else {
          this.CURRENT_MOVE_X = 1
          if (!this.isInRunAttk) {
            PlayerStateMachine.Instance.changeMoveState(this.MOVE_STATES.WALK)
          }
        }

        //:::::::::::::::::::::::::::::: IDLE_MOVEMENT :::::::::::::::::::::::::::::::::::::::::::: //
      } else {
        this.CURRENT_MOVE_X = 0
        if (!this.isInRunAttk && !this.isJump) {
          PlayerStateMachine.Instance.changeMoveState(this.MOVE_STATES.IDLE)
        }
      }

      //:::::::::::::::::::::::::::::: DEFEND_MOVEMENT :::::::::::::::::::::::::::::::::::::::::::: //
      if (this.playerBlock.isDown) {
        this.CURRENT_MOVE_X = 0;
        PlayerStateMachine.Instance.changeMoveState(this.MOVE_STATES.BLOCK)
      };

      //:::::::::::::::::::::::::::::: JUMP_MOVEMENT :::::::::::::::::::::::::::::::::::::::::::: //
      if (this.playerJump.isDown && this.currentMoveState != this.MOVE_STATES.JUMP) {
        this.isJump = true
      }
    }


    //:::::::::::::::::::::::::::::: ATTACK_MOVEMENT :::::::::::::::::::::::::::::::::::::::::::: //
    if (this.playerAttack.isDown && this.currentMoveState != this.MOVE_STATES.WALK && this.currentMoveState != this.MOVE_STATES.RUN && !this.isInRunAttk) {
      this.attackJustPressed = true;
      this.isInAttack = true
      PlayerStateMachine.Instance.changeMoveState(this.MOVE_STATES.NORMAL_ATTACK)
    }

    if (this.playerAttack.isDown && this.currentMoveState == this.MOVE_STATES.RUN || this.playerAttack.isDown && this.currentMoveState == this.MOVE_STATES.WALK) {
      this.attackJustPressed = true;
      this.isInRunAttk = true
      PlayerStateMachine.Instance.changeMoveState(this.MOVE_STATES.RUN_ATTACK);
    }
  }

  JumpHandler() {
    //:::::::::::::::::::::::::::::: JUMP_MOVEMENT :::::::::::::::::::::::::::::::::::::::::::: //
    if(this.playerJump.isDown) {
      PlayerStateMachine.Instance.changeMoveState(this.MOVE_STATES.JUMP)
      this.player.setVelocityY(-600)
      
    } 
    // HIER MUSS NOCH DER FALL GEMACHT WERDEN

    //:::::::::::::::::::::::::::::: FALL_MOVEMENT :::::::::::::::::::::::::::::::::::::::::::: //
  }

  flipX() {
    if (this.CURRENT_MOVE_X < 0) {
      this.player.flipX = true
    } else if (this.CURRENT_MOVE_X > 0) {
      this.player.flipX = false
    }
  }

  update(time, delta) {
    this.controllInputsCheck();
    this.flipX();

    console.log(this.currentMoveState)
    this.player.setVelocityX(this.CURRENT_MOVE_X * this.speed)
    PlayerStateMachine.Instance.update(time, delta)
  }
}