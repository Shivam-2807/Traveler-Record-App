import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TripCard from "../components/TripCard.jsx";
import { getTrips } from "../api/tripApi.js";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTrips()
      .then(({ data }) => setTrips(data.trips))
      .catch(() => setError("Could not load trips. Check that the API is running."))
      .finally(() => setLoading(false));
  }, []);

  const activeTrips = trips.filter((trip) => trip.status === "Active");
  const doneTrips = trips.filter((trip) => trip.status === "Done");

  return (
    <section className="content-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Your trips</h1>
        </div>
        <Link className="button" to="/trips/new">
          Create trip
        </Link>
      </div>

      <div className="stats-grid">
        <article>
          <strong>{activeTrips.length}</strong>
          <span>Active trips</span>
        </article>
        <article>
          <strong>{doneTrips.length}</strong>
          <span>Completed trips</span>
        </article>
        <article>
          <strong>{trips.length}</strong>
          <span>Total records</span>
        </article>
      </div>

      {loading && <p className="notice">Loading trips...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && !trips.length && (
        <p className="notice">Create your first trip to start the travel record.</p>
      )}

      <div className="card-grid">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </section>
  );
}
