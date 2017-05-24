class Subsystem {
  constructor(id, manager) {
    this.id = id;
    this.status = 0;
    this.error = "";
    this.priority = 0;
    this.manager = manager;
  }

  setup() {
    this.setStatus(1, "");
    console.log("Starting " + this.id + " subsystem.");
  };

  update() {};

  setStatus(status, error) {
    this.status = status;
    this.error = error;
  }

}

module.exports = Subsystem;
