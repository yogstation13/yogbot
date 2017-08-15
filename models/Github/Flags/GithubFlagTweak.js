const GithubFlag = require('../GithubFlag.js');

class GithubFlagTweak extends GithubFlag {
  constructor() {
    super("Sound", ["ogg"], []);
  }
}

module.exports = GithubFlagTweak;
