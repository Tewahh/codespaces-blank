import { state } from "../engine/state.js";
import { logCombat, calculateDamage } from "../engine/combat/combatSystem.js";

// Define skills
export const skills = {
  powerStrike: {
    name: "Power Strike",
    description: "Heavy attack: +50% damage",
    target: "single",
    execute: (targetIndex) => {
      const enemy = state.combat.enemies[targetIndex];
      const damage = Math.floor(calculateDamage(state.player, enemy) * 1.5);
      enemy.hp -= damage;
      logCombat(`Power Strike hits ${enemy.name} for ${damage} damage!`);
      if (enemy.hp <= 0) {
        logCombat(`${enemy.name} is defeated!`);
        state.combat.enemies.splice(targetIndex, 1);
      }
    }
  },
  defensiveStance: {
    name: "Defensive Stance",
    description: "Reduce incoming damage for one turn",
    target: "self",
    execute: () => {
      state.player.defense += 2;
      logCombat("You adopt a Defensive Stance, DEF +2 for 1 turn!");
    }
  }
};

// Execute a skill
export function useSkill(skillId, targetIndex = 0) {
  const skill = skills[skillId];
  if (!skill) return;
  skill.execute(targetIndex);
}