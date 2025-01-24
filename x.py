# Inicializar el acumulador y el contador
from numpy import random
        
AC = 0
I = 1
        
# Bucle para pedir 50 calificaciones
while I <= 50:
    x = random.randint(10)           
    # Sumar la calificación al acumulador
    AC += x
            
    # Incrementar el contador
    I += 1

# Calcular el promedio
PROM = AC / 50
        
# Mostrar el resultado
print(f"El promedio de las 50 calificaciones es: {PROM}")
        
# Inicializar el contador de calificaciones mayores al promedio
CONT = 0
I = 1
        
# Definir un valor para el promedio
PROM = float(input("Ingrese el valor del promedio: "))
        
# Bucle para pedir 2 calificaciones
while I <= 50:
    x = random.randint(10)
    if x > PROM:
        CONT += 1
            
    # Incrementar el contador de iteraciones
    I += 1
        
# Mostrar el resultado
print(f"Cantidad de calificaciones mayores que el promedio: {CONT}")