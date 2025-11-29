import Card from "../components/Card";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Medicines" value="12" />
        <Card title="Expiring Soon" value="3" />
        <Card title="Donations Made" value="5" />
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Recent Expiring Medicines</h3>

        <div className="bg-white shadow rounded-lg p-4">
          <ul className="divide-y">
            <li className="py-2">Paracetamol - Expiry: 2025-01-05</li>
            <li className="py-2">Cough Syrup - Expiry: 2025-01-08</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
