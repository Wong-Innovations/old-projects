// Basic dependancy loading
const Discord = require('discord.js');
var Sentiment = require('sentiment');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync('./config.json')).token;

const client = new Discord.Client();
var sentiment = new Sentiment();
var message_data, user_data;

client.on('ready', () => {
    console.log("Chappie online.");

    // Makes Chappie look creapy xD
    client.user.setActivity("your every move.", {type:"WATCHING"});

    // Opens stored data
    message_data = JSON.parse(fs.readFileSync('./data/messages.json'));
    user_data = JSON.parse(fs.readFileSync('./data/users.json'))
});

client.on('message', message => {
    // Message logging
    let mood = backgroundProc(message);

    // Custom Commands
    if (message.content.includes("!shoot")) Chappie.shoot(message);
    if (message.content.includes("!BIGSAD")) Chappie.sad(message.channel);
});

client.login(token);

// All functions pertaining to Chappie
class Chappie{

    static shoot(message) {
        message.mentions.users.forEach( (user) => {
            if (user == "<@550937348679139338>"){
                message.channel.send(`${user} BANG! Ow, that hurt.`);
                return;
            } else {
                message.channel.send(`${user} BANG! You're dead.`);
            }
        });
    }

    static sad(channel) {
        channel.send("Server Sad Bois: ");
        for (user in user_data) {
            if ( user_data[user].sentiment < 0 ) {
                channel.send("<@" + user_data[user].id + ">");
            }
        }
    }

}

// Other functions pertaining to basic logging, et cetra
function backgroundProc(message) {

    // Ensures the message origin is human
    if (message.author.bot !== true) {

        // Derives comparative sent val from message
        let sentobj = sentiment.analyze(message.content);
        let mood = sentobj.comparative;

        // Serializes message data for saving
        message_data.push({
            "content": message.content,
            "sender": message.author.username,
            "sentiment": mood
        });

        // Updates the user's activity and overall sentiment
        updateUser(message.author, mood);

        // Saves data to files
        fs.writeFile('./data/messages.json', JSON.stringify(message_data, null, 2), (err) => {
            if (err) throw err;
        });
        fs.writeFile('./data/users.json', JSON.stringify(user_data, null, 2), (err) => {
            if (err) throw err;
        });

        // Returns comparative sentiment val
        return mood;
    }
}

function updateUser(userObject, mood) {

    // Looks for the specified user in user_data
    let userIndex = null;
    for (user in user_data) {
        if ( user_data[user].name == userObject.username ) {
            userIndex = user;
        }
    }

    // If user found the sentiment and activity of the user is updated
    if (userIndex) {
        user_data[userIndex].sentiment = (mood + user_data[userIndex].sentiment) / ++user_data[userIndex].activity;
    }
    // Otherwise the user is added to user_data (to be saved in backgroundProc)
    else {
        user_data.push({
            "name": userObject.username,
            "id": userObject.id,
            "sentiment": mood,
            "activity": 1
        });
    }
}
