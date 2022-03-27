package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.listeners.commands.ImageCommand
import org.springframework.stereotype.Component
import java.util.*

@Component
class CoderCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {

	override val images = listOf(
			"https://cdn.discordapp.com/attachments/347045440958627841/766286538107519006/unknown.png",
			"https://cdn.discordapp.com/attachments/347045440958627841/766286291175735356/unknown.png",
			"https://cdn.discordapp.com/attachments/347045440958627841/766077319679967282/unknown.png",
			"https://cdn.discordapp.com/attachments/205784753352343552/768234096244817980/unknown.png",
			"https://cdn.discordapp.com/attachments/347045440958627841/763421934431895632/Capture_2020-10-07-11-25-27.png",
			"https://cdn.discordapp.com/attachments/710261756710354985/767046065336614932/Capture_2020-10-17-11-26-26.png",
			"https://cdn.discordapp.com/attachments/710261756710354985/767045106884018196/unknown.png",
			"https://cdn.discordapp.com/attachments/710261756710354985/767044874595598356/Capture_2020-10-17-11-15-38.png",
			"https://cdn.discordapp.com/attachments/205784753352343552/768561221300387870/unknown.png",
			"https://cdn.discordapp.com/attachments/134720091576205312/768629149862199306/unknown.png",
			"https://cdn.discordapp.com/attachments/134720091576205312/768629387267801088/unknown.png",
			"https://cdn.discordapp.com/attachments/134720091576205312/768629825392607242/unknown.png",
			"https://cdn.discordapp.com/attachments/854412556130451467/858764560436428811/121809872-7a893c00-cc56-11eb-8337-761a58dab4f3.png",
			"https://cdn.discordapp.com/attachments/134720091576205312/858767535196340254/unknown.png",
			"https://cdn.discordapp.com/attachments/205784753352343552/776555183873851392/unknown.png",
			"https://cdn.discordapp.com/attachments/205784753352343552/772535323614773268/unknown.png",  //November update
			"https://cdn.discordapp.com/attachments/734475284446707753/767680432945758208/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/768851782780059728/image0.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/768869609347612772/20201022_121231.jpg",
			"https://cdn.discordapp.com/attachments/734475284446707753/768887587988832307/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/770659824135831562/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/772700667969011712/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/774083235847077929/image0.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/776741617053859850/unknown.png",
			"https://i.gyazo.com/566dd8a79f7aa374d7b248823d50a28a.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/734482071103471676/dreamseeker_2020-01-27_21-36-54.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/734508169178644500/ss13_alexkaraheal.PNG",
			"https://cdn.discordapp.com/attachments/734475284446707753/734531895299276830/halfadoor.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/734860649758195782/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/735041980182036500/discordtheosbeerebase.PNG",
			"https://cdn.discordapp.com/attachments/734475284446707753/748792022017507399/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/760594369312718879/unknown.png",
			"https://i.gyazo.com/e769a11cad7bbd112de2db9c1994ff77.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/734476179167510578/dreamseeker_2020-06-25_16-42-07.png",
			"https://cdn.discordapp.com/attachments/134720091576205312/780843381941075968/unknown.png",  // FileTypes.jpg
			"https://cdn.discordapp.com/attachments/734475284446707753/772916637190979664/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/838072123078606878/Screenshot_20210501-111707_Discord.jpg",  //Turn into a propeller
			"https://cdn.discordapp.com/attachments/734475284446707753/825984684478431292/Discord_2021-03-28_21-46-04.png",  //Theos Emergency Powers
			"https://cdn.discordapp.com/attachments/734475284446707753/812772550262128641/image0.png",  //This change is not good
			"https://cdn.discordapp.com/attachments/734475284446707753/808703322839449600/chart.png",  //Features Theos has Ruined over time
			"https://cdn.discordapp.com/attachments/734475284446707753/801196796449128488/unknown.png",  //Give me Colton
			"https://i.imgur.com/NbXtu0r.png",  //Banning Alexkar
			"https://cdn.discordapp.com/attachments/734475284446707753/797049348931321856/20210108_052217.jpg",  //Theos replacing mentors with code
			"https://cdn.discordapp.com/attachments/734475284446707753/796666986067001384/Stonks.png",  //Stonk shitcode
			"https://cdn.discordapp.com/attachments/734475284446707753/789327485426335815/unknown.png",  //Departmental Card (FUCK)
			"https://cdn.discordapp.com/attachments/734475284446707753/787107008113016902/mspaint_2020-12-11_18-44-32.png",  //Board of Directors
			"https://cdn.discordapp.com/attachments/734475284446707753/785944639030165604/unknown.png",  //Bood cannot spell
			"https://cdn.discordapp.com/attachments/734475284446707753/873577187503112232/2c7b80bff66cf24ca5ddedd932d2493b.png",  //Fix monkies shitting out blood
			"https://cdn.discordapp.com/attachments/734475284446707753/876846977810325584/unknown.png",  //Why are all our coders stupid?
			"https://cdn.discordapp.com/attachments/734475284446707753/878472565406961684/Screenshot_20210820-225450_Discord.jpg",  //Roasting stick will remain broken
			"https://cdn.discordapp.com/attachments/734475284446707753/903265372323594290/unknown.png",  //You did it!
			"https://cdn.discordapp.com/attachments/734475284446707753/901168419574022164/unknown.png",  //Theos wanna merge a fucking pr
			"https://cdn.discordapp.com/attachments/734475284446707753/883378332157227008/image0.png",  //PLEASE merge my PR
			"https://cdn.discordapp.com/attachments/734475284446707753/921906106752704592/firefox_rx9in6oPrZ.png",  //Files Changed 145
			"https://cdn.discordapp.com/attachments/734475284446707753/920021959247560744/unknown.png",  //Force italian accent
			"https://cdn.discordapp.com/attachments/734475284446707753/920021959247560744/unknown.png" //Reverts and alternatives
		)

	override val title = "Coder Image"
	override val name = "coder"
	override val description = "dumb stuff the dev team says"
}
