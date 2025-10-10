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
                console.log("Ich bin Idle")
                break
            case this.player.MOVE_STATES.JUMP:
                console.log("Ich bin Jump")
                break
            case this.player.MOVE_STATES.RUN:
                console.log("Ich bin Run")
                break
            case this.player.MOVE_STATES.WALK:
                console.log("Ich bin Walk")
                break
        }
    }
}