const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandShite extends DiscordCommand {

  constructor(subsystem) {
    super("shite", "random shite", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"<https://www.youtube.com/watch?v=GeslumVdaDI>",
    "<https://www.youtube.com/watch?v=B8Zx_vCIapU>",
    "<https://www.youtube.com/watch?v=dgha9S39Y6M>",
    "<https://www.youtube.com/watch?v=VfCYZ3pks48>",
    "<https://www.youtube.com/watch?v=xC03hmS1Brk>",
    "<https://www.youtube.com/watch?v=o8-jQTJnXKY>",
    "<https://www.youtube.com/watch?v=bFoKhknf_wA>",
    "<https://www.youtube.com/watch?v=ypCfdrARoLQ>",
    "<https://www.youtube.com/watch?v=CNPKXfb3rws>",
    "<https://www.youtube.com/watch?v=NP1I4r-e760>",
    "<https://www.youtube.com/watch?v=HO0uIlP9C_c>",
    "<https://www.youtube.com/watch?v=XDXrP9HET2A>",
    "<https://www.youtube.com/watch?v=kzHIs7j1CCs>",
    "<https://www.youtube.com/watch?v=moNRC9mgmjg>",
    "<https://www.youtube.com/watch?v=Acjf66Qdj2U>",
    "<https://www.youtube.com/watch?v=G7RgN9ijwE4>",
    "<https://www.youtube.com/watch?v=yBLdQ1a4-JI>",
    "<https://www.youtube.com/watch?v=LZgeIReY04c>",
    "<https://www.youtube.com/watch?v=7eKv4BEujFU>",
    "<https://www.youtube.com/watch?v=7T1OHha9agg>",
    "<https://www.youtube.com/watch?v=4F0Mer4kDDY>",
    "<https://www.youtube.com/watch?v=3-rfBsWmo0M>",
    "<https://www.youtube.com/watch?v=tr3RUHuS_Lk>",
    "<https://www.youtube.com/watch?v=0tdyU_gW6WE>",
    "<https://www.youtube.com/watch?v=5vRlJrkxsqo>",
    "<https://www.youtube.com/watch?v=P5RjzPSX-fI>",
    "<https://www.youtube.com/watch?v=l3yn0Xr0U-I>"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandShite;
