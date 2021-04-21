// const http = require("http");
// const websocket = require("ws");
// const fs = require("fs");
// let script;
// let msgParse;
// let usersFile;

// //czytanie skryptu z pliku
// fs.readFile(__dirname + "/skrypt.txt", (error, data) => {
//   if (error) {
//     throw error;
//   }
//   script = data.toString();
// });

// //czytanie pliku o userach
// fs.readFile("users.txt", "utf8", function (err, data) {
//   if (err) throw err;
//   if (data != undefined) {
//     usersFile = data.toString();
//   }
// });

// const server = http.createServer((req, res) => {
//   res.end("I am connected");
// });
// const wss = new websocket.Server({ server });

// wss.on("headers", (headers, req) => {
//   //console.log(headers); Not logging the header anymore
// });

// //Event: 'connection'
// wss.on("connection", (ws, req) => {
//   ws.on("message", (msg) => {
//     if (msg.includes("nick") && msg.includes("swiat")) {
//       msgParse = JSON.parse(msg);
//       console.log(msgParse);
//     }
//     console.log(msgParse);
//     if (usersFile.includes(msgParse.nick)) {
//       ws.send(script);
//       ws.send("Gitara masz licke");
//     } else {
//       console.log(
//         `Postać ${msgParse.nick} z świata ${msgParse.swiat} brak licencji!`
//       );
//       ws.send("Zlodzieju ty");
//       ws.close();
//     }
//   });
// });

// server.listen(8000);

const fs = require("fs");
const https = require("https");
const websocket = require("ws");
let script;
let msgParse;
let usersFile;

const server = new https.createServer({
  cert: fs.readFileSync(__dirname + "/certificate.crt"),
  key: fs.readFileSync(__dirname + "/privateKey.key"),
});

const wss = new websocket.Server({ server });
//czytanie skryptu z pliku
fs.readFile(__dirname + "/skrypt.txt", (error, data) => {
  if (error) {
    throw error;
  }
  script = data.toString();
});

//czytanie pliku o userach
fs.readFile("users.txt", "utf8", function (err, data) {
  if (err) throw err;
  if (data != undefined) {
    usersFile = data.toString();
  }
});

wss.on("headers", (headers, req) => {
  //console.log(headers); Not logging the header anymore
});

//Event: 'connection'
wss.on("connection", (ws, req) => {
  ws.on("message", (msg) => {
    if (msg.includes("nick") && msg.includes("swiat")) {
      msgParse = JSON.parse(msg);
      console.log(msgParse);
    }
    console.log(msgParse);
    if (usersFile.includes(msgParse.nick)) {
      ws.send(script);
      ws.send("Gitara masz licke");
    } else {
      console.log(
        `Postać ${msgParse.nick} z świata ${msgParse.swiat} brak licencji!`
      );
      ws.send("Zlodzieju ty");
      ws.close();
    }
  });
});

server.listen(8000);
