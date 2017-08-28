class StringUtils {

  //
  // getRandomString() Should really only be used when salting passwords.
  //

  static getRandomString(length) {
    var string = "";

    var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@;,./?#~{}[]()*&^%$£!<>|+-=0123456789"

    for (var i = 0; i < len; i++)
      string += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    return string;
  }

  //
  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  //

  static validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static URL2Array(url) {
    url = this.removeEscapeCharacters(url);
    var request = {};
    var pairs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < pairs.length; i++) {
      if (!pairs[i])
        continue;
      var pair = pairs[i].split('=');
      request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return request;
  }

  static removeEscapeCharacters(string) {
    string = string.substring(0, string.length - 1);
    return string.replace(/u[a-fA-F0-9]{4}/g, "");
  }
}

module.exports = StringUtils;
