"use strict";

var _discord = require("discord.js");

var _discord2 = _interopRequireDefault(_discord);

require("./libs/dotenv");

require("./libs/postgres");

var _commands = require("./commands");

var _queries = require("./queries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create an instance of Discord client

// Module imports


// Side effect imports
const client = new _discord2.default.Client();
// Prefix that every command should start with
/**
 * Main entry point of our app. Sets up the client and
 * lays out the different commands users
 */
const prefix = "!";

// Bot will only start reacting to information once ready is emitted
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Create an event listener for messages
client.on("message", msg => {
  const { content, author, channel, member } = msg;

  // Ignore messages from the bot
  if (author.bot) return;

  //Ignore any message that does not start with prefix
  if (!content.startsWith(prefix)) return;

  const args = content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "ping":
      channel.send("pong!");
      break;
    case "knowme":
      (0, _commands.knowme)(msg);
      break;
    case "repopulate":
      if (member.roles.has("363153451833753600")) (0, _commands.repopulate)(msg);
      break;
    case "marshmallow":
    case "mm":
      (0, _commands.marshmallow)(msg);
      break;
    case "mine":
      (0, _commands.mine)(msg);
      break;
    case "help":
    case "h":
      if (args.length === 0) (0, _commands.help)(msg);else if (args[0].match(new RegExp(`^${prefix}?\\w+`, "g"))) (0, _commands.helpSpecific)(msg, args[0].slice(prefix.length).trim());else (0, _commands.helpSpecific)(msg, "");
      break;
    case "emoji":
      (0, _commands.emoji)(msg);
      break;
    default:
      break;
  }
});

// When new people join, add them to our database
client.on("guildMemberAdd", member => {
  (0, _queries.insertAccount)({
    discordId: member.id,
    errorHandler: err => console.log(err)
  });
});

client.login(process.env.BOT_TOKEN);