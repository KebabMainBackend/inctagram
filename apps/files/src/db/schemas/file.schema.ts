import mongoose from 'mongoose';

export const FileImageSchema = new mongoose.Schema({
  url: String,
  width: Number,
  height: Number,
  ownerId: Number,
  type: { type: String },
  fileSize: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
