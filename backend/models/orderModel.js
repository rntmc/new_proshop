import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "User",
  },
  orderItems: [ //We user [] so users can have more than one order
    {
      name: {type: String, required: true},
      qty: {type: Number, required: true},
      image: {type: String, required: true},
      price: {type: String, required: true},
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    }
  ],
  shippingAddress: {
    address: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true},
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: {type: String},
    status: {type: String},
    update_time: {type: String},
    email_address: {type: String},
  },
  itemsPrice:{
    type: Number,
    requred: true,
    default:0.0,
  },
  taxPrice: {
    type: Number,
    requred: true,
    default:0.0,
  },
  shippingPrice: {
    type: Number,
    requred: true,
    default:0.0,
  },
  totalPrice: {
    type: Number,
    requred: true,
    default:0.0,
  },
  isPaid: {
    type: Boolean,
    requred: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    requred: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;