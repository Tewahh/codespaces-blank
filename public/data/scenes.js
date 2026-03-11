export const scenes = {

    intro: {
        text: "You arrive in a small village surrounded by forest.",
        choices: [
            { text: "Visit the village square", next: "village_square" },
            { text: "Explore the forest", next: "forest_edge" }
        ]
    },

    village_square: {
        text: "Villagers gather around the market and the village elder waits nearby.",
        choices: [
            { text: "Talk to the elder", dialogue: "elder_intro" },
            { text: "Travel the world", map: true },
            { text: "Leave village", next: "intro" }
        ]
    },

    forest_edge: {
        text: "The forest is dark and quiet. You hear distant howls.",
        choices: [
            { text: "Search the forest", combat: ["wolf"] },
            { text: "Go deeper", next: "deep_forest" },
            { text: "Return to village", next: "intro" }
        ]
    },

    deep_forest: {
        text: "The trees grow thick. Something moves in the shadows.",
        choices: [
            { text: "Fight goblins", combat: ["goblin", "goblin"] },
            { text: "Return", next: "forest_edge" }
        ]
    }

}