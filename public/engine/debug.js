export function sceneError(sceneName, state, scenes) {
  console.error("⚠️ Scene Error");

  console.error("Scene requested:", sceneName);
  console.error("Previous scene:", state.scene);

  console.error("Available scenes:");
  console.log(Object.keys(scenes));

  alert(`Scene "${sceneName}" does not exist. Check console.`);
}
