import { state } from '../state.js';

export function addXP(amount) {
  state.player.xp += amount;
  const xpToLevel = 10 * state.player.level;
  if (state.player.xp >= xpToLevel) {
    state.player.level += 1;
    state.player.maxHp += 10;
    state.player.hp = state.player.maxHp;
    state.player.attack += 2;
    state.player.defense += 1;
    state.player.xp -= xpToLevel;
    console.log(`Leveled up! Now level ${state.player.level}`);
  }
}