const GithubFlag = require('../GithubFlag.js');

class GithubFlagDME extends GithubFlag {
  constructor() {
    super("DME Edit", ['dme'], []);
  }
}

module.exports = GithubFlagDME;
