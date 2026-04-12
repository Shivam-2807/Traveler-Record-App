export function getTripRouteColor(status) {
  return status === "Done" ? "#16a34a" : "#e11d48";
}

export function getTripStatusLabel(status) {
  return status === "Done" ? "Completed" : "Active";
}

export function getTripStatusClass(status) {
  return status === "Done" ? "done" : "active";
}
