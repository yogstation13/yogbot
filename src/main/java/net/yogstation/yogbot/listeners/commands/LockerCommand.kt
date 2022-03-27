package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import org.springframework.stereotype.Component
import java.util.*

@Component
class LockerCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {
	override val images: List<String> = listOf(
		"https://cdn.discordapp.com/attachments/423761888309018624/769311029787754507/Discord_8RNuBiVx7x.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311056413589554/Discord_ayzwP52Pkc.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311073135886427/Discord_dGhhAhf4nM.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311097232556112/Discord_io1TPKeUTN.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311126001287258/Discord_ln3gq5RlxZ.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311151623241748/Discord_LvKX2f0gjJ.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311170799599626/Discord_UB7qinDvYH.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311198504026114/Discord_xnJfm2y66D.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311232712245258/dreamseeker_4DOhZ8arMi.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311245845004338/dreamseeker_8Ssvwaq3c2.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311264110936094/dreamseeker_70jdDjQdxI.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311300265836595/dreamseeker_A8QupnJnHu.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311331412344893/dreamseeker_A8s8hBuHVQ.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311363842572328/dreamseeker_bWYM2AWoq6.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311414438985748/dreamseeker_Dd4XkkTlhi.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311488484704266/dreamseeker_eIPfAAPYGH.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311554595979315/dreamseeker_eP9Am6qQpS.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311593212542996/dreamseeker_G8snnROgix.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311634782552085/dreamseeker_JJYDIM0uqN.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311653501337620/dreamseeker_jQ5kmtBtMA.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311721784475648/dreamseeker_nlC0iTMbf1.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311746019033108/dreamseeker_rTypNt5AWy.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311908901552188/dreamseeker_Sy1txoqdGR.png",
		"https://cdn.discordapp.com/attachments/423761888309018624/769311935661080576/dreamseeker_W9FpTGaRsL.png",
		"https://cdn.discordapp.com/attachments/134720091576205312/866620013149421598/dankparty.png",
		"https://cdn.discordapp.com/attachments/134720091576205312/866620396374720512/RLBB.png",
		"https://cdn.discordapp.com/attachments/870897234575786076/870898388021964820/The_Squad.png",  //November Update
		"https://cdn.discordapp.com/attachments/734475284446707753/770400751175467028/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/774341818488979466/unknown-188.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/776717021999923230/base1.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/776717143441276938/base2.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/776717349524602880/base5.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/769004963753361458/unknown.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/735289620207501342/better_chamber.PNG",
		"https://cdn.discordapp.com/attachments/734475284446707753/734508634595393536/SS13_yogstation_profile_pic.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/776717640294989835/base11.png",
		"https://cdn.discordapp.com/attachments/734475284446707753/867997803882905690/image0.png",  //Cards Locker
		"https://cdn.discordapp.com/attachments/734475284446707753/871861431144972308/unknown.png",  //Atmos Locker
		"https://cdn.discordapp.com/attachments/698367324637626438/817894098806898748/unknown.png",  //Not a trap
		"https://cdn.discordapp.com/attachments/734475284446707753/796111484719464448/unknown.png",  //Portable Brig
		"https://cdn.discordapp.com/attachments/734475284446707753/926662256836620319/unknown.png",  //Hot Gas
		"https://cdn.discordapp.com/attachments/734475284446707753/924578739663306762/unknown.png",  //Guillotine
		"https://cdn.discordapp.com/attachments/134720091576205312/924547638924296282/bluespacedlocker.png",  //Why are we in space
		"https://cdn.discordapp.com/attachments/734475284446707753/916951974740627486/unknown.png",  //Party locker
		"https://cdn.discordapp.com/attachments/734475284446707753/914622487688523816/Screenshot_2021-11-28_153804.png" //Arcade Locker
	)

	override val title = "Locker Image"
	override val description = "What's in the bluespace locker?"
	override val name = "locker"
}
