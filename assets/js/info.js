var url = "https://api.mcsrvstat.us/bedrock/2/jedrock.me";

fetch(url)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Ошибка при выполнении запроса");
    }
  })
  .then(function (data) {
    if (data.online !== undefined) {
      var playerCount = data.players.online;
      var playerMax = data.players.max;
      var serverVersion = data.version;

      // Вывод информации о игроках и версии сервера на веб-странице
      document.getElementById("playerCount").textContent =
        playerCount + " из " + playerMax;
      document.getElementById("serverVersion").textContent = serverVersion;
    } else {
      // Обработка случая, когда информация недоступна
      document.getElementById("playerCount").textContent =
        "Информация недоступна";
      document.getElementById("serverVersion").textContent =
        "Информация недоступна";
    }
  })
  .catch(function (error) {
    // Обработка ошибки
    console.error(error);
  });

var accordion = document.getElementsByClassName("accordion");
var panel = document.getElementsByClassName("panel");

for (var i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
