import { getTripStatusClass, getTripStatusLabel } from "../utils/tripStatus.js";

export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${getTripStatusClass(status)}`}>
      {getTripStatusLabel(status)}
    </span>
  );
}
