import { state } from '../state.js';
import { skills } from '../../data/skills.js';
import { startTurnQueue } from '../systems/turnSystem.js';
import { logCombat } from '../ui.js';

// Player uses a skill
export function useSkill(skillId) {
  const skill = skills.find(s => s.id === skillId);
  if (!skill) return;

  startTurnQueue(() => {
    if (skill.type === 'attack') {
      const target = state.enemiesInBattle[0];
      if (!target) return;
      const dmg = Math.floor(state.player.attack * skill.damageMultiplier - target.defense);
      target.hp -= Math.max(dmg, 1);
      logCombat(`You use ${skill.name} on ${target.name} for ${Math.max(dmg, 1)} damage!`);
    } else if (skill.type === 'buff') {
      state.player.defense += skill.defenseBonus;
      logCombat(`You use ${skill.name}, defense increased by ${skill.defenseBonus} for ${skill.duration} turns!`);
    }
  });
}