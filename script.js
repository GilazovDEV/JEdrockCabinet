// const express = require("express");
// const unirest = require("unirest");
// const session = require("express-session");

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
//     // Пользователь не авторизован, перенаправляем на страницу авторизации
//     response.redirect("/index");
//   }
// }

// app.get("/notifications", (request, response) => {
//   response.render("notifications");
// });

// app.get("/transation", (request, response) => {
//   response.render("transation");
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });


const express = require("express");
const unirest = require("unirest");
const session = require("express-session");

const app = express();

app.use("/assets", express.static("assets"));
app.set("view engine", "ejs");

// Добавляем настройки сессии
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

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
        // Сохраняем информацию о пользователе в сессии
        request.session.tokenType = data.body.token_type;
        request.session.accessToken = data.body.access_token;
        request.session.save();

        // Редирект на страницу аккаунта
        response.redirect("/account");
      })
      .catch((err) => {
        console.log(err);
        response.redirect("/index");
      });
  } else {
    response.render("index");
  }
});

// Добавляем проверку авторизации перед отображением защищенных страниц
app.get("/account", isAuthenticated, (request, response) => {
  // Достаем информацию о пользователе из сессии
  const tokenType = request.session.tokenType;
  const accessToken = request.session.accessToken;

  unirest
    .get("https://discordapp.com/api/users/@me")
    .headers({
      Authorization: `${tokenType} ${accessToken}`,
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

// Middleware для проверки авторизации
function isAuthenticated(request, response, next) {
  if (
    request.session &&
    request.session.tokenType &&
    request.session.accessToken
  ) {
    // Пользователь авторизован, продолжаем выполнение следующего обработчика
    return next();
  } else {
    // Пользователь не авторизован, перенаправляем на страницу ошибки
    response.redirect("/error");
  }
}

app.get("/error", (request, response) => {
  response.render("error");
});

app.get("/logout", (request, response) => {
  // Удаляем информацию о пользователе из сессии
  request.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    // Редирект на страницу ошибки или на главную страницу
    response.redirect("/error");
  });
});

// Добавьте обработчики для остальных маршрутов
app.get("/notifications", isAuthenticated, (request, response) => {
  response.render("notifications");
});

app.get("/transation", isAuthenticated, (request, response) => {
  response.render("transation");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

