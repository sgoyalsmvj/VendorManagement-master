const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true,
  },
  departments: [{
    type: String,
    required: true
  }],
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  unit: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true
  },
  price: {
    type: Number,
  },
  vendorPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending"
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = {Product};
