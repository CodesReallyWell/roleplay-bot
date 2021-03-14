const Discord = require('discord.js');

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
client.login('ODE2Nzg4MDE0ODIyNTg4NDM2.YEADHQ.uuJVlxSy0MqkVtnLwSJjuFi2x7k');