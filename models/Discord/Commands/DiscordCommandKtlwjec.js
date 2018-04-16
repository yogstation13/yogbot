const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKtlwjec extends DiscordCommand {

  constructor(subsystem) {
    super("ktlwjec", "Pictures of the modsquad cat", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = [
		"https://twitter.com/xeropls/status/907386373044359174",
		"http://www.fellbande.at/fellmiautschn/Nightwish11/Dr.Katz.gif",
		"https://i.imgur.com/yQHV3SG.png",
		"https://i.imgur.com/T5YsJOT.jpg",
		"https://thumbs.dreamstime.com/z/doctor-cat-24832703.jpg",
		"https://imgs.tuts.dragoart.com/how-to-draw-doctor-cat-doctor-cat_1_000000010310_5.jpg",
		"https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX17208252.jpg",
		"http://images.bigcartel.com/product_images/55001423/dcplush.jpg?auto=format&fit=max&h=1000&w=1000",
		"https://img3.stockfresh.com/files/c/cynoclub/m/85/1542883_stock-photo-doctor-cat.jpg",
		"https://cdn.shopify.com/s/files/1/1312/6455/products/doctor_cat_480x480.PNG?v=1471114517",
		"http://l7.alamy.com/zooms/9a630ea301be4b6b804cb96665352181/black-cat-with-a-habit-of-doctor-in-front-of-white-background-cffgp3.jpg",
		"https://d3v8fhblas9eb9.cloudfront.net/i/wp-content/uploads/2013/08/CURIOUS-INTERESTED-CAT-DOCTOR.jpg",
		"https://i.imgur.com/gtTpjFZ.jpg",
		"https://i.imgur.com/KzbRnsj.jpg",
	    	"https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2017/09/12/goods-img/1505439599424955880.jpg",
	    	"https://s7d5.scene7.com/is/image/TheBradfordExchangeOnline/replatformOverlays?layer=comp&wid=300&hei=300&fmt=jpeg,rgb&qlt=90,1&op_sharpen=1&resMode=bicub&op_usm=0.5,2.0,0,0&iccEmbed=0&$product_id=0907354001",
	    	"http://ultrapet.com/wp-content/uploads/2017/03/CATNURSE.jpg",
	    	"https://i.imgur.com/40Dcan3.png"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandKtlwjec;
