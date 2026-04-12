import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await register(form);
      navigate("/dashboard");
    } catch (requestError) {
      if (requestError.code === "ERR_NETWORK") {
        setError("Cannot connect to the API. Start the backend and make sure MongoDB is running.");
        return;
      }

      setError(requestError.response?.data?.message || "Registration failed");
    }
  }

  return (
    <section className="auth-panel">
      <h1>Create account</h1>
      <form className="stack-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" onChange={updateField} required value={form.name} />
        </label>
        <label>
          Email
          <input name="email" onChange={updateField} required type="email" value={form.email} />
        </label>
        <label>
          Password
          <input
            minLength="6"
            name="password"
            onChange={updateField}
            required
            type="password"
            value={form.password}
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button className="button" type="submit">
          Create account
        </button>
      </form>
      <p className="notice">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}
