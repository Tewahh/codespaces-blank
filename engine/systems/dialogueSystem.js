import { dialogue } from '../../data/dialogue.js';
import { updateUI } from '../ui.js';

export function startDialogue(npcId) {
  const npcDialogue = dialogue[npcId];
  if (!npcDialogue) return;

  const node = npcDialogue[0]; // simple first node
  updateUI(node.text, node.choices);
}