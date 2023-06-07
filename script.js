// const express = require("express");
// const unirest = require("unirest");
// const session = require("express-session");

// const { Client,GatewayIntentBits} = require('discord.js');
// const client = new Client({ intents: [GatewayIntentBits.MessageContent,GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildIntegrations]})

// // Конфигурация вашего Discord бота
// const botToken = 'MTA3NTc5MzY5NTkyMTY3NjMzMA.Gz9h2J.JsN7WjyRQ8e1xXv94ZbHGalJMNhRDG9wIjbc_0';
// const serverId = '1064209711068610630';
// const channelId = '1109499754712412182';

// const app = express();

// app.use("/assets", express.static("assets"));
// app.set("view engine", "ejs");

// // Добавляем настройки сессии
// app.use(
//   session({
//     secret: "secret-key",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.get("/", (request, response) => {
//   if (request.query.code) {
//     let clientID = "1095721219275358330";
//     let redirect_uri = "http://127.0.0.1:5000/";
//     let clientSecret = "BoneeleOyQAMYNKxB8QOc0RPPGVP0qIw";
//     let requestPayload = {
//       redirect_uri,
//       client_id: clientID,
//       grant_type: "authorization_code",
//       client_secret: clientSecret,
//       code: request.query.code,
//     };
//     unirest
//       .post("https://discordapp.com/api/oauth2/token")
//       .send(requestPayload)
//       .headers({
//         "Content-Type": "application/x-www-form-urlencoded",
//         "User-Agent": "DiscordBot",
//       })
//       .then((data) => {
//         // Сохраняем информацию о пользователе в сессии
//         request.session.tokenType = data.body.token_type;
//         request.session.accessToken = data.body.access_token;
//         request.session.save();

//         // Редирект на страницу аккаунта
//         response.redirect("/account");
//       })
//       .catch((err) => {
//         console.log(err);
//         response.redirect("/index");
//       });
//   } else {
//     response.render("index");
//   }
// });

// // Добавляем проверку авторизации перед отображением защищенных страниц
// app.get("/account", isAuthenticated, (request, response) => {
//   // Достаем информацию о пользователе из сессии
//   const tokenType = request.session.tokenType;
//   const accessToken = request.session.accessToken;

//   unirest
//     .get("https://discordapp.com/api/users/@me")
//     .headers({
//       Authorization: `${tokenType} ${accessToken}`,
//     })
//     .then((userData) => {
//       console.log(userData.body);
//       const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.body.id}/${userData.body.avatar}.png`;
//       const bannerUrl = userData.body.banner
//         ? `https://cdn.discordapp.com/banners/${userData.body.id}/${userData.body.banner}.png`
//         : null;
//       const username = userData.body.username;
//       const discriminator = userData.body.discriminator;
//       response.render("account", {
//         avatarUrl,
//         bannerUrl,
//         username,
//         discriminator,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       response.redirect("/index");
//     });
// });

// // Middleware для проверки авторизации
// function isAuthenticated(request, response, next) {
//   if (
//     request.session &&
//     request.session.tokenType &&
//     request.session.accessToken
//   ) {
//     // Пользователь авторизован, продолжаем выполнение следующего обработчика
//     return next();
//   } else {
//     // Пользователь не авторизован, перенаправляем на страницу ошибки
//     response.redirect("/error");
//   }
// }

// app.get("/error", (request, response) => {
//   response.render("error");
// });

// app.get("/logout", (request, response) => {
//   // Удаляем информацию о пользователе из сессии
//   request.session.destroy((err) => {
//     if (err) {
//       console.log(err);
//     }
//     // Редирект на страницу ошибки или на главную страницу
//     response.redirect("/error");
//   });
// });

// // Маршрут для отображения страницы уведомлений
// app.get('/notifications', isAuthenticated, async (req, res) => {
//   try {
//     // Получение коллекции сообщений с сервера Discord
//     const guild = client.guilds.cache.get(serverId);
//     const channel = guild.channels.cache.get(channelId);
//     const messages = await channel.messages.fetch();

//     // Преобразование коллекции сообщений в массив
// // Преобразование коллекции сообщений в массив и изменение порядка
// const messagesArray = Array.from(messages.values()).reverse();

//     // Отображение страницы с уведомлениями
//     res.render('notifications', { messages: messagesArray });
//   } catch (error) {
//     console.error('Ошибка при получении сообщений:', error);
//     res.status(500).send('Ошибка при получении сообщений');
//   }
// });

// app.get("/transation", isAuthenticated, (request, response) => {
//   response.render("transation");
// });

// // Подключение к серверу Discord
// client.login(botToken);

// // Ожидание события готовности клиента Discord
// client.once('ready', () => {
// console.log('Bot is ready!');

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });
// });

const express = require("express");
const unirest = require("unirest");
const session = require("express-session");
const fs = require("fs");

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

const botToken =
  "MTA3NTc5MzY5NTkyMTY3NjMzMA.Gz9h2J.JsN7WjyRQ8e1xXv94ZbHGalJMNhRDG9wIjbc_0";
const serverId = "1064209711068610630";
const channelId = "1109499754712412182";

const app = express();

app.use("/assets", express.static("assets"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware для проверки авторизации
function isAuthenticated(request, response, next) {
  if (
    request.session &&
    request.session.tokenType &&
    request.session.accessToken
  ) {
    // Пользователь авторизован, продолжаем выполнение следующего обработчика

    // Проверяем ник и client_id в базе данных JSON
    const username = request.session.username;
    const clientID = request.session.clientID;

    // Проверяем наличие пользователя в базе данных
    const userExists = checkUser(username, clientID);

    if (userExists) {
      return next();
    } else {
      // Пользователь не найден в базе данных, перенаправляем на страницу ошибки
      response.redirect("/erruser");
    }
  } else {
    // Пользователь не авторизован, перенаправляем на страницу ошибки
    response.redirect("/erruser");
  }
}

// Функция для проверки наличия пользователя в базе данных
function checkUser(username, clientID) {
  const database = require("./database.json");
  return database[clientID] === username;
}

app.get("/", (request, response) => {
  if (request.query.code) {
    let clientID = "1095721219275358330";
    let redirect_uri = "http://127.0.0.1:5000/";
    let clientSecret = "BoneeleOyQAMYNKxB8QOc0RPPGVP0qIw";
    let requestPayload = {
      redirect_uri,
      client_id: clientID,
      grant_type: "authorization_code",
      client_secret: clientSecret,
      code: request.query.code,
    };
    unirest
      .post("https://discordapp.com/api/oauth2/token")
      .send(requestPayload)
      .headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "DiscordBot",
      })
      .then((data) => {
        request.session.tokenType = data.body.token_type;
        request.session.accessToken = data.body.access_token;

        unirest
          .get("https://discordapp.com/api/users/@me")
          .headers({
            Authorization: `${data.body.token_type} ${data.body.access_token}`,
          })
          .then((userData) => {
            console.log(userData.body);
            // Сохраняем ник и client_id в сессии
            request.session.username = userData.body.username;
            request.session.clientID = userData.body.id;
            // Сохраняем сессию и перенаправляем на страницу аккаунта
            request.session.save(() => {
              response.redirect("/account");
            });
          })
          .catch((err) => {
            console.log(err);
            response.redirect("/index");
          });
      })
      .catch((err) => {
        console.log(err);
        response.redirect("/index");
      });
  } else {
    response.render("index");
  }
});

app.get("/account", isAuthenticated, (request, response) => {
  const tokenType = request.session.tokenType;
  const accessToken = request.session.accessToken;

  unirest
    .get("https://discordapp.com/api/users/@me")
    .headers({
      Authorization: tokenType + " " + accessToken,
    })
    .then((userData) => {
      console.log(userData.body);
      const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.body.id}/${userData.body.avatar}.png`;
      const bannerUrl = userData.body.banner
        ? `https://cdn.discordapp.com/banners/${userData.body.id}/${userData.body.banner}.png`
        : null;
      const username = userData.body.username;
      const discriminator = userData.body.discriminator;
      response.render("account", {
        avatarUrl,
        bannerUrl,
        username,
        discriminator,
      });
    })
    .catch((err) => {
      console.log(err);
      response.redirect("/index");
    });
});

app.get("/error", (request, response) => {
  response.render("error");
});

app.get("/logout", (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    response.redirect("/error");
  });
});

app.get("/notifications", isAuthenticated, async (req, res) => {
  try {
    const guild = client.guilds.cache.get(serverId);
    const channel = guild.channels.cache.get(channelId);
    const messages = await channel.messages.fetch();
    // Фильтрация исходных постов без ответов
    const originalPosts = messages.filter((message) => !message.reference);

    // Преобразование коллекции исходных постов в массив
    const originalPostsArray = Array.from(originalPosts.values()).reverse();
    // const messagesArray = Array.from(messages.values()).reverse();
    res.render("notifications", { messages: originalPostsArray });
  } catch (error) {
    console.error("Ошибка при получении сообщений:", error);
    res.status(500).send("Ошибка при получении сообщений");
  }
});

app.get("/transation", isAuthenticated, (request, response) => {
  response.render("transation");
});

app.get("/erruser", (request, response) => {
  response.render("erruser");
});

client.login(botToken);

client.once("ready", () => {
  console.log("Bot is ready!");

  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});
