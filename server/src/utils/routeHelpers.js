const knownPlaces = {
  saharanpur: { lat: 29.9671, lng: 77.551 },
  dehradun: { lat: 30.3165, lng: 78.0322 },
  haridwar: { lat: 29.9457, lng: 78.1642 },
  roorkee: { lat: 29.8543, lng: 77.888 },
  delhi: { lat: 28.6139, lng: 77.209 },
  jaipur: { lat: 26.9124, lng: 75.7873 },
  mumbai: { lat: 19.076, lng: 72.8777 },
  goa: { lat: 15.2993, lng: 74.124 },
  rishikesh: { lat: 30.0869, lng: 78.2676 }
};

function normalizePlaceName(placeName) {
  return placeName.toLowerCase().trim();
}

export function findKnownCoordinates(placeName) {
  const normalized = normalizePlaceName(placeName);
  return knownPlaces[normalized] || null;
}

export function buildRoutePolyline(source, destination) {
  const sourceCoordinates = findKnownCoordinates(source);
  const destinationCoordinates = findKnownCoordinates(destination);

  if (!sourceCoordinates || !destinationCoordinates) {
    return {
      sourceCoordinates,
      destinationCoordinates,
      routePolyline: []
    };
  }

  return {
    sourceCoordinates,
    destinationCoordinates,
    routePolyline: [sourceCoordinates, destinationCoordinates]
  };
}

export function attachRouteColor(trip) {
  const plainTrip = trip.toObject ? trip.toObject() : trip;

  return {
    ...plainTrip,
    routeColor: plainTrip.status === "Done" ? "#16a34a" : "#e11d48"
  };
}
