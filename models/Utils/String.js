class StringUtils {

  //
  // getRandomString() Should really only be used when salting passwords.
  //

  static getRandomString(length) {
    var string = "";

    var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@;,./?#~{}[]()*&^%$£!<>|+-=0123456789"

    for(var i = 0; i < len; i++)
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
}

module.exports = StringUtils;
