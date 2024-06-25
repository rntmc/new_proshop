import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next){ //'pre' allow us to do something before we save it to the database(in our case, encrypt the password)
  if(!this.isModified('password')) { //if we are not dealing with PW we will move on
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
}) 

const User = mongoose.model("User", userSchema);

export default User;