import { state } from './engine/state.js';
import { initUI, updateUI } from './engine/ui.js';
import { startScene } from './engine/manager/sceneManager.js';

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  startScene(state.currentScene);
});