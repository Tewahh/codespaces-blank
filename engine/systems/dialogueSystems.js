import { dialogue } from "../../data/dialogue.js";

export function startDialogue(npcId) {

  const tree = dialogue[npcId];

  if (!tree) return;

  showNode(tree, "start");

}

function showNode(tree, nodeId) {

  const node = tree[nodeId];

  document.getElementById("dialogue")
    .textContent = node.text;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  node.choices.forEach(choice => {

    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.onclick = () => {

      if (!choice.next) {
        choices.innerHTML = "";
        return;
      }

      showNode(tree, choice.next);

    };

    choices.appendChild(btn);

  });

}