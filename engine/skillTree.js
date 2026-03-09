export const skillTree = {
  warrior: [
    { id: 'powerStrike', unlocked: true },
    { id: 'defensiveStance', unlocked: false }
  ],
  rogue: [
    { id: 'backstab', unlocked: false },
    { id: 'evasion', unlocked: false }
  ]
};

export function unlockSkill(className, skillId) {
  const branch = skillTree[className];
  const skill = branch.find(s => s.id === skillId);
  if (skill) skill.unlocked = true;
}