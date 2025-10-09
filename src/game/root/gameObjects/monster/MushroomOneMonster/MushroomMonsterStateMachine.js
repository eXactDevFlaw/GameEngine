import MushRoomMonsterOne from "./MushroomMonster.js"

export default class MushroomOneMachine{
    constructor(mushroomMonster) {
        /**@type {MushRoomMonsterOne} */
        this.mushroomMonster = mushroomMonster;
    }
    changeMoveState(newState) {
        this.mushroomMonster.currentMoveState = newState
    }
    MoveMachine() {
        switch(this.mushroomMonster.currentMoveState) {
            case this.mushroomMonster.MOVE_STATES.IDLE:
                console.log("Ich bin Idle")
                this.changeMoveState(this.mushroomMonster.MOVE_STATES.MOVE)
                break

            case this.mushroomMonster.MOVE_STATES.MOVE:
                console.log("now We are in MOVE STATE")
                
                break
        }
    }
}