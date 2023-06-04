const express = require('express');
const ejs = require('ejs');

const { Client,GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.MessageContent,GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildIntegrations]})

// Конфигурация вашего Discord бота
const botToken = 'MTA5OTEwMDUzNzk4MDQ1Mjk0NQ.Go7jPE.w3qs2qqUAToKxroFlhbl69y2XTZEVK7MuT8Pjs';
const serverId = '761607102254678026';
const channelId = '1111023534030995557';

// Создайте экземпляр Express приложения
const app = express();
app.use("/assets", express.static("assets"));

app.set('view engine', 'ejs');

// Маршрут для отображения страницы уведомлений
app.get('/notifications', async (req, res) => {
    try {
      // Получение коллекции сообщений с сервера Discord
      const guild = client.guilds.cache.get(serverId);
      const channel = guild.channels.cache.get(channelId);
      const messages = await channel.messages.fetch();
  
      // Преобразование коллекции сообщений в массив
// Преобразование коллекции сообщений в массив и изменение порядка
const messagesArray = Array.from(messages.values()).reverse();


      // Отображение страницы с уведомлениями
      res.render('notifications', { messages: messagesArray });
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
      res.status(500).send('Ошибка при получении сообщений');
    }
  });
  
  
// Подключение к серверу Discord
client.login(botToken);

// Ожидание события готовности клиента Discord
client.once('ready', () => {
  console.log('Bot is ready!');
  
  // Запуск сервера Express
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
