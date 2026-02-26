export default function Content() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-sm text-gray-500">Ventas</p>
        <h3 className="text-2xl font-bold">$0</h3>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-sm text-gray-500">Clientes</p>
        <h3 className="text-2xl font-bold">0</h3>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-sm text-gray-500">Facturas</p>
        <h3 className="text-2xl font-bold">0</h3>
      </div>
    </div>
  );
}