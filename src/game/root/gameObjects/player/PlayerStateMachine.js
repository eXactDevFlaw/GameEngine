import Player from "./player.js";

export default class PlayerStateMachine {
    constructor(player) {
        /**@type {Player} */
        this.player = player;
    }

    changeMoveState(newState) {
        this.player.currentMoveState = newState;
    }

    moveMachine() {
        switch(this.player.currentMoveState) {
            case this.player.MOVE_STATES.IDLE:
                if (this.player.player.anims.currentAnim.key != "player-idle-anim") {
                    this.player.player.anims.play("player-idle-anim")
                } 
                break
            case this.player.MOVE_STATES.JUMP:
                break
            case this.player.MOVE_STATES.RUN:
                if (this.player.player.anims.currentAnim.key != "player-run-anim") {
                    this.player.player.anims.play("player-run-anim")
                }
                break
        }
    }

    update(time, delta) {
        this.moveMachine();
    }
}