export const state = {

    scene: "intro",

    player: {
        name: "Hero",
        level: 1,
        xp: 0,
        xpToNext: 10,

        maxHealth: 20,
        health: 20,

        attack: 2,
        defense: 1,
        speed: 3,

        inventory: [],
        equipment: { weapon: null, armor: null },

        quests: {},
        npcAffinity: {}
    },

    combat: {
        active: false,
        enemies: []
    }

}