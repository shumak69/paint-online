const express = require("express");
const app = express();
const WSserver = require("express-ws")(app);
const aWss = WSserver.getWss();

const PORT = process.env.PORT || 5000;

app.ws("/", (ws, req) => {
  console.log("Connection established");
  ws.send("You have successfully connected");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;

      default:
        break;
    }
  });
});

app.listen(PORT, () => console.log(`Server started on PORT ${5000}`));

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(`User ${msg.username} connected`);
    }
  });
};
