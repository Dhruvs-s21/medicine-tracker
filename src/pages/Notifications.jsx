export default function Notifications() {
  const notifications = [
    {
      title: "Medicine expiring soon",
      body: "Paracetamol expires in 3 days",
    },
    {
      title: "Donation Request",
      body: "Someone requested Cetirizine you marked available.",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      <div className="space-y-4">
        {notifications.map((n, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold">{n.title}</h3>
            <p className="text-gray-600">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
