package net.yogstation.yogbot.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding
import org.springframework.stereotype.Component

@ConstructorBinding
@ConfigurationProperties(prefix = "yogbot.channels")
class DiscordChannelsConfig {
	var channelImportantAdmin: Long = 134722058688004096L
	var channelAdmin: Long = 134722036353204224L
	var channelAdmemes: Long = 378318242906636288L
	var channelAdminBotspam: Long = 458282555284783114L
	var channelAsay: Long = 161564229852332032L
	var channelMsay: Long = 558809391172812810L
	var channelMentor: Long = 558823007175573535L
	var channelStaffPublic: Long = 186490543398715392L
	var channelCouncil: Long = 950316188053929984
	var channelDevelopmentPublic: Long = 205784753352343552L
	var channelSpriter: Long = 440551954788253697L
	var channelMaintainerChat: Long = 408008557993132035L
	var channelPublic: Long = 134720091576205312L
	var channelOOC: Long = 161524149355806720L
	var channelMemes: Long = 347045440958627841L
	var channelBotspam: Long = 423761888309018624L
	var channelPublicLog: Long = 790670358038577172L
	var channelMapping: Long = 661343269942198295L
	var channelBanAppeals: Long = 665767898333052929L
	var channelPlayerComplaints: Long = 665768003568140318L
	var channelAdminComplaints: Long = 665768046140588032L
	var channelStaffApplications: Long = 665768082899337226L
	var channelMentorApplications: Long = 665785215985254420L
	var channelGithubSpam: Long = 701120514038693938L
	var channelBugReports: Long = 773277250090434640L

	private val adminChannels: Set<Long> by lazy {
		setOf(
			channelAdmemes,
			channelAdmin,
			channelCouncil,
			channelAdminBotspam
		)
	}

	fun isAdminChannel(channelID: Long): Boolean {
		return adminChannels.contains(channelID)
	}
}
