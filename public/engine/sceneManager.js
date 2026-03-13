import { state } from "./state.js";
import { scenes } from "../data/scenes.js";
import { updateUI } from "./ui.js";
import { startCombat } from "./combat/combatSystem.js";
import { sceneError } from "./debug.js";

const dialogue = document.getElementById("dialogue");
const choicesDiv = document.getElementById("choicesDiv");

export function loadScene(name) {
  const scene = scenes[name];

  if (!scene) {
    sceneError(name, state, scenes);
    return;
  }

  state.scene = name;

  dialogue.textContent = scene.text;

  renderChoices(scene.choices);

  updateUI(state);
}

async function renderChoices(choices) {
  choicesDiv.innerHTML = "";

  choices.forEach((choice) => {
    if (choice.next && !scenes[choice.next]) {
      console.warn(`Choice points to missing scene: ${choice.next}`);
    }
    const btn = document.createElement("button");

    btn.textContent = choice.text;

    btn.onclick = () => {
      if (choice.combat) startCombat(choice.combat);

      if (choice.next) loadScene(choice.next);
    };

    choicesDiv.appendChild(btn);
  });
}
