import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location"
    },
    imageUrl: {
      type: String,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
