const RouterPath = require("../../RouterPath.js");

class RouterPathHealth extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);

    this.router.get("/health", (req, res) => {
      const discordsys = this.subsystem.manager.getSubsystem("Discord");
      
      //cant get the subsystem, something borked
      if(!discordsys) return res.status(500).send("Cant get Discord subsystem").end();
      
      //client is not READY(0)
      if(discordsys.client.ws.status !== 0) return res.status(500).send(`Client not ready. Status: ${discordsys.client.ws.status}`).end();
     
      //all clear boys
      res.status(200).send("OK").end();
    });
  }
  
  
}

module.exports = RouterPathHealth;
