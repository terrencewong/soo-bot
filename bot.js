// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

function randomInt(max) {
   return Math.floor(Math.random() * (max + 1));
}


var options = [];

client.on('message', (msg) => {
  if ((msg.content === 'soo') || (msg.content === '!roll')) {
    if(options.length != 0) {
      msg.channel.send(options[randomInt(options.length-1)]);
    }else{
      msg.channel.send('No games to choose from');
    }
  }else if (msg.content.startsWith('!add')) {
    options.push(msg.content.slice(5).trim());
  }else if (msg.content.startsWith('!rm')) {
    //do nothing
  }else if (msg.content === '!list'){
    if(options.length != 0){
      for (var i = 0; i < options.length; i++){
        msg.channel.send(options[i])
      }
    }else{
      msg.channel.send('Nothing to list');
    }
  }else if (msg.content === '!help'){
    msg.channel.send('Commands:\n!list - list all options\n!add - add game\n!roll - roll');
  }
});


client.on('ready', () => {
   console.log('I am ready!');
});

client.login(process.env.TOKEN);

// Web app (Express + EJS)
const http = require('http');
const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});

// pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
 http.get('http://soo-bot.herokuapp.com');
}, 900000);
