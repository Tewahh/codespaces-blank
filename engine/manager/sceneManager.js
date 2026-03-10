import { scenes } from "../../data/scenes.js";
import { state } from "../state.js";
import { updateUI } from "../ui.js";
import { startCombat } from "../combat/combat.js";

export function startScene(sceneId) {
  const scene = scenes[sceneId];

  if (!scene) {
    console.error("Scene not found:", sceneId);
    return;
  }

  state.currentScene = sceneId;

  const processedChoices = scene.choices.map(choice => ({
    text: choice.text,
    action: () => handleChoice(choice)
  }));

  updateUI(scene.text, processedChoices);
}

function handleChoice(choice) {

  // Give item
  if (choice.giveItem) {

    if (Array.isArray(choice.giveItem)) {
      choice.giveItem.forEach(item => {
        state.player.inventory.push(item);
      });
    } else {
      state.player.inventory.push(choice.giveItem);
    }

    console.log("Inventory:", state.player.inventory);
  }

  // Heal
  if (choice.heal) {
    state.player.hp = Math.min(
      state.player.hp + choice.heal,
      state.player.maxHp
    );
  }

  // Combat
  if (choice.combat) {
    const scene = scenes[state.currentScene];
    startCombat(scene.enemy);
    return;
  }

  // Custom action
  if (choice.action) {
    choice.action();
  }

  // Change scene LAST
  if (choice.scene) {
    startScene(choice.scene);
  }

}