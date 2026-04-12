import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import RouteMap from "../components/RouteMap.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { createTripExpense, getTripExpenses } from "../api/expenseApi.js";
import { getTrip, markTripDone, resumeTrip } from "../api/tripApi.js";

export default function TripDetails() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadTrip() {
    const [{ data: tripData }, { data: expenseData }] = await Promise.all([
      getTrip(tripId),
      getTripExpenses(tripId)
    ]);

    setTrip(tripData.trip);
    setExpenses(expenseData.expenses);
  }

  useEffect(() => {
    loadTrip()
      .catch(() => setError("Could not load this trip."))
      .finally(() => setLoading(false));
  }, [tripId]);

  async function handleDone() {
    const { data } = await markTripDone(tripId);
    setTrip(data.trip);
  }

  async function handleResume() {
    const { data } = await resumeTrip(tripId);
    setTrip(data.trip);
  }

  async function handleAddExpense(payload) {
    const { data } = await createTripExpense(tripId, payload);
    setExpenses((current) => [data.expense, ...current]);
  }

  if (loading) {
    return <p className="notice">Loading trip...</p>;
  }

  if (error || !trip) {
    return <p className="error-text">{error || "Trip not found."}</p>;
  }

  const isDone = trip.status === "Done";

  return (
    <section className="content-stack">
      <div className="section-header">
        <div>
          <StatusBadge status={trip.status} />
          <h1>{trip.tripName}</h1>
          <p>
            {trip.source} to {trip.destination}
          </p>
        </div>
        {isDone ? (
          <button className="button secondary" type="button" onClick={handleResume}>
            Resume trip
          </button>
        ) : (
          <button className="button" type="button" onClick={handleDone}>
            Mark as done
          </button>
        )}
      </div>

      <RouteMap trip={trip} />

      <section className="split-panel">
        <div>
          <h2>Add expense</h2>
          {isDone && <p className="notice">Resume this trip before adding missed expenses.</p>}
          <ExpenseForm disabled={isDone} onSubmit={handleAddExpense} />
        </div>
        <div>
          <h2>Trip expenses</h2>
          <ExpenseList expenses={expenses} />
        </div>
      </section>
    </section>
  );
}
