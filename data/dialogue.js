export const dialogue = {

    elder: {

        start: {
            text: "Welcome traveler.",
            choices: [
                { text: "Who are you?", next: "who" },
                { text: "Goodbye" }
            ]
        },

        who: {
            text: "I guard this forest.",
            choices: [
                { text: "Tell me about this place", next: "forest" },
                { text: "Leave" }
            ]
        },

        forest: {
            text: "Dark things live here now.",
            choices: [
                { text: "Leave" }
            ]
        }

    }

};