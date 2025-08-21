import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  contact: { type: String },
  address: { type: String },
  profile: { type: String },
  userType: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const userModel = mongoose.model('users', userSchema);

// Property Schema
const propertySchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  area: { type: Number },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  description: { type: String },
  location: { type: String },
  pic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const propertyModel = mongoose.model('properties', propertySchema);

// Buyer Schema
const buyerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'properties' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const buyerModel = mongoose.model('buyers', buyerSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
  subject: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const ContactModel = mongoose.model('contacts', contactSchema);
