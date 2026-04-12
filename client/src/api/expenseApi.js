import api from "./axios.js";

export function getTripExpenses(tripId) {
  return api.get(`/trips/${tripId}/expenses`);
}

export function createTripExpense(tripId, payload) {
  return api.post(`/trips/${tripId}/expenses`, payload);
}

export function deleteExpense(expenseId) {
  return api.delete(`/expenses/${expenseId}`);
}
