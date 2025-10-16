import Player from "./player.js";

export default class PlayerStateMachine {
    /**@type {PlayerStateMachine} */
    static Instance = null;
    constructor(player) {
        /**@type {Player} */
        this.player = player;
        this.isInDelay = false;

        if (PlayerStateMachine.Instance != null) {
            return PlayerStateMachine.Instance;
        } else {
            PlayerStateMachine.Instance = this;
        }
    }

    changeMoveState(newState) {
        this.player.currentMoveState = newState;
    }

    moveMachine() {
        this.player.player.setVelocityX(this.player.CURRENT_MOVE_X * this.player.speed)
        switch (this.player.currentMoveState) {
            case this.player.MOVE_STATES.IDLE:
                if (this.player.player.anims.currentAnim.key != "player-idle-anim") {
                    this.player.player.anims.play("player-idle-anim")
                }
                break
            case this.player.MOVE_STATES.JUMP:
                if (this.player.player.anims.currentAnim.key != "player-jump-anim"){
                    this.player.player.anims.play("player-jump-anim")       
                }
                if (this.player.player.anims.currentFrame.textureFrame >= 5) {
                    this.changeMoveState(this.player.MOVE_STATES.IDLE)
                }
                break
            case this.player.MOVE_STATES.RUN:
                if (this.player.player.anims.currentAnim.key != "player-run-anim") {
                    this.player.player.anims.play("player-run-anim")
                }
                break
            case this.player.MOVE_STATES.BLOCK:
                if (this.player.player.anims.currentAnim.key != "player-defend-anim") {
                    this.player.player.anims.play("player-defend-anim")
                }
                break
            case this.player.MOVE_STATES.ATTACK_IN_RUN:
                if (this.player.player.anims.currentAnim.key != "player-runattack-anim") {
                    this.player.player.anims.play("player-runattack-anim")
                }
                if (this.player.player.anims.currentFrame.textureFrame >= 5) {
                    this.changeMoveState(this.player.MOVE_STATES.RUN)
                }
                break
            case this.player.MOVE_STATES.NORMAL_ATTACK:
                if (this.player.player.anims.currentAnim.key != "player-attack1-anim") {
                    this.player.player.anims.play("player-attack1-anim")
                }
                if (this.player.player.anims.currentFrame.textureFrame >= 4 && !this.isInDelay) {
                    this.isInDelay = true
                    this.player.scene.time.delayedCall(200, () => {
                        this.isInDelay = false
                        this.changeMoveState(this.player.MOVE_STATES.IDLE)
                    })
                }
                break
        }
    }

    update(time, delta) {
        this.moveMachine();
    }
}