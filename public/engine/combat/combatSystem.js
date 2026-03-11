import { state } from "../state.js"
import { updateUI } from "../ui.js"
import { enemies } from "../../data/enemies.js"
import { addXP } from "../systems/levelSystem.js"
import { addItem } from "../systems/inventorySystem.js"
import { generateLoot } from "../generator/lootGenerator.js"
import { buildTurnQueue } from "../systems/turnSystem.js"

export function startCombat(enemyNames) {
    state.combat.active = true
    state.combat.enemies = enemyNames.map(name => ({ ...enemies[name] }))

    const combatDiv = document.getElementById("combat")
    combatDiv.classList.remove("hidden")
    attackBtn.style.display = "inline-block"  // Show button in combat

    updateCombatUI()
}


export function playerAttack() {

    const queue = buildTurnQueue(
        state.player,
        state.combat.enemies
    )

    queue.forEach(turn => {
        if (turn.type === "player") {
            const enemy = state.combat.enemies[0]
            enemy.hp -= state.player.attack
            console.log(`You hit ${enemy.name} for ${state.player.attack} damage!`)
            if (enemy.hp <= 0) {
                console.log(`${enemy.name} defeated!`)
                state.combat.enemies.shift()
            }
        } else {
            state.player.health -= turn.enemy.attack
            console.log(`${turn.enemy.name} hits you for ${turn.enemy.attack}!`)
        }
    })

    updateCombatUI()

    if (state.player.health <= 0) {

        alert("You died")

    }

    if (state.combat.enemies.length === 0) {

        endCombat()

    }

}

function endCombat() {
    state.combat.active = false

    const combatDiv = document.getElementById("combat")
    combatDiv.classList.add("hidden")
    attackBtn.style.display = "none"  // Hide button when combat ends

    addXP(5)
    const loot = generateLoot()
    addItem(loot)
    console.log("Loot:", loot.name)

    updateUI()
}

function updateCombatUI() {
    const enemyDiv = document.getElementById("enemy")
    if (state.combat.enemies.length === 0) {
        enemyDiv.textContent = "No enemies left!"
        return
    }

    enemyDiv.innerHTML = state.combat.enemies
        .map(e => `${e.name} HP: ${e.hp}`)
        .join("<br>")
}

