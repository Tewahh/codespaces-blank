
import { state } from "./engine/state.js";
import { loadScene } from "./engine/sceneManager.js";
import { generateLoot } from "./engine/generator/lootGenerator.js";
import { updateUI } from "./engine/ui.js";
import { addItem } from "./engine/systems/inventorySystem.js";
import { characters } from "./characters.js";

let currentUser = null;

function enableAdminPanel() {
  const panel = document.getElementById("adminPanel");
  if (!panel) return;

  // Buttons
  document.getElementById("spawnLootBtn").addEventListener("click", () => {
    const loot = generateLoot();
    addItem(loot);
    console.log("Spawned loot:", loot);
    updateUI(state);
  });

  document.getElementById("fullHealBtn").addEventListener("click", () => {
    state.player.health = state.player.maxHealth;
    console.log("Player healed to full");
    updateUI(state);
  });

  document.getElementById("maxStatsBtn").addEventListener("click", () => {
    state.player.level = 99;
    state.player.attack = 999;
    state.player.defense = 999;
    console.log("Player stats maxed");
    updateUI(state);
  });
}

/* ======================
GLOBAL ERROR HANDLING
====================== */

// Visible error panel
let errorDiv = document.getElementById("errorMsg");
if (!errorDiv) {
  errorDiv = document.createElement("div");
  errorDiv.id = "errorMsg";
  errorDiv.style.cssText =
    "color:red; position:fixed; bottom:10px; left:10px; background:#ffeeee; padding:5px; border:1px solid red; max-width:300px; z-index:1000;";
  document.body.appendChild(errorDiv);
}

function showError(msg) {
  console.error(msg);
  errorDiv.textContent = msg;
}

globalThis.addEventListener("error", (event) => {
  showError(`Error: ${event.message} (${event.filename}:${event.lineno})`);
});

globalThis.addEventListener("unhandledrejection", (event) => {
  showError(`Async Error: ${event.reason?.message || event.reason}`);
});

/* ======================
DOM HELPERS
====================== */
function getEl(id) {
  const el = document.getElementById(id);
  if (!el) showError(`Missing element: ${id}`);
  return el;
}

/* ======================
ELEMENTS
====================== */
const loginSection = getEl("loginSection");
const gameSection = getEl("gameSection");

const loginForm = getEl("loginForm");
const createAccountForm = getEl("createAccountForm");

const loginMsg = getEl("loginMsg");
const createMsg = getEl("createMsg");

const loginUsername = getEl("loginUsername");
const loginPassword = getEl("loginPassword");

const newUsername = getEl("newUsername");
const newPassword = getEl("newPassword");
const newCharacter = getEl("newCharacter");

const showCreateAccountBtn = getEl("showCreateAccount");
const createAccountSection = getEl("createAccountSection");
const backToLoginBtn = getEl("backToLogin");

/* ======================
HELPERS
====================== */
function safeAssign(target, source) {
  if (!source) return;
  for (const key in source) {
    if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
}

/* ======================
UI TOGGLE
====================== */
showCreateAccountBtn?.addEventListener("click", () => {
  if (loginForm) loginForm.style.display = "none";
  if (showCreateAccountBtn) showCreateAccountBtn.style.display = "none";
  if (createAccountSection) createAccountSection.style.display = "block";
});

backToLoginBtn?.addEventListener("click", () => {
  createAccountSection.style.display = "none";
  loginForm.style.display = "block";
  showCreateAccountBtn.style.display = "inline-block";
});

/* ======================
LOGIN
====================== */
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = loginUsername?.value?.trim();
  const password = loginPassword?.value;

  if (!username || !password) {
    loginMsg.textContent = "Enter username and password";
    return;
  }

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();

    if (!result.success) {
      loginMsg.textContent = result.message;
      return;
    }

    currentUser = username;
    const isDev = String(username).trim().toLowerCase() === "dev";
    document.body.classList.toggle("dev-mode", isDev);

    if (isDev) {
      enableAdminPanel();
    }
    safeAssign(state.player, result.player);

    // Convert inventory from array to object if needed
    if (Array.isArray(state.player.inventory)) {
      state.player.inventory = {
        items: state.player.inventory,
        page: 0,
        pageSize: 40, // 10x4 grid
      };
    }

    loginSection.style.display = "none";
    gameSection.style.display = "grid";

    loadScene(result.player?.world?.scene || "intro");
  } catch (err) {
    showError(err);
  }
});

/* ======================
CREATE ACCOUNT
====================== */
createAccountForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = newUsername?.value?.trim();
  const password = newPassword?.value?.trim();
  const character = newCharacter?.value;

  if (!username || !password || !character) {
    createMsg.textContent = "Fill all fields";
    return;
  }

  const char = characters.find((c) => c.name === character);
  if (!char) {
    createMsg.textContent = "Invalid character";
    return;
  }

  try {
    const res = await fetch("/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        character,
        stats: char.stats,
      }),
    });
    const result = await res.json();

    createMsg.textContent = result.success
      ? "Account created! You can now login."
      : result.message || "Error creating account";
    if (result.success) createAccountForm.reset();
  } catch (err) {
    showError(err);
  }
});

/* ======================
CHARACTER DROPDOWN
====================== */
if (characters && newCharacter) {
  characters.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.name;
    opt.textContent = `${c.name} - ${c.class}`;
    newCharacter.appendChild(opt);
  });
}

/* ======================
SAVE / AUTOSAVE
====================== */
async function savePlayer() {
  if (!currentUser) return;

  try {
    const payload = {
      username: currentUser,
      player: JSON.parse(JSON.stringify(state.player)), // deep copy
    };

    await fetch("/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Player saved:", payload.player);
  } catch (err) {
    showError("Save failed: " + err);
  }
}

let saveTimeout = null;

function scheduleSave() {
  if (!currentUser) return;

  clearTimeout(saveTimeout);

  saveTimeout = setTimeout(() => {
    savePlayer();
  }, 2000); // save 2 seconds after last change
}

scheduleSave();

window.addEventListener("beforeunload", () => {
  if (!currentUser) return;

  navigator.sendBeacon(
    "/save",
    JSON.stringify({
      username: currentUser,
      player: state.player,
    })
  );
});

// let patchQueue = {};
// let patchTimeout = null;

// function queuePatch(data) {
//   Object.assign(patchQueue, data);

//   clearTimeout(patchTimeout);

//   patchTimeout = setTimeout(sendPatch, 1000);
// }

// async function sendPatch() {
//   if (!currentUser) return;

//   const patch = { ...patchQueue };
//   patchQueue = {};

//   try {
//     await fetch("/update-player", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         username: currentUser,
//         patch
//       })
//     });

//     console.log("Patch saved:", patch);

//   } catch (err) {
//     showError("Patch save failed: " + err);
//   }
// }

export function applySprite(el, sprite) {
  el.classList.add("sprite");

  el.style.width = sprite.w + "px";
  el.style.height = sprite.h + "px";

  el.style.backgroundPosition = `-${sprite.x}px -${sprite.y}px`;
}