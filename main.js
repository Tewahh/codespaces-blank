import { loadScene } from "./engine/manager/sceneManager.js";
import { saveGame, loadGame } from "./engine/manager/saveManager.js";
import { renderMap } from "./engine/systems/mapSystem.js";
import { renderSkillTree } from "./engine/skillTree.js";
import "./engine/combat/combat.js";

window.save = saveGame;
window.onload = () => {
  if (!loadGame())
    loadScene("intro");
}

renderMap();
renderSkillTree();
loadScene("intro");