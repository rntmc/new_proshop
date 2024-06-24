import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //Every time we create anything in the DB, it has an _id field and that's the object ID(It has its own type)
    required: true,
    ref: "User", //reference to another model
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
},{
  timestamps: true,
})

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //Every time we create anything in the DB, it has an _id field and that's the object ID(It has its own type)
    required: true,
    ref: "User", //reference to another model
  },
  name:{
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps:true, //add the created_at field
});

const Product = mongoose.model("Product", productSchema);

export default Product