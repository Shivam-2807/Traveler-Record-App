import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    paidBy: {
      type: String,
      required: true,
      trim: true
    },
    splitAmong: [
      {
        type: String,
        trim: true
      }
    ],
    note: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
