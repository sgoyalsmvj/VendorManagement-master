const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const vendorSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true,
  },
  departments: [{
    type: String,
    required: true
  }],
  service: {
    type: String,
    required: true,
  },
  vendorname: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  alternatephone:
  {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
  },

  pincode: {
    type: Number,
    required: true,
  },
  adhaarnumber:
  {
    type: Number,
    required: true,
  },
  pannumber:
  {
    type: String,
    required: true,
  },
  holdername:
  {
    type: String,
    required: true,
  },

  // customField: [
  //   {
  //     bankname: {
  //       type: String,
  //       trim: true,
  //     },
  //     branchname: {
  //       type: String,
  //       trim: true,
  //     },
  //   },
  // ],

  account:
  {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "available"
  },

});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = {Vendor};
