const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcryptjs");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const adminSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  rolename: {
    type: String,
    ref: "Role",
    required: true
  },
  manager: {
    type: String,
    ref: "Admin"
  },
  manage: [{
    type: String,
    ref: "Admin"
  }],
  isLoggedIn: {
    type: Boolean,
  },
  reminder: {
    type: String,
  }
});

// generating a hash
adminSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

// checking if password is valid
adminSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Admin = mongoose.model("Admin", adminSchema); 
module.exports = {Admin};

