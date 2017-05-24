var express = require('express');
var fs = require('fs');

class RouterPath {
  constructor(subsystem, router, routerPath) {
    this.subsystem = subsystem;
    this.router = router;
    this.routerPath = routerPath;
  }

  register() {
    //router.get('/', function(req, res) {
    //  res.json({ message: 'hooray! welcome to our api!'});
    //});
    this.router.get(this.routerPath, (req, res) => {
      this.get(req, res);
    });
    this.router.post(this.routerPath, (req, res) => {
      this.post(req, res);
    });
  }

  get(req, res) {

  }

  post(req, res) {

  }
}

module.exports = RouterPath;
