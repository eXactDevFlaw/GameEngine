import SceneLoader from "./sceneLoader";

const GAME_DATA = {
  PLAYER_STATES: {},

  CURRENT_GAME_STATE: {
    CURRENT_SCENE: null,
  },

  SCENE_REFS: {
    MAIN_SCENE_REF: null,
    /**
     * @type {SceneLoader}
     */
    SCENE_LOADER_REF: null,
  },

  GAME_SETTINGS: {
    // Berechnung ziwschen 0-1 also 10% in dem Fall.
    GAME_VOLUME: 0.1,
  }
};

export default GAME_DATA