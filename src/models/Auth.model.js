const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
  user_Id: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "UserName must be greater then three character."],
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
  type: String,
  required: true,
  trim: true,
  minlength: [6, "Password must be greater than 6 characters."],
  validate: {
    validator: function (v) {
      return /[!@#$%^&*(),.?":{}|<>]/.test(v);
    },
    message: "Password must contain at least one special character."
  }
},
role:{
    type:[String],
    enum:["customer","admin"],
    default:"customer"
},
status:{
   type:String,
  default:"active"
}
  
},{timestamps:true});


const AuthUser = mongoose.model("User",AuthSchema)

module.exports= AuthUser