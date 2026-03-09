import { state } from "./state.js";
import { loadScene } from "./sceneManager.js";

export function determineEnding() {
  // Good ending: completed main dungeon + all major quests
  const allQuestsCompleted = Object.values(state.player.quests).every(q => q.completed);
  const highAffinity = Object.values(state.player.npcAffinity).some(a => a >= 5);

  if (state.player.level >= 5 && allQuestsCompleted && highAffinity) {
    loadScene("endingHeroic");
  } else if (state.player.level >= 3) {
    loadScene("endingNeutral");
  } else {
    loadScene("endingSurvivor");
  }
}