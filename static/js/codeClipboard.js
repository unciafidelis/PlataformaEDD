async function runCode() {
    const outputBlock = document.getElementById("outputBlock");
    outputBlock.textContent = "Running...";
    const codeBlock = document.getElementById("codeBlock").innerText;

    // Limpiar la indentación extra
    const cleanedCode = removeExtraIndentation(codeBlock);

    const pyodide = await loadPyodide();
    try {
      const result = await pyodide.runPython(cleanedCode);
      outputBlock.textContent = result || "Execution completed.";
    } catch (err) {
      outputBlock.textContent = `Error: ${err.message}`;
    }
  }

  function copyToClipboard() {
    const codeBlock = document.getElementById("codeBlock").innerText;
      
    // Limpiar la indentación extra
    const cleanedCode = removeExtraIndentation(codeBlock);

      navigator.clipboard.writeText(codeBlock).then(() => {
      const confirmation = document.getElementById("copyConfirmation");
      confirmation.classList.add("show");
      setTimeout(() => {
          confirmation.classList.remove("show");
      }, 2000);
      }).catch(err => {
          console.error("Failed to copy code: ", err);
      });
  }

  function removeExtraIndentation(code) {
    // Dividir el código en líneas y eliminar indentación innecesaria
    const lines = code.split("\n");
    const minIndent = Math.min(
      ...lines
        .filter(line => line.trim().length > 0)
        .map(line => line.match(/^(\s*)/)[1].length)
    );

    return lines.map(line => line.slice(minIndent)).join("\n");
  }