import { updateUI } from '../ui.js';
import { state } from '../state.js';
import { startCombat } from '../combat/combat.js';

export const scenes = {
  intro: {
    text: 'You wake up in a dark forest. You see a path leading north.',
    choices: [
      { text: 'Follow the path', action: () => startScene('forestPath') },
      { text: 'Stay and rest', action: () => startScene('rest') }
    ]
  },
  forestPath: {
    text: 'A wild wolf appears!',
    choices: [
      { text: 'Fight the wolf', action: () => startCombat(['wolf']) },
      { text: 'Run back', action: () => startScene('intro') }
    ]
  },
  rest: {
    text: 'You take a rest and recover 10 HP.',
    choices: [
      { text: 'Continue', action: () => { 
          state.player.hp = Math.min(state.player.hp + 10, state.player.maxHp);
          startScene('intro'); 
        } 
      }
    ]
  }
};

export function startScene(sceneId) {
  state.currentScene = sceneId;
  const scene = scenes[sceneId];
  updateUI(scene.text, scene.choices);
}