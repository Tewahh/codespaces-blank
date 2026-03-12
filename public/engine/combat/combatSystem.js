import { state } from "../state.js"
import { updateUI } from "../ui.js"
import { enemies } from "../../data/enemies.js"
import { addXP } from "../systems/levelSystem.js"
import { addItem } from "../systems/inventorySystem.js"
import { generateLoot } from "../generator/lootGenerator.js"
import { buildTurnQueue } from "../systems/turnSystem.js"
import { healBetweenScenes } from "../ui.js"
export function startCombat(enemyNames) {
    state.combat.active = true
    state.combat.enemies = enemyNames.map(name => ({ ...enemies[name] }))

    const combatDiv = document.getElementById("combat");
    console.log("asd");
    attackBtn.style.display = "inline-block";
    attackBtn.style.visibility="visible";
    console.log(attackBtn.style.visibility)
    attackBtn.style.opacity = "1";
    console.log(attackBtn.style.opacity)
    combatDiv.classList.remove("hidden");

    updateCombatUI();
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

export function endCombat() {
    state.combat.active = false
    document.getElementById("combat").classList.add("hidden")
    attackBtn.style.display = "none"

    addXP(5)
    const loot = generateLoot()
    addItem(loot)
    console.log("Loot:", loot.name)

    // Heal slightly after combat
    healBetweenScenes()

    updateUI()
}

export function updateCombatUI() {
    const enemyDiv = document.getElementById("enemy")
    if (state.combat.enemies.length === 0) {
        enemyDiv.textContent = "No enemies left!"
        return
    }

    enemyDiv.innerHTML = state.combat.enemies
        .map(e => `${e.name} HP: ${e.hp}`)
        .join("<br>")
}