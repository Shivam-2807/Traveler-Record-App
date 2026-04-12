import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";

export default function TripCard({ trip }) {
  return (
    <article className="trip-card">
      <div>
        <StatusBadge status={trip.status} />
        <h3>{trip.tripName}</h3>
        <p>
          {trip.source} to {trip.destination}
        </p>
      </div>
      <Link className="button secondary" to={`/trips/${trip._id}`}>
        Open trip
      </Link>
    </article>
  );
}
