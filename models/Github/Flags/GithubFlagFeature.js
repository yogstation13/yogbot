const GithubFlag = require('../GithubFlag.js');

class GithubFlagFeature extends GithubFlag {
  constructor() {
    super("Feature", [], ["rscadd"]);
  }
}

module.exports = GithubFlagFeature;
