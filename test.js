// const { Client, GatewayIntentBits } = require("discord.js");
// const client = new Client({
//   intents: [
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.GuildMembers,
//     GatewayIntentBits.GuildIntegrations,
//   ],
// });
// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// const channelID = "1111023534030995557";

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on("messageCreate", (message) => {
//   if (message.channel.id === channelID) {
//     console.log(`New message in ${message.channel.name}: ${message.content}`);
//     io.emit("newMessage", message.content);
//   }
// });

// client.login("MTA5OTEwMDUzNzk4MDQ1Mjk0NQ.GBn_JH.IvXtIdeqqUxvB8J7vfh-eJx3ppidu5HasIYlRc");

// app.use(express.static("public"));

// server.listen(3000, () => {
//   console.log("Server started on port 3000");
// });



// const { Client, GatewayIntentBits } = require("discord.js");
// const client = new Client({
//   intents: [
//     GatewayIntentBits.MessageContent,
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.GuildMembers,
//     GatewayIntentBits.GuildIntegrations,
//   ],
// });
// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// const channelID = "1111023534030995557";

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on("messageCreate", (message) => {
//     if (message.channel.id === channelID) {
//       console.log(`New message in ${message.channel.name} from ${message.author.username}: ${message.content}`);
//       const messageObject = {
//         content: message.content,
//         author: message.author.username,
//         avatar: message.author.avatarURL(),
//       };
//       io.emit("newMessage", messageObject);
//     }
//   });

// client.login("MTA5OTEwMDUzNzk4MDQ1Mjk0NQ.GBn_JH.IvXtIdeqqUxvB8J7vfh-eJx3ppidu5HasIYlRc");

// app.use(express.static("public"));

// server.listen(3000, () => {
//   console.log("Server started on port 3000");
// });



const express = require("express");
const app = express();
const port = 3000;

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
  ],
});

const channelID = "1111023534030995557";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.channel.id === channelID) {
    console.log(`New message in ${message.channel.name} from ${message.author.username}: ${message.content}`);
    const messageObject = {
      content: message.content,
      author: message.author.username,
      avatar: message.author.avatarURL(),
    };
    app.locals.messageObject = messageObject;
  }
});

client.login("MTA5OTEwMDUzNzk4MDQ1Mjk0NQ.GBn_JH.IvXtIdeqqUxvB8J7vfh-eJx3ppidu5HasIYlRc");

app.get("/", (req, res) => {
  const messageObject = app.locals.messageObject || {};
  res.send(`
    <html>
      <head>
        <title>Discord Channel Messages</title>
      </head>
      <body>
        <h1>Discord Channel Messages</h1>
        <ul id="message-list">
          <li>
            <img src="${messageObject.avatar}" alt="${messageObject.author}">
            <div class="content">${messageObject.content}</div>
          </li>
        </ul>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
