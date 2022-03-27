package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import net.yogstation.yogbot.listeners.commands.ImageCommand
import org.springframework.stereotype.Component
import java.util.*

@Component
class DuckCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {
	//Duckpond
	override val images = listOf(
			"http://i.imgur.com/YjWIJHU.png", "http://i.imgur.com/SEoP3pC.jpg",
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/1200px-Mallard2.jpg",
			"http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/H-P/mallard-male-standing.adapt.945.1.jpg",
			"http://hunsci.com/data/out/129/581482.png",
			"http://www.michiganduckrescueandsanctuary.com/wp-content/uploads/2014/12/marold_donate_transparent_504.png",
			"http://i.imgur.com/IAWzbHm.png", "http://i.imgur.com/pZIeNmX.jpg",
			"http://i.imgur.com/4Ztso2W.png",
			"https://web.stanford.edu/dept/CTL/cgi-bin/academicskillscoaching/wp-content/uploads/2012/07/baby-duck.jpg",
			"http://i.imgur.com/LXn5gKI.png",
			"http://cdn1.uk.mentalfloss.com/sites/mentalflossuk/files/9/18//muscovy-duck-binns-img_3828-copy.jpg",
			"http://i3.kym-cdn.com/photos/images/original/001/248/525/3e4.jpg",
			"https://thenypost.files.wordpress.com/2017/05/ducks1.jpg",
			"http://seaduckjv.org/wp-content/wow-aqua-3/data1/images/hoodedmerganser.jpg",
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Tunnel_of_ducks.jpg/1200px-Tunnel_of_ducks.jpg",
			"http://www.mapleleaffarms.com/lib/sitefiles/images/products/thumlink-gold-label-whole-duck.jpg",
			"https://s-media-cache-ak0.pinimg.com/736x/5f/16/29/5f16294450b32e4d0669d03f51e29002.jpg",
			"http://assets.atlasobscura.com/article_images/800x/16864/image.jpg",
			"http://www.chinadaily.com.cn/food/img/attachement/jpg/site1/20130508/0023ae69624d12f4314d3d.jpg",
			"https://s-media-cache-ak0.pinimg.com/736x/14/db/f6/14dbf6195f5cc0b4e7e9bcc772eba16b--outdoor-yellow.jpg",
			"http://i.imgur.com/0MJ7cSk.jpg", "http://i.imgur.com/ERgQOJc.png",
			"http://www.organicauthority.com/wp-content/uploads/2015/04/shutterstock_155589044.jpg",
			"https://i.ytimg.com/vi/P_WMeeR-Gh4/maxresdefault.jpg",
			"https://static01.nyt.com/images/2008/02/25/nyregion/25ducks.600.jpg",
			"https://68.media.tumblr.com/e074a364209231ccb680dd14084b3b6a/tumblr_ol8exhZUV01s46p8ao1_1280.jpg",
			"http://www.tringa.org/images/0351_Wood_Duck_11-16-2008_12.jpg",
			"http://seaduckjv.org/wp-content/wow-aqua-3/data1/images/kingeideronwater.jpg",
			"http://www.worldofmunchkin.com/duckofdoom/img/cover_lg.jpg",
			"http://i.imgur.com/esV0pAF.jpg", "http://i.imgur.com/yFD8wOX.png",
			"http://assets.epicurious.com/photos/5776e73c58145bd155a1271e/master/pass/duck-confit.jpg",
			"http://www.agweb.com/assets/1/6/duck1.jpg",
			"http://officeducks.com/wp-content/uploads/2015/05/27-degree-Duck.png",
			"http://i.imgur.com/Se46BWs.png",
			"https://cdn.bulbagarden.net/upload/thumb/4/4b/580Ducklett.png/250px-580Ducklett.png",
			"https://cdn.bulbagarden.net/upload/thumb/f/f8/083Farfetch%27d.png/250px-083Farfetch%27d.png",
			"https://i.ytimg.com/vi/tHl06CPw0iU/hqdefault.jpg",
			"https://68.media.tumblr.com/tumblr_mee3c2hQwh1r72ht7o1_500.gif",
			"http://www.mypokecard.com/my/galery/MdJ6dwd8B5hV.jpg",
			"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Runner-ducks.jpg/1200px-Runner-ducks.jpg",
			"https://www.swarovski.com/is-bin/intershop.static/WFS/SCO-Media-Site/-/-/publicimages/CG/B2C/PROD/600/Swarovski-Happy-Duck-Good-Luck-5136427-W600.jpg",
			"http://seaduckjv.org/wp-content/wow-aqua-3/data1/images/commongoldeneye.jpg",
			"https://upload.wikimedia.org/wikipedia/commons/0/08/The_Big_Duck.JPG",
			"https://www.poorlydrawnlines.com/wp-content/uploads/2012/10/little-duck.png",
			"https://www.red5.co.uk/media/catalog/product/cache/2/image/800x800/e9c3970ab036de70892d86c6d221abfe/s/u/superman-bath-duck-_1_b.jpg",
			"https://s-media-cache-ak0.pinimg.com/236x/95/d8/0b/95d80b354bd3a36ee41f221c952ec5e5--batman-bed-batman-logo.jpg",
			"http://www.budducks.com/media/com_hikashop/upload/bud0090_spaceduck.jpg",
			"http://www.hamleys.com/images/_lib/hamleys-movers-shakers-duck-1548-0-1417097799000.jpg",
			"http://static.neatorama.com/images/2013-09/rubber-duck-potato-1.jpg",
			"http://www.jokeoverflow.com/wp-content/uploads/2011/07/duck-dog-masks.jpg",
			"http://i.imgur.com/NsdwAow.png",
			"http://www.kappit.com/img/pics/201601_1503_fgagb_sm.jpg",
			"http://www.guy-sports.com/fun_pictures/duck_dead.jpg",
			"http://www.kappit.com/img/pics/201406_2202_bacfa_sm.jpg",
			"http://37.media.tumblr.com/ee601d99a4e0d0d52ab6fbbf55f28f2d/tumblr_n45sz1Fgth1sxnr93o1_500.gif",
			"https://cdn.discordapp.com/attachments/734475284446707753/879604377285951488/20210823_140659.jpg" //Duckpond
		)
	override val title = "Random Duck"
	override val name = "duck"
	override val description = "Pictures of the quack"
}
