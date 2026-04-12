import mongoose from "mongoose";

const coordinateSchema = new mongoose.Schema(
  {
    lat: Number,
    lng: Number
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    tripName: {
      type: String,
      required: true,
      trim: true
    },
    source: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    sourceCoordinates: coordinateSchema,
    destinationCoordinates: coordinateSchema,
    routePolyline: [coordinateSchema],
    status: {
      type: String,
      enum: ["Active", "Done"],
      default: "Active"
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: Date,
    resumedAt: Date
  },
  {
    timestamps: true
  }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
