import { formatCurrency } from "../utils/formatCurrency.js";

export default function ExpenseList({ expenses }) {
  if (!expenses.length) {
    return <p className="notice">No expenses recorded yet.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Paid by</th>
            <th>Split among</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.category}</td>
              <td>{formatCurrency(expense.amount)}</td>
              <td>{expense.paidBy}</td>
              <td>{expense.splitAmong?.join(", ") || "Solo"}</td>
              <td>{expense.note || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
