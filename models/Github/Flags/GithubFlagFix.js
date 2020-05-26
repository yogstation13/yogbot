const GithubFlag = require('../GithubFlag.js');

class GithubFlagFix extends GithubFlag {
  constructor() {
    super("Fix", [], ['fix', 'fixes', 'bugfix']);
  }
}

module.exports = GithubFlagFix;
