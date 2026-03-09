import { state } from '../state.js';
import { enemyAction } from '../enemyAI.js';
import { logCombat } from '../ui.js';

// Turn-based system for player and enemies
export function startTurnQueue(playerAction) {
  // Player acts first
  playerAction();

  // Then each enemy acts
  state.enemiesInBattle.forEach(enemy => {
    if (enemy.hp > 0) enemyAction(enemy, state.player);
  });

  // Remove defeated enemies
  state.enemiesInBattle = state.enemiesInBattle.filter(e => e.hp > 0);

  // Check if combat ended
  if (state.player.hp <= 0) {
    logCombat('You were defeated...');
  } else if (state.enemiesInBattle.length === 0) {
    logCombat('All enemies defeated!');
  }
}