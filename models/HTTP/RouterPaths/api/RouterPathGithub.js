const RouterPath = require("../../RouterPath.js");
const bodyParser = require('body-parser');
const GithubManager = require('../../../Github/GithubManager.js');

class RouterPathGithub extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);

    this.githubManager = new GithubManager(subsystem.manager);
    this.router.post("/github", bodyParser.text({ type: 'application/json' }), (req, res) => {
      this.post(req, res);
    });
  }

  post(req, res) {

    var requestVerification = this.githubManager.verifyGithubRequest(req);
    if (requestVerification != true) {
      return res.status(400).send(requestVerification);
    }


    var githubEvent = req.headers['x-github-event'];

    if (githubEvent == "ping") {
      return res.send("pong");
    }

    if (githubEvent == "pull_request") {
      this.githubManager.handlePullRequest(JSON.parse(req.body));
    }
  }

}

module.exports = RouterPathGithub;
