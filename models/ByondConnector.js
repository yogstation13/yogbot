var net = require('net');
var jspack = require('jspack');

class ByondConnector {
  constructor(ip, port) {
    this.ip = ip;
    this.port = port;


  }

  request(query, callback) {

    var data;
    var pack = jspack.jspack.Pack('H', [query.length + 6]);
    var charArray = [];
    for(var i = 0; i < query.length; i++) {
      charArray.push(query.charCodeAt(i));
    }

    data = [0x00, 0x83];
    data = data.concat(pack);
    data = data.concat([0x00, 0x00, 0x00, 0x00, 0x00])
    data = data.concat(charArray);
    data = data.concat([0x00])

    var buffer = Buffer.from(data);
    var client = new net.Socket({ readable: true, writeable: true });

    client.setTimeout(5000);

    client.on("timeout", function() {
      console.log("Connection to gameserver timed out running query: " + query);
      client.destroy();
      callback({ error: "Connection timed out, Server might be restarting."});
    });

    client.connect({ port: this.port, host: this.ip});

    client.on('connect',function() {
      client.write(buffer);
    });


    client.on('data', data => {
      callback({ data: this.decode_buffer(data) });
      client.destroy();
    });

    client.on("error", function(ferror) {
      callback({ error: ferror });
    });


  }

  //Ripped from https://github.com/tigercat2000/http2byond
  decode_buffer(dbuff) {
    if (!dbuff) {
      return null;
    }
    // Confirm the return packet is in the BYOND format.
    if (dbuff[0] == 0x00 && dbuff[1] == 0x83) {
      // Start parsing the output.
      var sizearray = [dbuff[2], dbuff[3]];  // Array size of the type identifier and content.
      var sizebytes = jspack.jspack.Unpack("H", sizearray); // It's packed in an unsigned short format, so unpack it as an unsigned short.
      var size = sizebytes[0] - 1; // Byte size of the string/floating-point (minus the identifier byte).

      if (dbuff[4] == 0x2a) { // 4-byte big-endian floating point data.
        var unpackarray = [dbuff[5], dbuff[6], dbuff[7], dbuff[8]];
        var unpackint = jspack.jspack.Unpack("<f", unpackarray); // 4 possible bytes, add them up and unpack as a big-endian (non-network) float
        return unpackint[0];
      } else if (dbuff[4] = 0x06) { // ASCII String.
        var unpackString = "";
        var index = 5; // Buffer index to start searching from.

        while (size > 0) {
          size--;
          unpackString += String.fromCharCode(dbuff[index]);
          index++;
        }

        return unpackString;
      }

      return null;
    }
  }
}

module.exports = ByondConnector
