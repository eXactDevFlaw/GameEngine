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
        
        switch (this.player.currentMoveState) {

            case this.player.MOVE_STATES.IDLE:
                if (this.player.player.anims.currentAnim.key != "player-idle-anim") {
                    this.player.setBodyOnNormal();
                    this.player.player.anims.play("player-idle-anim")
                }
                break

            case this.player.MOVE_STATES.JUMP:
                if (this.player.player.anims.currentAnim.key != "player-jump-anim") {
                    this.player.setBodyOnJump()
                    this.player.player.anims.play("player-jump-anim")
                }
                break

            case this.player.MOVE_STATES.WALK:
                if (this.player.player.anims.currentAnim.key != "player-walk-anim") {
                    this.player.setBodyOnNormal()
                    this.player.player.anims.play("player-walk-anim")
                }
                break

            case this.player.MOVE_STATES.RUN:
                if (this.player.player.anims.currentAnim.key != "player-run-anim") {
                    this.player.setBodyOnNormal()
                    this.player.player.anims.play("player-run-anim")
                }
                break

            case this.player.MOVE_STATES.BLOCK:
                if (this.player.player.anims.currentAnim.key != "player-defend-anim") {
                    this.player.setBodyOnNormal()
                    this.player.player.anims.play("player-defend-anim")
                }
                break

            case this.player.MOVE_STATES.NORMAL_ATTACK:
                if (this.player.player.anims.currentAnim.key != "player-attack1-anim") {
                    this.player.setBodyOnNormal()
                    this.player.player.anims.play("player-attack1-anim")
                }
                if (this.player.player.anims.currentFrame.textureFrame >= 5) {
                    this.changeMoveState(this.player.MOVE_STATES.IDLE)
                    this.player.isInAttack = false;
                }
                break

            case this.player.MOVE_STATES.RUN_ATTACK:
                if (this.player.player.anims.currentAnim.key != "player-attack3-anim") {
                    this.player.setBodyOnNormal()
                    this.player.player.anims.play("player-attack3-anim")
                }

                if (this.player.player.anims.currentFrame.textureFrame >= 5) {
                    this.changeMoveState(this.player.MOVE_STATES.IDLE)
                    this.player.isInRunAttk = false;
                }
                break

            default: return
        }
    }

    update(time, delta) {
        this.moveMachine();
    }
}