package net.yogstation.yogbot.listeners.commands

import net.yogstation.yogbot.config.DiscordConfig
import org.springframework.stereotype.Component
import java.util.*

@Component
class KtlwjecCommand(discordConfig: DiscordConfig, random: Random) : ImageCommand(discordConfig, random) {
	override val images: List<String> = listOf(
		"https://i.imgur.com/T5YsJOT.jpg", "https://thumbs.dreamstime.com/z/doctor-cat-24832703.jpg",
		"http://images.bigcartel.com/product_images/55001423/dcplush.jpg?auto=format&fit=max&h=1000&w=1000",
		"https://img3.stockfresh.com/files/c/cynoclub/m/85/1542883_stock-photo-doctor-cat.jpg",
		"https://cdn.shopify.com/s/files/1/1312/6455/products/doctor_cat_480x480.PNG?v=1471114517",
		"http://l7.alamy.com/zooms/9a630ea301be4b6b804cb96665352181/black-cat-with-a-habit-of-doctor-in-front-of-white-background-cffgp3.jpg",
		"https://i.imgur.com/gtTpjFZ.jpg", "https://i.imgur.com/KzbRnsj.jpg",
		"https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2017/09/12/goods-img/1505439599424955880.jpg",
		"https://s7d5.scene7.com/is/image/TheBradfordExchangeOnline/replatformOverlays?layer=comp&wid=300&hei=300&fmt=jpeg,rgb&qlt=90,1&op_sharpen=1&resMode=bicub&op_usm=0.5,2.0,0,0&iccEmbed=0&\$product_id=0907354001",
		"http://ultrapet.com/wp-content/uploads/2017/03/CATNURSE.jpg", "https://i.imgur.com/40Dcan3.png",
		"https://i.pinimg.com/originals/07/46/bf/0746bf864d7a2e786ed8d1a4eb57dd81.jpg",
		"https://i.pinimg.com/564x/6f/84/87/6f8487845f908645162c57be912ea1ba.jpg",
		"https://live.staticflickr.com/7100/7066953431_34bd247b65_b.jpg",
		"https://i.pinimg.com/564x/d4/81/5c/d4815c73b98d87b6e3cbd0c5d4e75a22.jpg",
		"https://i.pinimg.com/564x/fc/00/c8/fc00c8b0754a27096bd870901fa70d90.jpg",
		"https://cdn.discordapp.com/attachments/568528620243386368/784206933484634143/image0-6.jpg"
	)
	override val title = "Ktlwjec Image"
	override val description = "Pictures of the modsquad cat"
	override val name = "ktlwjec"
}
