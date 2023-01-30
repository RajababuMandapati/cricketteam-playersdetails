const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

module.exports = app;

// create players table

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayersQuery = `
        SELECT 
            *
        FROM 
            cricket_team
        WHERE 
            playerId = ${playerId};`;

  const player = db.get(getPlayersQuery);
  response.send(player);
});

app.post("/players/:playerId/", async (request, response) => {
  const playerDetails = request.body;
  const { playerId, playerName, jerseyNumber, role } = playerDetails;
  const addPlayerQuery = `
        INSERT INTO 
            cricket_team (playerName,jerseyNumber,role)
        VALUES
            ("vishal",17,"Bowler");
    `;
  const dbResponse = await db.run(addPlayerQuery);
  response.send("Player Added to Team");
});

// get player details

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayersQuery = `
        SELECT 
            *
        FROM 
            cricket_team
        WHERE 
            playerId = ${playerId};`;

  const player = db.get(getPlayersQuery);
  response.send(player);
});

// put player Details

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;

  const updatePlayerDetails = `
    UPDATE
        cricket_team
    SET
        "Mahesh",
        54,
        "All-rounder"
    WHERE playerId = ${player_id};
`;
  await db.run(updatePlayerDetails);
  response.send("Player Details Updated");
});

//Delete Book Query

app.delete("/players/:playerId/", async (request, response) => {
  const playerId = request.params;
  const deleteBookQuery = `
    SELECT *
    FROM cricket_team
    where playerId = ${playerId};
    `;
  await db.run(deleteBookQuery);
  response.send("Book Deleted Succesfully");
});
