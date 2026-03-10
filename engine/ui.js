import { state } from "./state.js";

export function initUI() {
  updatePlayerStats();
  updateInventory();
  updateSkills();
}

export function updateUI(sceneText = "", choices = []) {

  // STORY TEXT
  const textEl = document.getElementById("text");
  if (textEl) textEl.innerText = sceneText;

  // CHOICE BUTTONS
  const buttons = document.getElementById("choiceButtons");

  if (buttons) {
    buttons.innerHTML = "";

    choices.forEach(choice => {

      const btn = document.createElement("button");
      btn.innerText = choice.text;

      btn.onclick = () => {
        if (choice.action) choice.action();
      };

      buttons.appendChild(btn);

    });
  }

  updatePlayerStats();
  updateInventory();
  updateSkills();
}

export function updatePlayerStats() {

  const stats = document.getElementById("playerStats");

  if (!stats) return;

  stats.innerText =
    `HP: ${state.player.hp}/${state.player.maxHp}
Level: ${state.player.level}
XP: ${state.player.xp}`;
}

export function updateInventory() {

  const inv = document.getElementById("inventory");

  if (!inv) return;

  inv.innerHTML = "";

  state.player.inventory.forEach(item => {

    const div = document.createElement("div");
    div.className = "item";
    div.innerText = item;

    inv.appendChild(div);
  });

  const buttontext = document.getElementById("clearCombatLogText");
  buttontext.textContent = "Clear Combat Chat Logs";
  buttontext.onclick = () => {
    clearCombatLog();
  };
}

export function updateSkills() {

  const skills = document.getElementById("skills");

  if (!skills) return;

  skills.innerHTML = "";

  if (!state.player.skills) return;

  state.player.skills.forEach(skill => {

    const div = document.createElement("div");
    div.className = "skill";
    div.innerText = skill;

    skills.appendChild(div);

  });
}

export function logCombat(message) {
  const log = document.getElementById("combat-log");
  if (!log) return;

  const line = document.createElement("div");
  line.innerText = message;

  log.appendChild(line);
  log.scrollTop = log.scrollHeight; // always scroll to latest message
}

export function clearCombatLog() {
  const log = document.getElementById("combat-log");
  if (log) log.innerHTML = "";
}