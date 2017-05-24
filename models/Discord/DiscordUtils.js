class DiscordUtils {
  static stringToDiscordID(string) {
    var beginIndex = 2;
    if(!string.startsWith("<@") && !string.startsWith("<#")) {
      return false;
    }

    if(string.startsWith("<@&")) {
      beginIndex++;
    }

    if(!string.endsWith(">")) {
      return false;
    }

    return string.substring(1, string.length-1);
  }

}

module.exports = DiscordUtils;
