require("dotenv").config();
const mongoose = require("mongoose");

class Database {
  constructor() {
    if (!Database.instance) {
      this.connect();
      Database.instance = this;
    }
    return Database.instance;
  }

  connect() {
    mongoose
      .connect(process.env.MONGO_URI + "/sponsorlytix")
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
  }
}

module.exports = new Database();
