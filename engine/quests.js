import { state } from "./state.js";
import { logCombat } from "./combatSystem.js";

export const quests = {
  rescueVillager: {
    name: "Rescue the Villager",
    steps: [
      { description: "Find the bandit camp", complete: false },
      { description: "Defeat the bandit leader", complete: false },
      { description: "Return the villager to the village", complete: false }
    ],
    completed: false
  }
};

// Complete a quest step
export function completeQuestStep(questId, stepIndex) {
  const quest = quests[questId];
  if (!quest) return;
  quest.steps[stepIndex].complete = true;
  logCombat(`Quest updated: ${quest.steps[stepIndex].description} complete!`);

  if (quest.steps.every(s => s.complete)) {
    quest.completed = true;
    logCombat(`Quest completed: ${quest.name}`);
    // Reward
    state.player.xp += 5;
  }
}

// Track NPC affinity
export function modifyNPCAffinity(npcId, amount) {
  if (!state.player.npcAffinity[npcId]) state.player.npcAffinity[npcId] = 0;
  state.player.npcAffinity[npcId] += amount;
  console.log(`NPC ${npcId} affinity is now ${state.player.npcAffinity[npcId]}`);
}