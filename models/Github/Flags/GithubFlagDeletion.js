const GithubFlag = require('../GithubFlag.js');

class GithubFlagDeletion extends GithubFlag {
  constructor() {
    super("Revert / Deletion", [], ["rscdel"]);
  }
}

module.exports = GithubFlagDeletion;
