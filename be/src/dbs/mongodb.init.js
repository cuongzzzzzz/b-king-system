const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    const url = "mongodb+srv://admin-cuong:Mung2001@cluster0.o4ws8dl.mongodb.net/typescript";

    if (true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(url)
      .then(() => {
        console.log("connect thanh cong");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instance = Database.getInstance();
module.exports = instance;
