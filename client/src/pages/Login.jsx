import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await login(form);
      navigate("/dashboard");
    } catch (requestError) {
      if (requestError.code === "ERR_NETWORK") {
        setError("Cannot connect to the API. Start the backend and make sure MongoDB is running.");
        return;
      }

      setError(requestError.response?.data?.message || "Login failed");
    }
  }

  return (
    <section className="auth-panel">
      <h1>Login</h1>
      <form className="stack-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" onChange={updateField} required type="email" value={form.email} />
        </label>
        <label>
          Password
          <input
            name="password"
            onChange={updateField}
            required
            type="password"
            value={form.password}
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button className="button" type="submit">
          Login
        </button>
      </form>
      <p className="notice">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
}
