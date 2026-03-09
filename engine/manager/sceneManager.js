import { scenes } from "../../data/scenes.js";
import { state } from "../state.js";
import { updateUI } from "../ui.js";
import { startCombat } from "../combat/combat.js";

export function loadScene(name) {

  const scene = scenes[name];
  if (!scene) return;

  state.scene = name;

  // RUN SCENE EFFECT
  if (scene.effect) {

    const result = scene.effect(state);

    if (result?.combat) return startCombat(result.combat);
    if (result?.next) return loadScene(result.next);

  }

  document.getElementById("dialogue").textContent =
    scene.text;

  if (scene.choices && scene.choices.length > 0) {
    renderChoices(scene.choices);
  }
  updateUI();
}

function renderChoices(choices) {

  const container = document.getElementById("choices");
  container.innerHTML = "";

  choices.forEach(choice => {

    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.onclick = () => {

      if (choice.combat)
        startCombat(choice.combat);
      else if (choice.next)
        loadScene(choice.next);

    };

    container.appendChild(btn);

  });

}