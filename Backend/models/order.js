const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  // orderItem: 
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "OrderItem",
  //   },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party"
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now(),
  }
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

exports.Order = mongoose.model("Order", orderSchema);
