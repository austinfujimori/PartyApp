const mongoose = require("mongoose")

const orderItemSchema = mongoose.Schema({
     quantity: {
          type: Number,
          required: true
     },
     party: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Party"
     }
})

exports.OrderItem = mongoose.model("OrderItem", orderItemSchema)