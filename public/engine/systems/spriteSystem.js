import { SPRITES } from "../../data/sprites.js";

export function applySprite(el, spriteName) {
  const sprite = SPRITES[spriteName];

  if (!sprite) {
    console.warn("Missing sprite:", spriteName);
    return;
  }

  el.style.width = sprite.w + "px";
  el.style.height = sprite.h + "px";

  el.style.backgroundImage = "url('./assets/spritesheet.png')";
  el.style.backgroundRepeat = "no-repeat";

  // 🔥 IMPORTANT (fix alignment issues)
  el.style.backgroundSize = "512px 448px"; // adjust if needed

  el.style.backgroundPosition = `-${sprite.x}px -${sprite.y}px`;

  el.style.imageRendering = "pixelated";
}