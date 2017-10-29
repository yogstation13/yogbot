var http = require('http');
var recaptcha = require('recaptcha');

class RecaptchaManager {

  constructor(secret) {
    this.secret = secret;
  }

  verifyCaptcha(token, callback) {
    var options = {
      host: 'www.google.com',
      port: 80,
      path: '/recaptcha/api/siteverify',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    var req = http.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (body) => {
        callback(undefined, body);
      });
    });

    req.on('error', (error) => {
      callback(error, undefined);
    });

    //var content = {
    //  secret: this.secret,
    //  response: token
    //};

    //req.write(JSON.stringify(content));
    req.end();
  }
}

module.exports = RecaptchaManager;
