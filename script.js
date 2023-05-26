// const express = require("express");
// const unirest = require("unirest");

// const app = express();

// app.use("/assets", express.static("assets"));
// app.set("view engine", "ejs");

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
//         unirest
//           .get("https://discordapp.com/api/users/@me")
//           .headers({
//             Authorization: `${data.body.token_type} ${data.body.access_token}`,
//           });

//           console.log(data.body);

//         response.redirect("/account");
//       })
//       .catch((err) => {
//         response.redirect("/index");
//       });
//   } else {
//     response.render("index");
//   }
// });

// app.get("/account", (request, response) => {
//   response.render("account");
// });

// app.get("/notifications", (request, response) => {
//   response.render("notifications");
// });

// app.get("/transation", (request, response) => {
//   response.render("transation");
// });

// app.listen(5000, () => {
//   console.log("server load in 5000 port");
// });

