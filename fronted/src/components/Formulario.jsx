import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Formulario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    grado: '',
    seccion: '',
    edad: '',
    conducta: '',
    matematicas: '',
    comunicacion: '',
    ciencias_sociales: '',
    cta: '',
    ingles: '',
    distrito: '',
    comentarios: '',
    tipoPeriodo: '',
    nombrePeriodo: '',
    asistencia: '',
  });

  const [resultadoDesercion, setResultadoDesercion] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    const {
      nombre, apellido, dni, grado, seccion, edad, conducta,
      matematicas, comunicacion, ciencias_sociales, cta, ingles,
      distrito, tipoPeriodo, nombrePeriodo, asistencia
    } = formData;

    if (
      !nombre || !apellido || !dni || !grado || !seccion || !edad ||
      !conducta || !matematicas || !comunicacion || !ciencias_sociales ||
      !cta || !ingles || !distrito || !tipoPeriodo || !nombrePeriodo || !asistencia
    ) {
      return false;
    }

    if (!/^\d{8}$/.test(dni)) return false;

    const nums = [
      Number(conducta),
      Number(matematicas),
      Number(comunicacion),
      Number(ciencias_sociales),
      Number(cta),
      Number(ingles),
      Number(asistencia)
    ];
    if (nums.some(n => n < 5 || n > 20)) return false;
    if (Number(edad) < 12 || Number(edad) > 17) return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      toast.error('Datos incorrectos. Verifica que el DNI tenga 8 dígitos y que los valores estén dentro del rango.');
      return;
    }

    const desercion = Math.random() < 0.5 ? 'Sí' : 'No';

    const alumnoConPrediccion = {
      ...formData,
      desercion
    };

    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(alumnoConPrediccion);
    localStorage.setItem('historial', JSON.stringify(historial));

    toast.success('Alumno registrado exitosamente.');
    setResultadoDesercion(desercion);

    setFormData({
      nombre: '',
      apellido: '',
      dni: '',
      grado: '',
      seccion: '',
      edad: '',
      conducta: '',
      matematicas: '',
      comunicacion: '',
      ciencias_sociales: '',
      cta: '',
      ingles: '',
      distrito: '',
      comentarios: '',
      tipoPeriodo: '',
      nombrePeriodo: '',
      asistencia: '',
    });

    // navigate('/historial');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">Registrar Alumno</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="input" />
        <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" className="input" />

        <input
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          placeholder="DNI (8 dígitos)"
          type="text"
          maxLength="8"
          pattern="\d*"
          className="input"
        />

        <select name="grado" value={formData.grado} onChange={handleChange} className="input">
          <option value="">Seleccione Grado</option>
          {[1, 2, 3, 4, 5].map((g) => (<option key={g} value={g}>{g}° Secundaria</option>))}
        </select>

        <select name="seccion" value={formData.seccion} onChange={handleChange} className="input">
          <option value="">Seleccione Sección</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <select name="edad" value={formData.edad} onChange={handleChange} className="input">
          <option value="">Seleccione Edad</option>
          {[12, 13, 14, 15, 16, 17].map((e) => (<option key={e} value={e}>{e} años</option>))}
        </select>

        <input name="conducta" value={formData.conducta} onChange={handleChange} placeholder="Conducta (5-20)" type="number" className="input" />
        <input name="matematicas" value={formData.matematicas} onChange={handleChange} placeholder="Matemáticas (5-20)" type="number" className="input" />
        <input name="comunicacion" value={formData.comunicacion} onChange={handleChange} placeholder="Comunicación (5-20)" type="number" className="input" />
        <input name="ciencias_sociales" value={formData.ciencias_sociales} onChange={handleChange} placeholder="Ciencias Sociales (5-20)" type="number" className="input" />
        <input name="cta" value={formData.cta} onChange={handleChange} placeholder="CTA (5-20)" type="number" className="input" />
        <input name="ingles" value={formData.ingles} onChange={handleChange} placeholder="Inglés (5-20)" type="number" className="input" />

        <select name="distrito" value={formData.distrito} onChange={handleChange} className="input">
          <option value="">Seleccione Distrito</option>
          <option value="Puente Piedra">Puente Piedra</option>
          <option value="Ventanilla">Ventanilla</option>
          <option value="Los Olivos">Los Olivos</option>
          <option value="Callao">Callao</option>
          <option value="Otros">Otros</option>
        </select>

        <textarea name="comentarios" value={formData.comentarios} onChange={handleChange} placeholder="Comentarios" className="input md:col-span-2"></textarea>

        <select name="tipoPeriodo" value={formData.tipoPeriodo} onChange={handleChange} className="input">
          <option value="">Seleccione Tipo de Periodo</option>
          <option value="Bimestre">Bimestre</option>
          <option value="Trimestre">Trimestre</option>
        </select>

        <input name="nombrePeriodo" value={formData.nombrePeriodo} onChange={handleChange} placeholder="Nombre del Periodo (ej. Primer Bimestre)" className="input" />

        <input name="asistencia" value={formData.asistencia} onChange={handleChange} placeholder="Asistencia (5-20)" type="number" className="input" />

        <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded col-span-1 md:col-span-2 hover:bg-blue-800">
          Guardar Alumno
        </button>

        {resultadoDesercion && (
          <p
            className={`text-lg font-semibold mt-4 md:col-span-2 text-center ${
              resultadoDesercion === 'Sí' ? 'text-red-600' : 'text-green-600'
            }`}
          >
            Resultado de deserción: {resultadoDesercion}
          </p>
        )}

      </form>
    </div>
  );
}

export default Formulario;
