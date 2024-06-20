import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required to register"],
    minlength: [5, "Name must be minimum 5 characters"],
    maxlength: [25, "Name should not exceed maximum 25 characters"],
  },
  email: {
    type: String,
    unique:[true,'email must be unique'],
    match: [
        /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please enter a valid email",
      ],
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required:[true,'Password is required'],
  },
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export const UserModel = mongoose.model('users',userSchema);

