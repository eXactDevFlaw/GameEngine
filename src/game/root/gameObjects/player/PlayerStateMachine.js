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
                break
            case this.player.MOVE_STATES.JUMP:
                break
            case this.player.MOVE_STATES.RUN:
                break
            case this.player.MOVE_STATES.WALK:
                break
        }
    }
}