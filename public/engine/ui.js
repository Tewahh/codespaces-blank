import { state } from "./state.js"
import { buildTurnQueue } from "./systems/turnSystem.js"
import { renderInventory } from "./systems/inventorySystem.js"

import { updateCombatUI } from "./combat/combatSystem.js"
import { endCombat } from "./combat/combatSystem.js"
export function updateUI() {
    stats.textContent =
        `Level ${state.player.level} ATK ${state.player.attack} DEF ${state.player.defense}`

    health.textContent =
        `HP ${state.player.health}/${state.player.maxHealth}`

    xp.textContent =
        `XP ${state.player.xp}/${state.player.xpToNext}`

    renderInventory()

}

const attackBtn = document.getElementById("attackBtn")


// Clamp stats to avoid negative values
function clampStats() {
    const p = state.player
    p.health = Math.max(0, p.health)
    p.maxHealth = Math.max(1, p.maxHealth)
    p.attack = Math.max(0, p.attack)
    p.defense = Math.max(0, p.defense)
}

// Handle player clicking attack
attackBtn.addEventListener("click", () => {
    if (!state.combat.active) return

    const queue = buildTurnQueue(state.player, state.combat.enemies)

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

    clampStats()
    updateCombatUI()
    updateUI()

    // Check for death
    if (state.player.health <= 0) {
        handleDeath()
    } else if (state.combat.enemies.length === 0) {
        endCombat()
    }
})

function handleDeath() {
    alert("You died! Respawning...")
    state.player.health = state.player.maxHealth
    // Optionally reset location to safe scene
    loadScene("intro") // make sure you have a safe starting scene
    state.combat.active = false
    document.getElementById("combat").classList.add("hidden")
    attackBtn.style.display = "none"
    updateUI()
}

// Heal player a bit between scenes
function healBetweenScenes() {
    state.player.health = Math.min(state.player.health + 10, state.player.maxHealth)
}

function recalcPlayerStats() {
    const p = state.player
    // base stats + equipment bonuses
    p.attack = Math.max(0, p.baseAttack + (p.equipment?.weapon?.attack || 0))
    p.defense = Math.max(0, p.baseDefense + (p.equipment?.armor?.defense || 0))
    p.maxHealth = Math.max(1, p.baseHealth + (p.equipment?.armor?.hp || 0))
    p.health = Math.min(p.health, p.maxHealth) // prevent exceeding max
}