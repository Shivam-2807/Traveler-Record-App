import { isMemoryStore } from "../config/dataStore.js";
import Expense from "../models/Expense.js";
import { memoryDb } from "../utils/memoryDb.js";

export async function deleteExpense(request, response, next) {
  try {
    if (isMemoryStore()) {
      const deleted = memoryDb.deleteExpense(request.params.expenseId, request.user._id);

      if (!deleted) {
        response.status(404);
        throw new Error("Expense not found");
      }

      response.json({ message: "Expense deleted" });
      return;
    }

    const expense = await Expense.findOne({
      _id: request.params.expenseId,
      userId: request.user._id
    });

    if (!expense) {
      response.status(404);
      throw new Error("Expense not found");
    }

    await expense.deleteOne();
    response.json({ message: "Expense deleted" });
  } catch (error) {
    next(error);
  }
}
