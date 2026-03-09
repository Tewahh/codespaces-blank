import { skills } from "../data/skills.js";
import { state } from "./state.js";
import { updateUI } from "./ui.js";

export function unlockSkill(skillId) {

    if (!state.player.skillPoints) return;

    if (!state.player.skills)
        state.player.skills = {};

    if (state.player.skills[skillId]) return;

    const skill = skills[skillId];

    skill.effect(state);

    state.player.skills[skillId] = true;

    state.player.skillPoints--;

    updateUI();
}

export function renderSkillTree() {

    const container = document.getElementById("skills");

    if (!container) return;

    container.innerHTML = "";

    Object.entries(skills).forEach(([id, skill]) => {

        const btn = document.createElement("button");

        btn.textContent =
            skill.name + " - " + skill.description;

        btn.onclick = () => unlockSkill(id);

        container.appendChild(btn);

    });

}