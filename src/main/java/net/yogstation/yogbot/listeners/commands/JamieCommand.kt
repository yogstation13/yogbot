package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.listeners.commands.ImageCommand
import org.springframework.stereotype.Component
import java.util.*

@Component
class JamieCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {
	override val images = listOf(
			"https://media.discordapp.net/attachments/710261756710354985/779346180840489000/Capture_2020-11-20-09-03-17.png",
			"https://media.discordapp.net/attachments/423761888309018624/785996169780133908/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785994698388013076/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785993787398422548/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785992140118294548/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785991477406203914/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785991187504431154/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785990992750706688/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785990717989978172/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785990361129943040/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785990219483840552/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785989933931561011/unknown.png",
			"https://media.discordapp.net/attachments/205784753352343552/767094905272139886/Capture_2020-10-17-14-41-13.png",
			"https://media.discordapp.net/attachments/423761888309018624/785989660517466172/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785989518687469648/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785989222565150740/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785989031417741332/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785988786634752000/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785988630522101790/unknown.png",
			"https://cdn.discordapp.com/attachments/423761888309018624/785988488230862848/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785988309636612106/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785988037360222238/unknown.png",
			"https://media.discordapp.net/attachments/205784753352343552/776583088704323636/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785987576266752030/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785986925084672040/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785986613921841152/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785986486754607124/unknown.png",
			"https://media.discordapp.net/attachments/423761888309018624/785986321918984242/unknown.png",
			"https://cdn.discordapp.com/attachments/423761888309018624/785986121896427530/unknown.png",
			"https://cdn.discordapp.com/attachments/205784753352343552/785862579129810955/unknown.png",
			"https://cdn.discordapp.com/attachments/347045440958627841/763421934431895632/Capture_2020-10-07-11-25-27.png",
			"https://cdn.discordapp.com/attachments/710261756710354985/767044874595598356/Capture_2020-10-17-11-15-38.png",
			"https://cdn.discordapp.com/attachments/205784753352343552/768561221300387870/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/768887587988832307/unknown.png",
			"https://cdn.discordapp.com/attachments/860107308574965760/860107324009742336/unknown-99.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/772700667969011712/unknown.png",
			"https://cdn.discordapp.com/attachments/734475284446707753/839856694791241797/image0.png",  //Update your mother
			"https://cdn.discordapp.com/attachments/734475284446707753/798848216237473822/Screenshot_20210113-013643.jpg",  //Jamie is not a good coder
			"https://cdn.discordapp.com/attachments/423761888309018624/878609957908541460/Backpeddle.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878609965277909002/adamsuckit.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878609974329221150/awake.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610044046946375/Spriters.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610058022387782/Wall.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610072459177984/workingwell.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610087118266368/bibby.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610099130753064/biglog.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610142302707712/downer.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610154889805864/fixgame.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610169653784586/gunbad.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610183486586951/gunhere.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610197180977162/lag.PNG",
			"https://cdn.discordapp.com/attachments/423761888309018624/878610208216199228/Shares.PNG"
		)
	override val title = "Jamie Image"
	override val description = "Dumb stuff from Jamie."
	override val name = "jamie"
}
