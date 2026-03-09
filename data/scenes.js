export const scenes = {
  intro: {
    text: "You wake up in a dark forest. A path leads north.",
    choices: [
      { text: "Follow path", action: () => console.log("Going north...") },
      { text: "Stay and rest", action: () => console.log("Resting...") }
    ]
  },
  caveEntrance: {
    text: "A hidden cave entrance is here.",
    choices: [
      { text: "Enter the cave", action: () => console.log("Entering cave...") },
      { text: "Go back", action: () => console.log("Returning...") }
    ]
  }
};