import { useState } from "react";

export default function AddMedicine() {
  const [form, setForm] = useState({
    name: "",
    batchNumber: "",
    expiryDate: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted", form);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Medicine</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded-lg max-w-xl"
      >
        <label className="block mb-3">
          <span>Name</span>
          <input
            name="name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-3">
          <span>Batch Number</span>
          <input
            name="batchNumber"
            className="form-input"
            value={form.batchNumber}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-3">
          <span>Expiry Date</span>
          <input
            type="date"
            name="expiryDate"
            className="form-input"
            value={form.expiryDate}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-3">
          <span>Quantity</span>
          <input
            type="number"
            name="quantity"
            className="form-input"
            value={form.quantity}
            onChange={handleChange}
          />
        </label>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
