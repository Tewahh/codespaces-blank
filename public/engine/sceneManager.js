import { scenes } from "../data/scenes.js"
import { state } from "./state.js"
import { updateUI } from "./ui.js"
import { startCombat } from "./combat/combatSystem.js"

export function loadScene(name) {

    const scene = scenes[name]

    if (!scene) return

    state.scene = name

    dialogue.textContent = scene.text

    renderChoices(scene.choices)

    updateUI()

}

function renderChoices(choices) {

    choicesDiv.innerHTML = ""

    choices.forEach(choice => {

        const btn = document.createElement("button")

        btn.textContent = choice.text

        btn.onclick = () => {

            if (choice.combat)
                startCombat(choice.combat)

            if (choice.next)
                loadScene(choice.next)

        }

        choicesDiv.appendChild(btn)

    })

}