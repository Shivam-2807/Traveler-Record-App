import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="content-stack narrow-stack">
      <p className="eyebrow">Account</p>
      <h1>{user?.name}</h1>
      <div className="profile-list">
        <p>
          <strong>Email</strong>
          <span>{user?.email}</span>
        </p>
        <p>
          <strong>Verification</strong>
          <span>{user?.verifiedStatus || "Unverified"}</span>
        </p>
        <p>
          <strong>Plan</strong>
          <span>{user?.subscriptionType || "Free"}</span>
        </p>
      </div>
    </section>
  );
}
