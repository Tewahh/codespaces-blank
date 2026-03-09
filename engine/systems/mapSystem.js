import { state } from '../state.js';
import { worldMap } from '../../data/worldMap.js';

export function movePlayer(x, y) {
  const loc = worldMap.find(l => l.x === x && l.y === y);
  if (!loc) return console.log("Cannot move there.");
  
  state.player.position = { x, y };
  if (!loc.discovered) loc.discovered = true;
  console.log(`Moved to ${loc.name}`);
}