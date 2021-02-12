const mongoose = require("mongoose");

// let config=require("./config/config.json");
let id = process.env.id || config.id
let password = process.env.password || config.password
let MONGOURI = `mongodb+srv://${id}:${password}@cluster0.kxfax.mongodb.net/mydb?retryWrites=true&w=majority`;

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