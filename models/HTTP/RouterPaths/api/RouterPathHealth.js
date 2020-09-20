const RouterPath = require("../../RouterPath.js");

class RouterPathHealth extends RouterPath {
  constructor(subsystem, router) {
    super(subsystem, router);

    this.router.get("/health", (req, res) => {
      const discordsys = this.manager.getSubsystem("Config");
      
      //cant get the subsystem, something borked
      if(!discordsys) return res.write("Cant get Discord subsystem").end(500);
      
      //client is not READY(0)
      if(discordsys.client.status !== 0) return res.write(`Client not ready. Status: ${discordsys.client.status}`).end(500);
     
      //all clear boys
      res.write("OK").end(200);
    });
  }
  
  
}

module.exports = RouterPathHealth;
