import { randomUUID } from "crypto";

const db = {
  users: [],
  trips: [],
  expenses: [],
  photos: []
};

function createRecord(data) {
  const now = new Date();

  return {
    _id: randomUUID(),
    ...data,
    createdAt: now,
    updatedAt: now
  };
}

function sortNewest(records) {
  return [...records].sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
}

export const memoryDb = {
  findUserByEmail(email) {
    return db.users.find((user) => user.email === email.toLowerCase().trim()) || null;
  },

  findUserById(userId) {
    return db.users.find((user) => user._id === userId) || null;
  },

  createUser(data) {
    const user = createRecord({
      ...data,
      email: data.email.toLowerCase().trim(),
      verifiedStatus: "Unverified",
      subscriptionType: "Free"
    });
    db.users.push(user);
    return user;
  },

  getTripsForUser(userId) {
    return sortNewest(db.trips.filter((trip) => trip.userId === userId));
  },

  createTrip(data) {
    const trip = createRecord({
      ...data,
      status: "Active",
      startedAt: new Date()
    });
    db.trips.push(trip);
    return trip;
  },

  findTripForUser(tripId, userId) {
    return db.trips.find((trip) => trip._id === tripId && trip.userId === userId) || null;
  },

  updateTrip(tripId, userId, updates) {
    const trip = this.findTripForUser(tripId, userId);

    if (!trip) {
      return null;
    }

    Object.assign(trip, updates, { updatedAt: new Date() });
    return trip;
  },

  getExpensesForTrip(tripId, userId) {
    return sortNewest(
      db.expenses.filter((expense) => expense.tripId === tripId && expense.userId === userId)
    );
  },

  createExpense(data) {
    const expense = createRecord({
      ...data,
      date: new Date()
    });
    db.expenses.push(expense);
    return expense;
  },

  findExpenseForUser(expenseId, userId) {
    return db.expenses.find((expense) => expense._id === expenseId && expense.userId === userId) || null;
  },

  deleteExpense(expenseId, userId) {
    const index = db.expenses.findIndex(
      (expense) => expense._id === expenseId && expense.userId === userId
    );

    if (index === -1) {
      return false;
    }

    db.expenses.splice(index, 1);
    return true;
  },

  getPhotosForTrip(tripId, userId) {
    return sortNewest(db.photos.filter((photo) => photo.tripId === tripId && photo.userId === userId));
  },

  createPhoto(data) {
    const photo = createRecord({
      ...data,
      uploadDate: new Date()
    });
    db.photos.push(photo);
    return photo;
  }
};
