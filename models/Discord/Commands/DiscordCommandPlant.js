const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandPlant extends DiscordCommand {

    constructor(subsystem) {
        super("plant", "Pictures of yogstaion plants", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
		"https://cdn.discordapp.com/attachments/263805372408528897/742079730106368000/1NrOEW7_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079731968639077/2qGZTv4_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079733734309999/43UVmmB_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079735328145488/56Z5mbR_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079736930631780/A8jxeXY_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079738096386118/bgxsKVL_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079739543683142/bTPliFC_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079740604710962/DgBMz7y_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079741431119942/GhefcYv_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079748699848825/IGuabqD_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079749873991721/INlMEjS_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079751459569786/Mtab6P3_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079751962755142/MYWdD1V_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079752814461008/oJDMNQZ_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079753829482556/owrupo3_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079754676469810/pLhAQXb_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079755695947876/ptsqkPD_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079757797294160/RTm7Yam_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079758141227062/rxrDvog_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079795877118012/VU4UM8v_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079798288973916/VWv9YUi_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079800352702604/w2RB2H5_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079802780942356/W640bz3_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079804471377920/Wrd418S_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079806404952094/XAU9lhQ_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079807575031851/xsutEKT_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079808900694056/yI5LeLj_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079810280357938/YLDzGGt_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742079811681386617/yT9kxmL_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742080017223123014/zdx2iDK_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742080146852282429/SgcnaOd_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742080157686169660/ts4xi8p_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742080234416898198/uCQh71g_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742080236996526202/V3wJuuF_14x.png",
		"https://cdn.discordapp.com/attachments/263805372408528897/742085947813789696/HJnX2Pt_14x.png"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(response);
    }

}

module.exports = DiscordCommandPlant;
