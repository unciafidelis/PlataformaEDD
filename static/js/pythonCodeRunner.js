async function runCode() {
    const outputContainer = document.getElementById("outputContainer");
    outputContainer.innerHTML = "<h2>Resultado</h2>"; // Limpiar resultados previos

    const codeInput = document.getElementById("codeInput").value;
    
    const pyodide = await loadPyodide();
    await pyodide.loadPackage("numpy");
    // Variables para almacenar mensajes de input y respuestas del usuario
    let inputIndex = 0;
    const inputs = [];
    const messages = [];

    // Modificar el código Python para interceptar inputs
    const modifiedCode = codeInput.replace(/input\((["'].*?["']|\s*)\)/g, (_, promptText) => {
      const userMessage = promptText.trim().replace(/^["']|["']$/g, "");
      messages.push(userMessage || "Ingrese un dato:"); // Guardar el texto del input
      return `__inputs[${inputIndex++}]`; // Sustituir con una variable de índice
    });

    try {
      // Pedir entradas al usuario antes de ejecutar el código
      for (const message of messages) {
        const userInput = prompt(message); // Mostrar mensaje en cuadro de diálogo
        inputs.push(userInput || ""); // Almacenar la respuesta
      }

      // Redirigir la salida estándar de Python
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()  # Redirigir salida estándar
sys.stderr = StringIO()  # Redirigir salida de error
      `);

      // Pasar las entradas al entorno de ejecución Python
      pyodide.globals.set("__inputs", inputs);

      // Ejecutar el código modificado
      await pyodide.runPython(modifiedCode);

      // Capturar exclusivamente la salida de los print()
      const result = pyodide.runPython("sys.stdout.getvalue().strip()");

      // Mostrar solo el contenido de los print() en el contenedor de resultados
      if (result) {
        result
          .split("\n")
          .forEach((line) => {
            // Ignorar cualquier línea que coincida con mensajes de input
            if (!messages.some((msg) => line.includes(msg))) {
              const resultItem = document.createElement("div");
              resultItem.className = "result-item";
              resultItem.textContent = line.trim(); // Mostrar línea de salida
              outputContainer.appendChild(resultItem);
            }
          });
      } else {
        const noOutput = document.createElement("div");
        noOutput.textContent = "No hubo salida del programa.";
        outputContainer.appendChild(noOutput);
      }
    } catch (err) {
      // Manejar errores
      const errorItem = document.createElement("div");
      errorItem.className = "result-item";
      errorItem.style.color = "red";
      errorItem.textContent = `Error: ${err.message}`;
      outputContainer.appendChild(errorItem);
    }
  }