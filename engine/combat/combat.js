import { state } from '../state.js';
import { enemies } from '../../data/enemies.js';
import { logCombat } from '../ui.js';

export function startCombat(enemyIds = []) {
  state.enemiesInBattle = enemyIds.map(id => {
    const enemy = enemies.find(e => e.id === id);
    return { ...enemy };
  });
  logCombat('Battle starts!');
  nextTurn();
}

function nextTurn() {
  // Simple player turn: attack first enemy
  const enemy = state.enemiesInBattle[0];
  if (!enemy) return endCombat();

  const damage = Math.max(state.player.attack - enemy.defense, 1);
  enemy.hp -= damage;
  logCombat(`You hit ${enemy.name} for ${damage} damage!`);

  if (enemy.hp <= 0) {
    logCombat(`${enemy.name} defeated!`);
    state.enemiesInBattle.shift();
  }

  // Enemy turn
  state.enemiesInBattle.forEach(e => {
    const dmg = Math.max(e.attack - state.player.defense, 1);
    state.player.hp -= dmg;
    logCombat(`${e.name} hits you for ${dmg} damage!`);
  });

  if (state.player.hp <= 0) {
    logCombat('You have been defeated!');
    return;
  }

  if (state.enemiesInBattle.length > 0) {
    setTimeout(nextTurn, 1000); // auto-next turn
  } else {
    endCombat();
  }
}

function endCombat() {
  logCombat('Combat ended.');
}