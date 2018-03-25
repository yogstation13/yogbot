const GithubFlag = require('../GithubFlag.js');

class GithubFlagBot extends GithubFlag {
  constructor() {
    super("Dead bot", [], []);
  }
  checkCustom(pullRequest) {
    var requestOptions = {
      url: pullRequest.url + "/files",
        headers: {
          'User-Agent': 'Yogbot13'
        },
        json: true
      };

      request(requestOptions).then((json) => {
        if(!file in json) {
          return true;
        }
      });
  }
}



module.exports = GithubFlagBot;
