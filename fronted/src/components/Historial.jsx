import { useEffect, useState } from 'react';

function Historial() {
  const [registros, setRegistros] = useState([]);
  const [filtros, setFiltros] = useState({
    nombre: '',
    apellido: '',
    grado: '',
    seccion: '',
    nombrePeriodo: '',
    dni: ''
  });

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [indiceAEliminar, setIndiceAEliminar] = useState(null);

  useEffect(() => {
    const historialGuardado = JSON.parse(localStorage.getItem('historial')) || [];
    setRegistros(historialGuardado);
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const confirmarEliminar = (index) => {
    setIndiceAEliminar(index);
    setMostrarConfirmacion(true);
  };

  const eliminarRegistro = () => {
    const nuevosRegistros = registros.filter((_, i) => i !== indiceAEliminar);
    localStorage.setItem('historial', JSON.stringify(nuevosRegistros));
    setRegistros(nuevosRegistros);
    setMostrarConfirmacion(false);
    setIndiceAEliminar(null);
  };

  const registrosFiltrados = registros.filter((alumno) => {
    return (
      alumno.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
      alumno.apellido.toLowerCase().includes(filtros.apellido.toLowerCase()) &&
      (filtros.grado === '' || alumno.grado === filtros.grado) &&
      (filtros.seccion === '' || alumno.seccion === filtros.seccion) &&
      alumno.nombrePeriodo.toLowerCase().includes(filtros.nombrePeriodo.toLowerCase()) &&
      alumno.dni.toLowerCase().includes(filtros.dni.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">Historial de Alumnos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input name="nombre" value={filtros.nombre} onChange={handleFiltroChange} placeholder="Filtrar por Nombre" className="input" />
        <input name="apellido" value={filtros.apellido} onChange={handleFiltroChange} placeholder="Filtrar por Apellido" className="input" />
        <input name="dni" value={filtros.dni} onChange={handleFiltroChange} placeholder="Filtrar por DNI" className="input" />
        <select name="grado" value={filtros.grado} onChange={handleFiltroChange} className="input">
          <option value="">Todos los Grados</option>
          {[1, 2, 3, 4, 5].map((g) => (<option key={g} value={g}>{g}° Secundaria</option>))}
        </select>
        <select name="seccion" value={filtros.seccion} onChange={handleFiltroChange} className="input">
          <option value="">Todas las Secciones</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
        <input name="nombrePeriodo" value={filtros.nombrePeriodo} onChange={handleFiltroChange} placeholder="Filtrar por Periodo" className="input" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Apellido</th>
              <th className="py-2 px-4">DNI</th>
              <th className="py-2 px-4">Grado</th>
              <th className="py-2 px-4">Sección</th>
              <th className="py-2 px-4">Edad</th>
              <th className="py-2 px-4">Periodo</th>
              <th className="py-2 px-4">Asistencia</th>
              <th className="py-2 px-4">Conducta</th>
              <th className="py-2 px-4">Comentario</th>
              <th className="py-2 px-4">Deserción</th>
              <th className="py-2 px-4">Acción</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.length > 0 ? (
              registrosFiltrados.map((alumno, index) => {
                const indexOriginal = registros.indexOf(alumno);
                return (
                  <tr key={index} className="text-center border-b">
                    <td className="py-2 px-4">{alumno.nombre}</td>
                    <td className="py-2 px-4">{alumno.apellido}</td>
                    <td className="py-2 px-4">{alumno.dni}</td>
                    <td className="py-2 px-4">{alumno.grado}°</td>
                    <td className="py-2 px-4">{alumno.seccion}</td>
                    <td className="py-2 px-4">{alumno.edad}</td>
                    <td className="py-2 px-4">{alumno.nombrePeriodo}</td>
                    <td className="py-2 px-4">{alumno.asistencia}</td>
                    <td className="py-2 px-4">{alumno.conducta}</td>
                    <td className="py-2 px-4 max-w-xs truncate" title={alumno.comentarios}>{alumno.comentarios}</td>
                    <td className={`py-2 px-4 font-semibold ${alumno.desercion === 'Sí' ? 'text-red-600' : 'text-green-600'}`}>{alumno.desercion}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => confirmarEliminar(indexOriginal)}
                        className="text-blue-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="12" className="py-4 text-gray-500">No se encontraron registros.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <p className="text-lg font-medium mb-4">¿Estás seguro de eliminar este registro?</p>
            <div className="flex justify-center gap-4">
              <button onClick={eliminarRegistro} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Sí</button>
              <button onClick={() => setMostrarConfirmacion(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Historial;
