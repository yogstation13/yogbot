var http = require('http');
var ReCAPTCHA = require('recaptcha2');

class RecaptchaManager {

  constructor(secret, publict) {
    this.recaptcha = new ReCAPTCHA({
      siteKey: publict,
      secretKey: secret
    });
  }

  verifyCaptcha(token, callback) {

    var data = {
      challenge: undefined,
      response: token,
      remoteip: undefined
    }

    this.recaptcha.validate(token).then(() => {
      callback(undefined, true);
    }).catch((errorCode) => {
      callback(errorCode, false);
    });
  }
}

module.exports = RecaptchaManager;
