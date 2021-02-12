const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true

  },
  password: {
    type: String,
    required: true
  },

  bmi:{
    type: Array,
    
  },
  phoneNo:
  {
      type:Number,
      required:true
  },
  role:
  {
      type: String,
      required: true
  }

  }
);
// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);