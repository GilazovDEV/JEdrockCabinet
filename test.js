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

// const express = require("express");
// const app = express();
// const port = 3000;

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

// const channelID = "1111023534030995557";

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on("messageCreate", (message) => {
//   if (message.channel.id === channelID) {
//     console.log(`New message in ${message.channel.name} from ${message.author.username}: ${message.content}`);
//     const messageObject = {
//       content: message.content,
//       author: message.author.username,
//       avatar: message.author.avatarURL(),
//     //   channel: message.channel.name,
//     };
//     app.locals.messageObject = messageObject;
//   }
// });

// client.login("MTA5OTEwMDUzNzk4MDQ1Mjk0NQ.GBn_JH.IvXtIdeqqUxvB8J7vfh-eJx3ppidu5HasIYlRc");

// app.get("/", (req, res) => {
//   const messageObject = app.locals.messageObject || {};
//   res.send(`

//   <html lang="en">

//   <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-Compatible" content="IE=edge">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>LifeWell - Site</title>
//       <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
//       <link rel="stylesheet" href="../assets/css/style.css">

//       <link
//           href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
//           rel="stylesheet">
//   </head>

//   <body>
//   <p class="my-notif">Мои уведомления</p>
//   </div>
// </div>
// </div>
// <div class="col-12">
// <div class="notificationborder">
//   <div class="row">
//     <div class="col-2 col-lg-4">
//       <div class="avatar">
//           <img src="${messageObject.avatar}" alt="">
//       </div>
//     </div>
//     <div class="col-10 col-lg-8">
//       <div class="notificationtext">
//           <div class="notificationtitle">
//               <h6 class="time">${new Date().toLocaleString()}</h6>
//               <h5 class="user">${messageObject.author}</h5>
//           </div>
//           <p>${messageObject.content}</p>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
// </div>
// </div>

// </div>
// </div>
// </section>

// <script src="../assets/js/bootstrap.bundle.min.js"></script>
// </body>

// </html>
//    `);
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
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

const messages = []; // создаем массив для хранения сообщений

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.channel.id === channelID) {
    console.log(
      `New message in ${message.channel.name} from ${message.author.username}: ${message.content}`
    );
    const messageObject = {
      content: message.content,
      author: message.author.username,
      avatar: message.author.avatarURL(),
      //   channel: message.channel.name,
    };
    messages.push(messageObject); // добавляем новое сообщение в массив
  }
});

client.login(
  "MTA5OTEwMDUzNzk4MDQ1Mjk0NQ.GBn_JH.IvXtIdeqqUxvB8J7vfh-eJx3ppidu5HasIYlRc"
);

app.get("/", (req, res) => {
  res.send(`


  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LifeWell - Site</title>
      <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
      <link rel="stylesheet" href="../assets/css/style.css">
  
      <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet">
  </head>
  
  <body>
      <nav class="navbar navbar-expand-lg">
          <div class="container">
              <a class="navbar-brand" href="account.html"><img src="/assets/img/logo.png" width="80px" alt=""></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="justify-content-center collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="justify-content-center navbar-nav">
                      <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="#">О проекте</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#">Контакты</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link">Discord</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  
      <section class="main-account">
          <div class="container">
              <div class="row ll">
                  <div class="col-12 col-lg-4">
                      <div class="acc-nav">
                          <ul class="ul-acc">
                              <a class="a-acc" href="../account"><li class="li-acc">Мой аккаунт</li></a>
                              <a class="a-acc" href="../notifications"><li class="li-acc">Мои уведомления</li></a>
                              <a class="a-acc" href="../transation"><li class="li-acc">Мои транкзации</li></a>
                          </ul>
                      </div>
                  </div>
  
                  <div class="col-12 col-lg-8">
                      <div class="row">
                        <div class="col-12">
                          <div class="notification-main">
                              <div class="notif-name">
                                  <p class="my-notif">Мои уведомления</p>
                              </div>
                          </div>
                        </div>
                        ${messages
                          .map(
                            (messageObject) => `
                        <div class="col-12 col-lg-4">
                          <div class="notification__border">
                              <div class="row">
                                <div class="col-2 col-lg-4">
                                  <div class="avatar">
                                      <img src="${messageObject.avatar}" alt="">
                                  </div>
                                </div>
                                <div class="col-10 col-lg-8">
                                  <div class="notification__text">
                                      <div class="notification__title">
                                          <h6 class="time">${new Date().toLocaleString()}</h6>
                                          <h5 class="user">${
                                            messageObject.author
                                          }</h5>
                                      </div>
                                      <p>${messageObject.content}</p>
                                  </div>
                                </div>
                              </div>

                        </div>
                        `
                          )
                          .join("")}
                      </div>
                  </div>
  
              </div>
          </div>
      </section>
  
      <script src="../assets/js/bootstrap.bundle.min.js"></script>
  </body>
  
  </html>
`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
