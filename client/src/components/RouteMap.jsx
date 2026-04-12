import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { getTripRouteColor } from "../utils/tripStatus.js";

const defaultRoute = [
  [29.9671, 77.551],
  [30.3165, 78.0322]
];

function getPositions(trip) {
  if (!trip?.routePolyline?.length) {
    return defaultRoute;
  }

  return trip.routePolyline.map((point) => [point.lat, point.lng]);
}

export default function RouteMap({ trip }) {
  const positions = getPositions(trip);
  const center = positions[Math.floor(positions.length / 2)];

  return (
    <section className="map-panel" aria-label="Trip route map">
      <MapContainer center={center} zoom={9} className="route-map" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          pathOptions={{
            color: getTripRouteColor(trip?.status),
            weight: 6
          }}
          positions={positions}
        />
      </MapContainer>
    </section>
  );
}
