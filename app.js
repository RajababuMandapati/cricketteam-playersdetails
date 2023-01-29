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

// create players table

app.get("/players/:playerId/",async (request,response) => {

    const {playerId} = request.params;
    const getPlayersQuery = '
        SELECT 
            *
        FROM 
            cricket_team
        WHERE 
            playerId = ${playerId};';
            
        const player = db.get(getPlayersQuery);
        response.send(player);

        
})
