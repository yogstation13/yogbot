package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import org.springframework.stereotype.Component
import java.util.*

@Component
class WikiCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {
	override val images = listOf(
			"https://cdn.discordapp.com/attachments/134720091576205312/734963600321675355/silencementor.png",  //Silence Mentor
			"https://cdn.discordapp.com/attachments/607402553143197696/734870404208001164/unknown.png",  //brilliantly inspired and astoundingly stupid
			"https://cdn.discordapp.com/attachments/607402553143197696/734870837823406110/unknown.png",  //Guide to food#Cheese
			"https://cdn.discordapp.com/attachments/607402553143197696/734870208241729577/unknown.png",  //Hit by a tomato and 5 simultaneous overdoses
			"https://cdn.discordapp.com/attachments/607402553143197696/734870751122817064/unknown.png",  //She doesn't bring me my cheese
			"https://cdn.discordapp.com/attachments/607402553143197696/734869376850985000/wikibanner.png",  //Wiki banner
			"https://cdn.discordapp.com/attachments/607402553143197696/734851685565857824/unknown.png",  //No quarter for the lolicon scum
			"https://cdn.discordapp.com/attachments/607402553143197696/734851342329315448/unknown.png",  //I doesn't use ubersaw
			"https://cdn.discordapp.com/attachments/607402553143197696/734850786185576458/unknown.png",  //You got lore-banned
			"https://cdn.discordapp.com/attachments/607402553143197696/734850422258270288/unknown.png",  //Nick was why we made !loreban
			"https://i.imgur.com/ZVew4B1.png",  //How many times Tessa has said cheese
			"https://cdn.discordapp.com/attachments/607402553143197696/734850150228426873/unknown.png",  //Negative Kelvin Tcomms
			"https://cdn.discordapp.com/attachments/607402553143197696/734849802378018816/unknown.png",  //People don't have money
			"https://cdn.discordapp.com/attachments/607402553143197696/734849751664689202/yu8kfSG.png",  //Wikiman not as funny as mentor says mentor
			"https://cdn.discordapp.com/attachments/607402553143197696/734848490722820096/unknown.png",  //I am Kawaii
			"https://cdn.discordapp.com/attachments/607402553143197696/734847494801850408/unknown.png",  //User:LoliconSlayer
			"https://cdn.discordapp.com/attachments/607402553143197696/734847152756621434/unknown.png",  //User:Missatessatessy
			"https://media.discordapp.net/attachments/628963669887156224/717916631858151514/image0.png",  //Are people with wiki tag staff
			"https://cdn.discordapp.com/attachments/607402553143197696/734846208924844132/unknown.png",  //Use the right wiki
			"https://i.imgur.com/RYM4zIO.png",  //Wiki is above mentor
			"https://cdn.discordapp.com/attachments/607402553143197696/734845830900744202/unknown.png",  //I rolled back too many revisions
			"https://cdn.discordapp.com/attachments/607402553143197696/734846144701792256/unknown.png",  //Ask for a wiki account
			"https://cdn.discordapp.com/attachments/607402553143197696/734844866583986256/unknown.png",  //I'm not a mentor don't insult me
			"https://cdn.discordapp.com/attachments/607402553143197696/734844202998956076/unknown.png",  //Plagiarized TG Wiki
			"https://cdn.discordapp.com/attachments/607402553143197696/734844239200124938/unknown.png",  //Increasingly Verbose
			"https://cdn.discordapp.com/attachments/607402553143197696/734844114482495518/unknown.png",  //Why won't the visual editor let me upscale images
			"https://cdn.discordapp.com/attachments/607402553143197696/734844019624116274/unknown.png",  //Don't destiny and wiki edit
			"https://cdn.discordapp.com/attachments/607402553143197696/734843632812818472/unknown.png",  //Learn to spell hippie and fluffe
			"https://cdn.discordapp.com/attachments/607402553143197696/737398836443742289/mBreadMonkey.jpg",  //Spamming mbread like monkeys
			"https://cdn.discordapp.com/attachments/734475284446707753/735899938554249226/unknown.png",  //It doesn't work
			"https://cdn.discordapp.com/attachments/734475284446707753/736304669768548482/uLvLwzf.png",  //Talk shit about cheese
			"https://cdn.discordapp.com/attachments/734475284446707753/736304700458270770/C3bbqmd.png",  //All I care about is cheese
			"https://cdn.discordapp.com/attachments/734475284446707753/736304724340637696/1pChMY0.png",  //Inventing time travel to make cheese
			"https://cdn.discordapp.com/attachments/734475284446707753/736304757303541820/n5dMiKT.png",  //I would be a serial killer if not for cheese
			"https://cdn.discordapp.com/attachments/734475284446707753/736304811539955783/eo59YKl.png",  //Wiki council and cheese council
			"https://cdn.discordapp.com/attachments/734475284446707753/736304845740441680/lGdqCvI.png",  //First words were more cheese
			"https://cdn.discordapp.com/attachments/734475284446707753/736304874119102544/xZpXlN2.png",  //SS13 is cheese delivery
			"https://cdn.discordapp.com/attachments/734475284446707753/736304903424573450/SogNNoN.png",  //Getting in the way of cheese makes you valid
			"https://cdn.discordapp.com/attachments/734475284446707753/738444411226030090/ApplicationFrameHost_WqQTNR2KcL.png",  //I hate TG wiki editors
			"https://cdn.discordapp.com/attachments/734475284446707753/738533939047825428/Discord_2020-07-30_19-09-17.png",  //Ping Oakboscage
			"https://cdn.discordapp.com/attachments/734475284446707753/739509921908916255/fzxbQO2.png",  //Why Xantam likes wiki
			"https://cdn.discordapp.com/attachments/734475284446707753/739509995296784484/dwIqBr8.png",  //Wiki has no drama or autism
			"https://cdn.discordapp.com/attachments/734475284446707753/739510144039125033/svGEufI.png",  //Tear down wiki and I will murder you
			"https://i.imgur.com/fdgoo3A.png",  //I'm illiterate
			"https://cdn.discordapp.com/attachments/734475284446707753/741353085179265067/unknown.png",  //Confuse goon wiki with ours
			"https://cdn.discordapp.com/attachments/734475284446707753/745649688945885264/unknown.png",  //Childhood Memories
			"https://cdn.discordapp.com/attachments/734475284446707753/745726429605527572/Meme_Wiki.png",  //Coraline dad editing wiki
			"https://cdn.discordapp.com/attachments/734475284446707753/746123876928454686/unknown.png",  //15% of all cheese on yogs
			"https://cdn.discordapp.com/attachments/734475284446707753/750754862441955399/unknown.png",  //It's spelled chemistry
			"https://cdn.discordapp.com/attachments/734475284446707753/762465628635791360/unknown.png",  //There is no page give me your lamp
			"https://cdn.discordapp.com/attachments/734475284446707753/767629949146103858/unknown.png",  //Experimentor is for experimenting
			"https://cdn.discordapp.com/attachments/734475284446707753/767860510430593035/1l3g3o2.png",  //Sentient Cheese Antag
			"https://cdn.discordapp.com/attachments/734475284446707753/767889520233676801/unknown.png",  //!wiki is 70% cheese
			"https://cdn.discordapp.com/attachments/734475284446707753/769667343541338122/unknown.png",  //I don't wanna be wiki
			"https://cdn.discordapp.com/attachments/734475284446707753/742791230072553602/unknown.png",  //Do people powergame IRL
			"https://cdn.discordapp.com/attachments/734475284446707753/776247641343524864/image0.png",  //Meth works for me
			"https://cdn.discordapp.com/attachments/134720091576205312/836268620669124718/20210326_182720.jpg",  //RPG TG Wiki users
			"https://cdn.discordapp.com/attachments/134720091576205312/835372563366019103/Not_Yet.png",  //Not yet Morder
			"https://cdn.discordapp.com/attachments/622891395644129292/852272931719348224/39KxcWz.png",  //TG using Yogs Pages
			"https://cdn.discordapp.com/attachments/134720091576205312/864323221405564949/unknown.png",  // Mord, do something.
			"https://cdn.discordapp.com/attachments/607402553143197696/865408075267047424/utatul_marketable_plush.png",  //Utatul Marketable Plush
			"https://cdn.discordapp.com/attachments/734475284446707753/850053588842578001/Screenshot_20210603-094832.jpg",  //Wiki>Mentor
			"https://cdn.discordapp.com/attachments/734475284446707753/833544384145391656/unknown.png",  //Is Morder Anvilman
			"https://cdn.discordapp.com/attachments/734475284446707753/828761629595271208/unknown.png",  //Alexkar is very smart
			"https://cdn.discordapp.com/attachments/734475284446707753/808799456224870410/unknown.png",  //Duality of wiki
			"https://cdn.discordapp.com/attachments/734475284446707753/801628545570832464/pee_pee_poo_poo_time.png",  //Pee Pee Poo Poo Batman
			"https://cdn.discordapp.com/attachments/734475284446707753/801540934017351760/beating_children.png",  //Mord beats children
			"https://cdn.discordapp.com/attachments/734475284446707753/789610810464403496/unknown.png",  //TG Wiki in an mhelp
			"https://cdn.discordapp.com/attachments/734475284446707753/872199346395951114/Screenshot_20210803-142719__01.png",  //Perish, Vivec
			"https://cdn.discordapp.com/attachments/734475284446707753/879735088600985670/unknown.png",  //This command's cheese ratio
			"https://cdn.discordapp.com/attachments/734475284446707753/895073791091310602/This_Mord_is_trained_to_Strangle_You.png",  //This Robot is trained to Strangle you
			"https://cdn.discordapp.com/attachments/734475284446707753/885207786923892757/m4H5OVe.png",  //The Anvil is harder to stop
			"https://cdn.discordapp.com/attachments/734475284446707753/925666350750375966/catch_plush.png" //Catch UtaPlush
		)

	override val name = "wiki"
	override val title = "Wiki Image"
	override val description = "Wiki department of yogstation"

}
