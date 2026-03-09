import { state } from "../state.js";
import { loadScene } from "./sceneManager.js";

export function checkEnding() {

  if (state.player.level >= 3) {
    loadScene("endingGood");
  }

  else {
    loadScene("endingNeutral");
  }

}