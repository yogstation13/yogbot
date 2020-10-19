class StringUtils {

  //
  // getRandomString() Should really only be used when salting passwords.
  //

  static getRandomString(length) {
    var string = "";

    var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@;,./?#~{}[]()*&^%$£!<>|+-=0123456789"

    for (var i = 0; i < length; i++)
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

  //
  // https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
  //

  static replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }
  static replaceAllArray(str, find, replace) {
    if (find.length != replace.length) {
      return;
    }

    for (var i = 0; i < find.length; i++) {
      var stringSearch = find[i];
      var stringReplace = replace[i];
      str = this.replaceAll(str, stringSearch, stringReplace);
    }

    return str;
  }
  
  //
  // https://stackoverflow.com/questions/16148867/unescape-html-character-entities
  //

  static unescapeHtml(unsafe) {
    return unsafe
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'");
	}
}

module.exports = StringUtils;
