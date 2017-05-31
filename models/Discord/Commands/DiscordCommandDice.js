const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandDice extends DiscordCommand {

    constructor(subsystem) {
        super("Dice", "Rolls a dice", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "1! \n https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Dice-1.svg/557px-Dice-1.svg.png",
          "2! \n https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Dice-2.svg/557px-Dice-2.svg.png",
          "3! \n https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Dice-3.svg/557px-Dice-3.svg.png",
          "4! \n https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Dice-4.svg/557px-Dice-4.svg.png",
          "5! \n https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Dice-5.svg/557px-Dice-5.svg.png",
          "6! \n https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Dice-6a.svg/557px-Dice-6a.svg.png"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        message.reply(response);
    }

}

module.exports = DiscordCommandDice;