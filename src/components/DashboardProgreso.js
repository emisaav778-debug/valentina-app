'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardProgreso({ datos }) {
  if (!datos || datos.length === 0) return <p className="text-gray-500">Aún no hay registros de progreso.</p>;

  return (
    <div className="h-64 w-full bg-white dark:bg-[#111] p-4 rounded-xl border border-gray-200 dark:border-gray-800">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="fecha" stroke="#888" />
          <YAxis domain={['auto', 'auto']} stroke="#888" />
          <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #444'}} />
          <Line type="monotone" dataKey="peso" stroke="#dc2626" strokeWidth={3} dot={{r: 6}} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}