const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique:false
  },
  title:
  {
      type: String,
      required: true

  },
  body: {
    type: String,
    required: true
  },

 link:
 {
     type: String
 },

 reviewed:
 {
     type: Boolean,
     required: true
 }

  }
);

module.exports = mongoose.model("post", PostSchema);
