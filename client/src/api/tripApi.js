import api from "./axios.js";

export function getTrips() {
  return api.get("/trips");
}

export function getTrip(tripId) {
  return api.get(`/trips/${tripId}`);
}

export function createTrip(payload) {
  return api.post("/trips", payload);
}

export function markTripDone(tripId) {
  return api.patch(`/trips/${tripId}/done`);
}

export function resumeTrip(tripId) {
  return api.patch(`/trips/${tripId}/resume`);
}
