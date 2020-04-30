"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emoji = exports.helpSpecific = exports.help = exports.mine = exports.marshmallow = exports.repopulate = exports.knowme = undefined;

var _queries = require("./queries");

var _utils = require("./libs/utils.js");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Contains the logic of commands which the users will
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * send out
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


const commandsList = [{
  names: ["help", "h"],
  role: "@everyone",
  usage: ["[!h|!help]", "[!h|!help] CommandName (for example `!h !marshmallow`)"],
  description: "Either shows a help for a single command, or DMs you a help link if no parameters are specified."
}, {
  names: ["mine"],
  role: "@everyone",
  usage: ["!mine"],
  description: "Shows you how many marshmallows you have"
}, {
  names: ["marshmallow", "mm"],
  role: "@everyone",
  usage: ["[!mm|!marshmallow] @someone"],
  description: "Gives someone a marshmallow for being helpful (ex: `!marshmallow @someone`)"
}, {
  names: ["ping"],
  role: "@everyone",
  usage: ["!ping"],
  description: "Responds with `pong!`"
}, {
  names: ["repopulate"],
  role: "FireStarter",
  usage: ["!repopulate"],
  description: "Add every member of the server/guild who isn't in the `accounts` table"
}, {
  names: ["knowme"],
  role: "@everyone",
  usage: ["!knowme"],
  description: "[For testing purposes] Check if you are in our database and adds you if you're not"
}, {
  names: ["emoji"],
  role: "Camper",
  usage: ["!emoji"],
  description: "Adds an emoji to the Discord server"
}];

// Manually triggers insert into database for a user
// Mostly for testing or for users before this bot was made

const knowme = exports.knowme = msg => {
  const callback = data => msg.reply("I have you in my sights now :eyes: ");
  const errorHandler = err => {
    console.log("!knowme : ", err);
    // Duplicate user (we could instead do nothing on conflict)
    // but this is more fun :D
    if (err.code === "23505") {
      msg.reply("I already know you!");
    }
  };

  (0, _queries.insertAccount)({
    discordId: msg.author.id,
    createdAt: msg.member.joinedAt,
    callback,
    errorHandler
  });
};

// Inserts users that don't exist in our db from the discord
// Must be a Firestarter
const repopulate = exports.repopulate = msg => {
  msg.guild.members.array().forEach(member => {
    (0, _queries.insertAccount)({
      discordId: member.id,
      createdAt: member.joinedAt,
      callback: () => {
        console.log(`INSERT ${member.displayName} : SUCCESS`);
      },
      errorHandler: err => {
        console.log(`INSERT ${member.displayName} : FAILED`);
      }
    });
  });
  msg.reply("Repopulated accounts table.");
};

// Give user(s) marshmallows
const marshmallow = exports.marshmallow = msg => {
  // Gets the first user mentioned in the message
  const user = msg.mentions.users.first();

  if (user.id === msg.author.id) {
    msg.reply("lol you can't give yourself marshmallows");
  } else {
    (0, _queries.incrementMarshmallow)({
      discordId: user.id,
      callback: data => {
        const marshmallowEmojis = msg.guild.emojis.filter(emoji => emoji.name.match("mm")).array();
        const randomMarshmallowEmoji = marshmallowEmojis[Math.floor(Math.random() * marshmallowEmojis.length)];

        msg.channel.send(`${user} you have ${data.marshmallows} marshmallows! ${randomMarshmallowEmoji}`);
      },
      errorHandler: err => {
        console.log("!mm", err);
        msg.reply("Unable to give marshmallows :(");
      }
    });
  }
};

// Return the user's total marshmallows
const mine = exports.mine = msg => {
  (0, _queries.getMarshmallows)({
    discordId: msg.author.id,
    callback: data => {
      const marshmallowEmojis = msg.guild.emojis.filter(emoji => emoji.name.match("mm")).array();
      const randomMarshmallowEmoji = marshmallowEmojis[Math.floor(Math.random() * marshmallowEmojis.length)];

      msg.reply(`you have **${data.marshmallows}** ${randomMarshmallowEmoji}`);
    }
  });
};

// Sends a DM with the help embed dialog
const help = exports.help = msg => {

  const description = (0, _utils.removeSpaces)(`You can find a list of commands here:
       https://sirmerr.github.io/camperbot/#/camperbot/commands
       \nFor a specific command help, use \`[!h|!help] CommandName\` (for example \`!h !marshmallow\`)`);

  // Send a private embed message with a blue left border
  msg.author.send({
    embed: {
      color: 0x0000ff,
      description
    }
  });
};

// Send details of a given command
const helpSpecific = exports.helpSpecific = (msg, command) => {
  const { channel } = msg;
  let commandInfo;

  // True if command exists, otherwise returns false
  const commandExists = commandsList.find(el => {
    if (el.names.find(name => command === name)) {
      commandInfo = {
        title: `\`${el.names.join("` | `")}\``,
        description: el.description,
        role: el.role,
        usage: el.usage.join("\n")
      };
      return true;
    }
    return false;
  }) !== undefined;

  if (commandExists) {
    channel.send({
      embed: {
        color: 0x0000ff,
        title: commandInfo.title,
        description: commandInfo.description,
        fields: [{
          name: "Roles",
          value: `\`${commandInfo.role}\``
        }, {
          name: "Usage",
          value: `\`${commandInfo.usage}\``
        }]
      }
    });
  } else {
    channel.send({
      embed: {
        color: 0xff0000,
        description: "I can't find that command. Please check if the command exists [here](https://sirmerr.github.io/camperbot/#/camperbot/commands)"
      }
    });
  }
};

// ex:
// !emoji <name> <url>
const emoji = exports.emoji = (() => {
  var _ref = _asyncToGenerator(function* (msg) {
    const { content, channel, guild } = msg;
    const regex = /!emoji\s(.*)\s(.*)/;

    try {
      const { 1: name, 2: url } = regex.exec(content);
      const newEmoji = yield guild.createEmoji(url, name);
      channel.send({
        embed: {
          color: 0x0000ff,
          description: `\`${newEmoji.name}\` ${newEmoji} has been added!`
        }
      });
    } catch (e) {
      channel.send({
        embed: {
          color: 0xff0000,
          description: "Your emoji could not be added! THAT'S SO SAD! Make sure you format the command as `!emoji <name> <url>`."
        }
      });
    }
  });

  return function emoji(_x) {
    return _ref.apply(this, arguments);
  };
})();