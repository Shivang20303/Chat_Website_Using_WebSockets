const express = require('express');
const expressWs = require('express-ws');

const app = express();

expressWs(app);

//Creating Set for each clients socket connection
const connections = new Set();

const wsHandler = (ws) => {
    connections.add(ws);

    // Activates whenever a message is received from client
    ws.on('message', (message) => {
        connections.forEach((conn) => {
            conn.send(message);
        });
    });

    // When client disconnects
    ws.on('close', () => {

        // Connection is deleted from Set
        connections.delete(ws);
    });
};

// WebSocket added to '/chat'
app.ws('/chat', wsHandler);

app.use(express.static("build"));

app.listen("8080", () => {
    console.log(`Server started on port 8080`);
});