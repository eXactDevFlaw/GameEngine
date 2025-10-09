import MushRoomMonsterOne from "./MushroomMonster.js"

export default class MushroomOneMachine{
    /**
     * 
     * @param {MushRoomMonsterOne} mushroom 
     */
    static MoveMachine(mushroom) {
        switch(mushroom.currentMoveState) {
            case 0:
                console.log("Ich bin Idle")
                break
            case 1:
                break
        }
    }
}