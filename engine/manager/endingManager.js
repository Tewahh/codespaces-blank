export function triggerEnding(type) {
  if (type === 'good') console.log("You saved the kingdom!");
  else if (type === 'neutral') console.log("You survived but nothing changed.");
  else console.log("The kingdom falls into darkness...");
}