const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;
const alphanumeric = Math.random().toString(36).slice(2);
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  departments: [{
    type: String,
    required: true
  }],
  client: {
    type: String,
    required: true,
  },
  hqphone: {
    type: String,
    required: true,
  },
  hqemail: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  sitename: {
    type: String,
    required: true,
  },
  managerphone: {
    type: String,
    required: true,
  },
  clientemail: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  service: [{
    type: ObjectId,
    ref: "Product",
    required: true,
  }],
  quantity: {
    type: Map,
    of: Number,
    required: true
  },
  vendorprice: {
    type: Map,
    of: Number,
    required: true
  },
  customservice: [{
    id: Number,
    name: String,
    vendorprice: Number,
    quantity: Number,
    unit: String
  }],
  location: {
    type: String,
    required: true
  },
  vendorname: {
    type: String,
  },
  budget: {
    type: Number,
  },
  status: {
    type: String,
    default: "requirement received",
  },
  remarks: {
    type: String
  },
  startdate: {
    type: String
  },
  enddate: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now,
  },
  jobId:{
    type:String,
    default:alphanumeric,
  }
});
const Job =mongoose.model("Job", jobSchema);
module.exports = {Job};