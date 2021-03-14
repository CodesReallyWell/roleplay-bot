// require the discord.js module
const Discord = require('discord.js');

// dotenv stuff
require('dotenv').config({ path: 'roleBot/.env' })
var discordToken = process.env.DISCORD_TOKEN
console.log(discordToken)

// create a new Discord client
const client = new Discord.Client();

const roleClaim = require('./role-claim')

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');

	roleClaim(client)
});

// login to Discord with your app's token
client.login(discordToken);