export const dialogue = {

    elder_intro: {
        npc: "Village Elder",
        text: "Welcome, traveler. Dark creatures have begun appearing near the forest.",
        choices: [
            { text: "How can I help?", next: "elder_quest" },
            { text: "I'm just passing through.", next: "elder_leave" }
        ]
    },

    elder_quest: {
        npc: "Village Elder",
        text: "Defeat the wolves in the forest and return to me.",
        choices: [
            { text: "I'll handle it.", questStart: "wolf_problem", next: "end" }
        ]
    },

    elder_leave: {
        npc: "Village Elder",
        text: "Very well. Stay safe on the roads.",
        choices: [
            { text: "Leave", next: "end" }
        ]
    }

}