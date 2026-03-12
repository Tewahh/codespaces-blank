import { state } from "./state.js";
import { scenes } from "../data/scenes.js"
import { updateUI } from "./ui.js";
import { startCombat } from "./combat/combatSystem.js";

const dialogue = document.getElementById("dialogue");
const choicesDiv = document.getElementById("choicesDiv");

export async function loadScene(name) {
  const scene = scenes[name];

  if (!scene) return;

  state.scene = name;

  dialogue.textContent = scene.text;

  renderChoices(scene.choices);

  updateUI();
}

async function renderChoices(choices) {
  choicesDiv.innerHTML = "";

  choices.forEach((choice) => {
    const btn = document.createElement("button");

    btn.textContent = choice.text;

    btn.onclick = () => {
      if (choice.combat) startCombat(choice.combat);

      if (choice.next) loadScene(choice.next);
    };

    choicesDiv.appendChild(btn);
  });
}