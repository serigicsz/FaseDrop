import sys
import joblib
import json
import pandas as pd

# Cargar el modelo
modelo = joblib.load('modelo_entrenado.pkl')

# Leer datos de entrada
data_json = sys.stdin.read()
data = json.loads(data_json)

# Armar DataFrame igual que en el entrenamiento
df = pd.DataFrame([{
    'Edad': data['edad'],
    'Grado': data['grado'],
    'Conducta': data['conducta'],
    'Asistencia': data['asistencia'],
    'Matematica': data['matematicas'],
    'Comunicacion': data['comunicacion'],
    'Ciencias_Sociales': data['ciencias_sociales'],
    'CTA': data['cta'],
    'Ingles': data['ingles']
}])

# Predecir
prediccion = modelo.predict(df)[0]

# Mostrar resultado
print(prediccion)
