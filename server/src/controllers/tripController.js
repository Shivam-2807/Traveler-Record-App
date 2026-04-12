import Expense from "../models/Expense.js";
import Trip from "../models/Trip.js";
import { isMemoryStore } from "../config/dataStore.js";
import { memoryDb } from "../utils/memoryDb.js";
import { attachRouteColor, buildRoutePolyline } from "../utils/routeHelpers.js";

export async function getTrips(request, response, next) {
  try {
    if (isMemoryStore()) {
      const trips = memoryDb.getTripsForUser(request.user._id);
      response.json({ trips: trips.map(attachRouteColor) });
      return;
    }

    const trips = await Trip.find({ userId: request.user._id }).sort({ createdAt: -1 });
    response.json({ trips: trips.map(attachRouteColor) });
  } catch (error) {
    next(error);
  }
}

export async function createTrip(request, response, next) {
  try {
    const { tripName, source, destination } = request.body;

    if (!tripName || !source || !destination) {
      response.status(400);
      throw new Error("Trip name, source, and destination are required");
    }

    const routeData = buildRoutePolyline(source, destination);

    if (isMemoryStore()) {
      const trip = memoryDb.createTrip({
        userId: request.user._id,
        tripName,
        source,
        destination,
        ...routeData
      });

      response.status(201).json({ trip: attachRouteColor(trip) });
      return;
    }

    const trip = await Trip.create({
      userId: request.user._id,
      tripName,
      source,
      destination,
      ...routeData
    });

    response.status(201).json({ trip: attachRouteColor(trip) });
  } catch (error) {
    next(error);
  }
}

export async function getTripById(request, response, next) {
  try {
    if (isMemoryStore()) {
      const trip = memoryDb.findTripForUser(request.params.tripId, request.user._id);

      if (!trip) {
        response.status(404);
        throw new Error("Trip not found");
      }

      response.json({ trip: attachRouteColor(trip) });
      return;
    }

    const trip = await Trip.findOne({
      _id: request.params.tripId,
      userId: request.user._id
    });

    if (!trip) {
      response.status(404);
      throw new Error("Trip not found");
    }

    response.json({ trip: attachRouteColor(trip) });
  } catch (error) {
    next(error);
  }
}

export async function markTripDone(request, response, next) {
  try {
    if (isMemoryStore()) {
      const trip = memoryDb.updateTrip(request.params.tripId, request.user._id, {
        status: "Done",
        completedAt: new Date()
      });

      if (!trip) {
        response.status(404);
        throw new Error("Trip not found");
      }

      response.json({ trip: attachRouteColor(trip) });
      return;
    }

    const trip = await Trip.findOne({
      _id: request.params.tripId,
      userId: request.user._id
    });

    if (!trip) {
      response.status(404);
      throw new Error("Trip not found");
    }

    trip.status = "Done";
    trip.completedAt = new Date();
    await trip.save();

    response.json({ trip: attachRouteColor(trip) });
  } catch (error) {
    next(error);
  }
}

export async function resumeTrip(request, response, next) {
  try {
    if (isMemoryStore()) {
      const trip = memoryDb.updateTrip(request.params.tripId, request.user._id, {
        status: "Active",
        resumedAt: new Date(),
        completedAt: undefined
      });

      if (!trip) {
        response.status(404);
        throw new Error("Trip not found");
      }

      response.json({ trip: attachRouteColor(trip) });
      return;
    }

    const trip = await Trip.findOne({
      _id: request.params.tripId,
      userId: request.user._id
    });

    if (!trip) {
      response.status(404);
      throw new Error("Trip not found");
    }

    trip.status = "Active";
    trip.resumedAt = new Date();
    trip.completedAt = undefined;
    await trip.save();

    response.json({ trip: attachRouteColor(trip) });
  } catch (error) {
    next(error);
  }
}

export async function getTripExpenses(request, response, next) {
  try {
    if (isMemoryStore()) {
      const trip = memoryDb.findTripForUser(request.params.tripId, request.user._id);

      if (!trip) {
        response.status(404);
        throw new Error("Trip not found");
      }

      const expenses = memoryDb.getExpensesForTrip(trip._id, request.user._id);
      response.json({ expenses });
      return;
    }

    const trip = await Trip.findOne({
      _id: request.params.tripId,
      userId: request.user._id
    });

    if (!trip) {
      response.status(404);
      throw new Error("Trip not found");
    }

    const expenses = await Expense.find({
      tripId: trip._id,
      userId: request.user._id
    }).sort({ createdAt: -1 });

    response.json({ expenses });
  } catch (error) {
    next(error);
  }
}

export async function createTripExpense(request, response, next) {
  try {
    if (isMemoryStore()) {
      const trip = memoryDb.findTripForUser(request.params.tripId, request.user._id);

      if (!trip) {
        response.status(404);
        throw new Error("Trip not found");
      }

      if (trip.status !== "Active") {
        response.status(400);
        throw new Error("Resume this trip before adding expenses");
      }

      const { category, amount, paidBy, splitAmong = [], note } = request.body;

      if (!category || !amount || !paidBy) {
        response.status(400);
        throw new Error("Category, amount, and paid by are required");
      }

      const expense = memoryDb.createExpense({
        tripId: trip._id,
        userId: request.user._id,
        category,
        amount,
        paidBy,
        splitAmong,
        note
      });

      response.status(201).json({ expense });
      return;
    }

    const trip = await Trip.findOne({
      _id: request.params.tripId,
      userId: request.user._id
    });

    if (!trip) {
      response.status(404);
      throw new Error("Trip not found");
    }

    if (trip.status !== "Active") {
      response.status(400);
      throw new Error("Resume this trip before adding expenses");
    }

    const { category, amount, paidBy, splitAmong = [], note } = request.body;

    if (!category || !amount || !paidBy) {
      response.status(400);
      throw new Error("Category, amount, and paid by are required");
    }

    const expense = await Expense.create({
      tripId: trip._id,
      userId: request.user._id,
      category,
      amount,
      paidBy,
      splitAmong,
      note
    });

    response.status(201).json({ expense });
  } catch (error) {
    next(error);
  }
}
