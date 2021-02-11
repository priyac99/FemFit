const mongoose = require("mongoose");

let config=require("./config.json");

let MONGOURI = `mongodb+srv://${config.id}:${config.password}@cluster0.kxfax.mongodb.net/mydb?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;