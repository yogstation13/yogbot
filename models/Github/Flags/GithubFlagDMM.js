const GithubFlag = require('../GithubFlag.js');

class GithubFlagDMM extends GithubFlag {
  constructor() {
    super("Map Change", ['dmm'], []);
  }
}

module.exports = GithubFlagDMM;
