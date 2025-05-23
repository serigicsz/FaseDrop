import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

function Graficas() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const historialGuardado = JSON.parse(localStorage.getItem('historial')) || [];
    setRegistros(historialGuardado);
  }, []);

  // Preparamos los datos para la gráfica de grados
  const gradosData = [1, 2, 3, 4, 5].map((grado) => ({
    name: `${grado}°`,
    alumnos: registros.filter((a) => Number(a.grado) === grado).length,
  }));

  // Preparamos los datos para la gráfica de distritos
  const distritos = ['Puente Piedra', 'Ventanilla', 'Los Olivos', 'Callao'];
  const distritosData = distritos.map((distrito) => ({
    name: distrito,
    alumnos: registros.filter((a) => a.distrito === distrito).length,
  }));

  const colores = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">Gráficas de Alumnos</h2>

      {/* Gráfica de barras por grado */}
      <h3 className="text-xl font-semibold mb-4">Cantidad de Alumnos por Grado</h3>
      <BarChart width={600} height={300} data={gradosData}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="alumnos" fill="#3B82F6" />
      </BarChart>

      {/* Gráfica de pastel por distrito */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Distribución de Alumnos por Distrito</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={distritosData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          dataKey="alumnos"
        >
          {distritosData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Graficas;
