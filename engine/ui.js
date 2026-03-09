import { state } from './state.js';

export function initUI() {
  updatePlayerStats();
}

export function updateUI(sceneText = '', choices = []) {
  document.getElementById('scene-text').innerText = sceneText;

  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.innerText = choice.text;
    btn.onclick = () => choice.action();
    choicesDiv.appendChild(btn);
  });

  updatePlayerStats();
}

export function updatePlayerStats() {
  document.getElementById('player-stats').innerText = 
    `HP: ${state.player.hp}/${state.player.maxHp} | Level: ${state.player.level} | XP: ${state.player.xp}`;
}

export function logCombat(message) {
  const log = document.getElementById('combat-log');
  log.innerText += message + '\n';
  log.scrollTop = log.scrollHeight;
}