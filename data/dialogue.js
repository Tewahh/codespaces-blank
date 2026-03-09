export const dialogue = {
  npc1: [
    {
      text: "Hello traveler! Would you like a quest?",
      choices: [
        { text: "Yes, tell me!", action: () => console.log("Quest accepted!") },
        { text: "No, thanks.", action: () => console.log("Quest declined.") }
      ]
    }
  ]
};