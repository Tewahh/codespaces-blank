const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database("./rpg.db");



/* =========================
   DATABASE SETUP
========================= */

db.serialize(() => {

    db.run(`
CREATE TABLE IF NOT EXISTS users(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT UNIQUE COLLATE NOCASE,
password TEXT
)
`);

    db.run(`
CREATE TABLE IF NOT EXISTS characters(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT,
characterClass TEXT,

stats TEXT,
inventory TEXT,
equipment TEXT,
quests TEXT,
world TEXT,

FOREIGN KEY(username) REFERENCES users(username)
)
`);

});



/* =========================
   CREATE ACCOUNT
========================= */

app.post("/create-account", async (req, res) => {
    let { username, password, character, stats } = req.body

    if (!username || !password || !character) {
        return res.json({ success: false, message: "Missing fields" })
    }

    // Normalize username to lowercase to prevent "John" vs "john"
    const normalizedUsername = username.trim().toLowerCase()

    const hash = await bcrypt.hash(password, 10)

    // Try to insert user
    db.run(
        `INSERT INTO users(username, password) VALUES(?, ?)`,
        [normalizedUsername, hash],
        function (err) {
            if (err) {
                return res.json({ success: false, message: "Username already exists" })
            }

            // Prepare character data
            const characterData = {
                stats,
                inventory: [],
                equipment: { weapon: null, armor: null },
                quests: {},
                world: { scene: "intro", unlockedLocations: ["village"] }
            }

            db.run(
                `INSERT INTO characters(username, characterClass, stats, inventory, equipment, quests, world)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    normalizedUsername,
                    character,
                    JSON.stringify(characterData.stats),
                    JSON.stringify(characterData.inventory),
                    JSON.stringify(characterData.equipment),
                    JSON.stringify(characterData.quests),
                    JSON.stringify(characterData.world)
                ],
                (err) => {
                    if (err) {
                        console.log(err)
                        return res.json({ success: false, message: "Error creating character" })
                    }

                    res.json({ success: true })
                }
            )
        }
    )
})



/* =========================
   LOGIN
========================= */

app.post("/login", (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.json({ success: false, message: "Missing fields" })
    }

    const normalizedUsername = username.trim().toLowerCase()

    db.get(
        `SELECT * FROM users WHERE username = ? COLLATE NOCASE`,
        [normalizedUsername],
        async (err, user) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, message: "Database error" })
            }

            if (!user) return res.json({ success: false, message: "User not found" })

            const match = await bcrypt.compare(password, user.password)

            if (!match) return res.json({ success: false, message: "Incorrect password" })

            // Load character data
            db.get(
                `SELECT * FROM characters WHERE username = ? COLLATE NOCASE`,
                [normalizedUsername],
                (err, char) => {
                    if (err || !char) {
                        console.log(err)
                        return res.json({ success: false, message: "Character not found" })
                    }

                    res.json({
                        success: true,
                        character: char.characterClass,
                        player: {
                            stats: JSON.parse(char.stats),
                            inventory: JSON.parse(char.inventory),
                            equipment: JSON.parse(char.equipment),
                            quests: JSON.parse(char.quests),
                            world: JSON.parse(char.world)
                        },
                    })
                }
            )
        }
    )
})


/* =========================
   SAVE PLAYER DATA
========================= */

app.post("/save", (req, res) => {
    let { username, player } = req.body

    if (!username || !player) return res.json({ success: false, message: "Missing data" })

    const normalizedUsername = username.trim().toLowerCase()

    db.run(
        `UPDATE characters
     SET stats = ?, 
         inventory = ?, 
         equipment = ?, 
         quests = ?, 
         world = ?
     WHERE username = ? COLLATE NOCASE`,
        [
            JSON.stringify(player.stats),
            JSON.stringify(player.inventory),
            JSON.stringify(player.equipment),
            JSON.stringify(player.quests),
            JSON.stringify(player.world),
            normalizedUsername
        ],
        (err) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, message: "Database error" })
            }

            res.json({ success: true })
        }
    )
})



/* =========================
   AUTOSAVE
========================= */

app.post("/autosave", (req, res) => {
    let { username, player } = req.body

    if (!username || !player) return res.json({ success: false })

    const normalizedUsername = username.trim().toLowerCase()

    db.run(
        `UPDATE characters
     SET stats = ?, 
         inventory = ?, 
         equipment = ?, 
         quests = ?, 
         world = ?
     WHERE username = ? COLLATE NOCASE`,
        [
            JSON.stringify(player.stats),
            JSON.stringify(player.inventory),
            JSON.stringify(player.equipment),
            JSON.stringify(player.quests),
            JSON.stringify(player.world),
            normalizedUsername
        ],
        (err) => {
            if (err) console.log(err)
            // no error message to client, autosave is silent
        }
    )

    res.json({ success: true })
})



/* =========================
   START SERVER
========================= */

app.listen(3000, () => {

    console.log("Server running at http://localhost:3000")

})