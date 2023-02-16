const mongoose = require("mongoose");

const partySchema = mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image:{
    type: String
  },
  images:[{
    type: String,
    default: ""
  }],
  description: {
    type: String,
    default: "No description"
  },
  address: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  //categoory schema
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  capacity: {
    type: Number,
    required: true,
    min: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateOf: {
    type: String,
  },
  memberCount: {
    type: Number,
    default: 1
  }
});

partySchema.virtual("id").get(function () {
  return this._id.toHexString()
})

partySchema.set("toJSON", {
  virtuals: true
})

exports.Party = mongoose.mongoose.model("Party", partySchema);

// const partySchema = mongoose.Schema({
//   host: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   image:{
//     type: String
//   },
//   images:[{
//     type: String,
//     default: ""
//   }],
//   description: {
//     type: String,
//     default: "No description"
//   },
//   address: {
//     type: String,
//   },
//   price: {
//     type: Number,
//     default: 0,
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//   },
//   capacity: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false,
//   },
//   dateCreated: {
//     type: Date,
//     default: Date.now,
//   },
//   dateOf: {
//     type: Date,
//   },
//   memberCount: {
//     type: Number,
//     default: 1
//   }



//–––––––––––––––––NEW––––––––––––––––––
// - remove categories
// - location (longitude, latitude)
//

// party host decides if party
// is private or public

//   isPrivate: {
//     type: Boolean
//   },


// tracks the memberCount of the user
// updates as more users join
// add API incrementMemberCount()
//    - adds 1 to memberCount

//   memberCount: {
//     type: Number,
//     default: 1,
//   }
// });