const GithubFlag = require('../GithubFlag.js');

class GithubFlagTweak extends GithubFlag {
  constructor() {
    super("Tweak", [], ["tweak"]);
  }
}

module.exports = GithubFlagTweak;
