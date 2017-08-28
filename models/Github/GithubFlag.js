class GithubTag {
  constructor(tag, fileExtensions, changelogTypes, regex) {
    this.tag = tag;
    this.fileExtensions = fileExtensions;
    this.changelogTypes = changelogTypes;
    this.regex = regex;
  }

  checkFileExtensions(extensions) {
    for (var extension of extensions) {
      if (this.fileExtensions.indexOf(extension) > -1) {

        return true;
      }
    }

    return false;
  }

  checkRegex(contents) {
    if (this.regex == undefined) {
      return false;
    }

    return contents.search(this.regex);
  }

  checkChangelog(changelog) {
    for (var change of changelog.changelog) {
      if (this.changelogTypes.indexOf(change.type) > -1) {
        return true;
      }
    }

    return false;
  }

  // Should be overriden in case of custom behaviour
  checkCustom(pullRequest) {

  }
}

module.exports = GithubTag;
