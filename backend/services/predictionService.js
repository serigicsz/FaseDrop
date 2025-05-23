import { PythonShell } from 'python-shell';

export const predecirDesercion = (datosAlumno) => {
  return new Promise((resolve, reject) => {
    const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './', // donde está tu predict.py
      args: [],
    };

    const pyshell = new PythonShell('predict.py', options);

    // Enviar los datos al script
    pyshell.send(JSON.stringify(datosAlumno));

    pyshell.on('message', (message) => {
      const resultado = parseInt(message);
      resolve(resultado === 1 ? 'Sí' : 'No');
    });

    pyshell.end((err) => {
      if (err) {
        reject(err);
      }
    });
  });
};
