import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../api/tripApi.js";

export default function CreateTrip() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ tripName: "", source: "", destination: "" });
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const { data } = await createTrip(form);
      navigate(`/trips/${data.trip._id}`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not create trip");
    }
  }

  return (
    <section className="auth-panel wide-panel">
      <p className="eyebrow">New journey</p>
      <h1>Create trip</h1>
      <form className="stack-form" onSubmit={handleSubmit}>
        <label>
          Trip name
          <input
            name="tripName"
            onChange={updateField}
            placeholder="Saharanpur to Dehradun"
            required
            value={form.tripName}
          />
        </label>
        <label>
          Source
          <input
            name="source"
            onChange={updateField}
            placeholder="Saharanpur"
            required
            value={form.source}
          />
        </label>
        <label>
          Destination
          <input
            name="destination"
            onChange={updateField}
            placeholder="Dehradun"
            required
            value={form.destination}
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button className="button" type="submit">
          Create active trip
        </button>
      </form>
    </section>
  );
}
