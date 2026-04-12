import { useState } from "react";

const initialForm = {
  category: "Travel",
  amount: "",
  paidBy: "",
  splitAmong: "",
  note: ""
};

export default function ExpenseForm({ disabled, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    try {
      await onSubmit({
        ...form,
        amount: Number(form.amount),
        splitAmong: form.splitAmong
          .split(",")
          .map((person) => person.trim())
          .filter(Boolean)
      });
      setForm(initialForm);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label>
        Category
        <select name="category" value={form.category} onChange={updateField} disabled={disabled}>
          <option>Travel</option>
          <option>Food</option>
          <option>Stay</option>
          <option>Fuel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
      </label>
      <label>
        Amount
        <input
          min="1"
          name="amount"
          onChange={updateField}
          placeholder="500"
          required
          type="number"
          value={form.amount}
          disabled={disabled}
        />
      </label>
      <label>
        Paid by
        <input
          name="paidBy"
          onChange={updateField}
          placeholder="Shivam"
          required
          value={form.paidBy}
          disabled={disabled}
        />
      </label>
      <label>
        Split among
        <input
          name="splitAmong"
          onChange={updateField}
          placeholder="Aman, Riya"
          value={form.splitAmong}
          disabled={disabled}
        />
      </label>
      <label className="wide-field">
        Note
        <input
          name="note"
          onChange={updateField}
          placeholder="Fuel near Roorkee"
          value={form.note}
          disabled={disabled}
        />
      </label>
      <button className="button" disabled={disabled || saving} type="submit">
        {saving ? "Saving..." : "Add expense"}
      </button>
    </form>
  );
}
