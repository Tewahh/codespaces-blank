import { state } from './state.js';

export const quests = [
  {
    id: 'fetchHerbs',
    name: 'Collect Healing Herbs',
    description: 'Find 3 herbs in the forest.',
    completed: false,
    reward: { xp: 10, item: 'Potion' },
    progress: 0,
    target: 3
  }
];

export function startQuest(questId) {
  const quest = quests.find(q => q.id === questId);
  if (!quest) return;
  console.log(`Quest started: ${quest.name}`);
}

export function updateQuestProgress(questId, amount = 1) {
  const quest = quests.find(q => q.id === questId);
  if (!quest || quest.completed) return;

  quest.progress += amount;
  console.log(`${quest.name}: ${quest.progress}/${quest.target}`);

  if (quest.progress >= quest.target) {
    quest.completed = true;
    state.player.xp += quest.reward.xp;
    state.player.inventory.push(quest.reward.item);
    console.log(`Quest completed! Reward: ${quest.reward.xp} XP, ${quest.reward.item}`);
  }
}