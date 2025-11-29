import { Link } from "react-router-dom";

export default function Medicines() {
  const medicines = [
    { id: 1, name: "Paracetamol", expiry: "2025-02-05", quantity: 10 },
    { id: 2, name: "Cetirizine", expiry: "2025-03-15", quantity: 5 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Medicines</h2>
        <Link
          to="/add-medicine"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          + Add Medicine
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Expiry</th>
              <th className="text-left py-2">Quantity</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="py-2">{m.name}</td>
                <td>{m.expiry}</td>
                <td>{m.quantity}</td>
                <td className="text-center">
                  <button className="text-blue-600 px-2">Edit</button>
                  <button className="text-red-600 px-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
