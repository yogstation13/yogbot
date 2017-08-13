var express = require('express');
var fs = require('fs');

class RouterPath {
  constructor(subsystem, router) {
    this.subsystem = subsystem;
    this.router = router;
  }

  register() {
    /*this.router.get(this.routerPath, (req, res) => {
      this.get(req, res);
    });
    this.router.post(this.routerPath, (req, res) => {
      this.post(req, res);
    });*/
  }

  get(req, res) {

  }

  post(req, res) {

  }
}

module.exports = RouterPath;
