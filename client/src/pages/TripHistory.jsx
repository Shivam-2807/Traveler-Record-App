import { useEffect, useState } from "react";
import TripCard from "../components/TripCard.jsx";
import { getTrips } from "../api/tripApi.js";

export default function TripHistory() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrips()
      .then(({ data }) => {
        setTrips(data.trips.filter((trip) => trip.status === "Done"));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="content-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">Green routes</p>
          <h1>Trip history</h1>
        </div>
      </div>
      {loading && <p className="notice">Loading completed trips...</p>}
      {!loading && !trips.length && <p className="notice">No completed trips yet.</p>}
      <div className="card-grid">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </section>
  );
}
