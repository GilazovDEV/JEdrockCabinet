const express = require("express");
const unirest = require("unirest");

const app = express();

app.use("/assets", express.static("assets"));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
  if (request.query.code) {
    let clientID = "1095721219275358330";
    let redirect_uri = "http://127.0.05000/";
    let clientSecret = "B1qtEZD2zLSUEpju5tsepwnroPkKiQh6";
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
        unirest
          .get("https://discordapp.com/api/users/@me")
          .headers({
            Authorization: `${data.body.token_type} ${data.body.access_token}`,
          });

          console.log(data.body);

        response.redirect("/main");
      })
      .catch((err) => {
        response.redirect("/index");
      });
  } else {
    response.render("index");
  }
});

app.get("/main", (request, response) => {
  response.render("main");
});

app.listen(5000, () => {
  console.log("server load in 5000 port");
});
