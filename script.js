const express = require("express");
const unirest = require("unirest");
const session = require("express-session");
const fs = require("fs");
const crypto = require("crypto");
const https = require("https");

const generateLink = (id) => {
  const secretKey = "q5KVLLtqAQfvJwHykJFJPW-0bZ_im3hU";
  const sum = 75;
  const hashStr = `${id}{up}Проходка JEdrock{up}${sum}{up}${secretKey}`;
  const sign = crypto.createHash("sha256").update(hashStr).digest("hex");
  return { sign };
};
const options = {
  key: fs.readFileSync('./cert/privkey1.pem'),
  cert: fs.readFileSync('./cert/fullchain1.pem')
};
console.log(generateLink(745567478573));

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
  "MTA5OTEwMDUzNzk4MDQ1Mjk0NQ.GI73DO.R-qqULASu_El32yG-h-dkRJXqUU7pYIn8Ru5Sg";
const serverId = "761607102254678026";
const channelId = "1111023534030995557";

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

// // Middleware для проверки авторизации
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

    // Проверяем наличие пользователя в базе данных и его статус "paid"
    const userExistsAndPaid = checkUser(username, clientID);

    if (userExistsAndPaid) {
      return next();
    } else {
      // Пользователь не найден в базе данных или его статус "paid" равен false,
      // перенаправляем на страницу ошибки
      response.redirect("/erruser");
    }
  } else {
    // Пользователь не авторизован, перенаправляем на страницу ошибки
    response.redirect("/erruser");
  }
}

// Функция для проверки наличия пользователя в базе данных
function checkUser(username, clientID) {
  const database = require("./db.json");
  if (clientID in database) {
    const user = database[clientID];
    if (user.paid === true) {
      return user;
    }
  }
  return null;
}


app.get("/", (request, response) => {
  if (request.query.code) {
    let clientID = "1120769037585092739";
    let redirect_uri = "http://127.0.0.1:5000/";
    let clientSecret = "2H8ATuekPGPXBUVTQh55lwW7C8bm85VY";
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
      const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.body.id}/${userData.body.avatar}.png`;
      const bannerUrl = userData.body.banner
        ? `https://cdn.discordapp.com/banners/${userData.body.id}/${userData.body.banner}.png`
        : null;
      const username = userData.body.username;
      const discriminator = userData.body.discriminator;

      // Получение данных пользователя из базы данных
      const user = checkUser(username, request.session.clientID);
      const nickname = user ? user.nickname : "Unknown";
      const phone = user ? user.phone : "Unknown";
      const email = user ? user.email : "Unknown";
      const id = user ? user.id : "Unknown";
      const tokens = user ? user.tokens : "Unknown";

      response.render("account", {
        avatarUrl,
        bannerUrl,
        username,
        discriminator,
        nickname,
        phone, // Передача номера телефона на страницу
        email, // Передача электронной почты на страницу
        id, // Передача идентификатора пользователя на страницу
        tokens, //Передача баланса игрока
      });
    })
    .catch((err) => {
      console.log(err);
      response.redirect("/index");
    });
});

app.get("/index", (request, response) => {
  response.render("index");
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
    const originalPosts = messages.filter((message) => !message.reference);

    // Преобразование коллекции исходных постов в массив
    const originalPostsArray = Array.from(originalPosts.values()).reverse();

    // Получение информации о ролях
    const roles = Array.from(guild.roles.cache.values());

    // Получение информации о каналах
    const channels = Array.from(guild.channels.cache.values());

    // Получение информации об эмодзи
    const emojis = Array.from(guild.emojis.cache.values());

    res.render("notifications", {
      messages: originalPostsArray,
      roles: roles,
      channels: channels,
      emojis: emojis
    });
  } catch (error) {
    console.error("Ошибка при получении сообщений:", error);
    res.status(500).send("Ошибка при получении сообщений");
  }
});

app.get("/transation", isAuthenticated, (request, response) => {
  response.render("transation");
});

app.get("/erruser", (request, response) => {
  if (request.session.clientID) {
    const discordUserID = request.session.clientID;
    const { sign } = generateLink(745567478573);
    response.render("erruser", { discordUserID, sign });
  } else {
    response.redirect("/error");
  }
});

app.get("/oferta", (request, response) => {
  response.render("oferta");
});

app.get("/politconf", (request, response) => {
  response.render("politconf");
});

client.login(botToken);

client.once("ready", () => {
  console.log("Bot is ready!");

  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });

  // https.createServer(options, app).listen(443, () => {
  //   console.log(`Сервер запущен на порту ${443} https://pay.uniworlds.fun`);
  // });
});
