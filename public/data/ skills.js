export const skills = {

    powerStrike: {
        name: "Power Strike",
        damage: 4,
        cost: 0,
        effect: null,
        description: "A powerful attack dealing extra damage."
    },

    defensiveStance: {
        name: "Defensive Stance",
        damage: 0,
        effect: "defense_up",
        duration: 2,
        description: "Increase defense for two turns."
    },

    poisonBlade: {
        name: "Poison Blade",
        damage: 2,
        effect: "poison",
        duration: 3,
        description: "Attack that poisons the enemy."
    },

    heal: {
        name: "Heal",
        heal: 6,
        cost: 0,
        description: "Restore health."
    }

}