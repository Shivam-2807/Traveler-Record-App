import { isMemoryStore } from "../config/dataStore.js";
import Photo from "../models/Photo.js";
import Trip from "../models/Trip.js";
import { memoryDb } from "../utils/memoryDb.js";

export async function getTripPhotos(request, response, next) {
  try {
    if (isMemoryStore()) {
      const trip = memoryDb.findTripForUser(request.params.tripId, request.user._id);

      if (!trip) {
        response.status(404);
        throw new Error("Trip not found");
      }

      const photos = memoryDb.getPhotosForTrip(trip._id, request.user._id);
      response.json({ photos });
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

    const photos = await Photo.find({
      tripId: trip._id,
      userId: request.user._id
    }).sort({ createdAt: -1 });

    response.json({ photos });
  } catch (error) {
    next(error);
  }
}

export async function addTripPhoto(request, response, next) {
  try {
    const { tripId, locationId, imageUrl } = request.body;

    if (!tripId || !imageUrl) {
      response.status(400);
      throw new Error("Trip id and image URL are required");
    }

    if (isMemoryStore()) {
      const trip = memoryDb.findTripForUser(tripId, request.user._id);

      if (!trip) {
        response.status(404);
        throw new Error("Trip not found");
      }

      const photo = memoryDb.createPhoto({
        userId: request.user._id,
        tripId,
        locationId,
        imageUrl
      });

      response.status(201).json({ photo });
      return;
    }

    const trip = await Trip.findOne({
      _id: tripId,
      userId: request.user._id
    });

    if (!trip) {
      response.status(404);
      throw new Error("Trip not found");
    }

    const photo = await Photo.create({
      userId: request.user._id,
      tripId,
      locationId,
      imageUrl
    });

    response.status(201).json({ photo });
  } catch (error) {
    next(error);
  }
}
