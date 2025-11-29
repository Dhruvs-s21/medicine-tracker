export default function Discover() {
  const donations = [
    { name: "Amoxicillin", city: "Delhi", expiry: "2025-03-10" },
    { name: "Vitamin C", city: "Delhi", expiry: "2025-04-01" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Discover Donations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {donations.map((d, idx) => (
          <div key={idx} className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold">{d.name}</h3>
            <p>City: {d.city}</p>
            <p>Expiry: {d.expiry}</p>

            <button className="mt-3 bg-green-600 text-white px-3 py-1 rounded-md">
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
