import MushRoomMonsterTwo from "./MushroomTwoMonster.js"

export default class MushroomTwoMachine {
    constructor(mushroomMonster) {
        /**@type {MushRoomMonsterTwo} */
        this.mushroomMonster = mushroomMonster;
    }
    changeMoveState(newState) {
        this.mushroomMonster.currentMoveState = newState
    }
    MoveMachine() {
        switch (this.mushroomMonster.currentMoveState) {
            case this.mushroomMonster.MOVE_STATES.IDLE:
                break
            case this.mushroomMonster.MOVE_STATES.MOVE:
                break
        }
    }
}