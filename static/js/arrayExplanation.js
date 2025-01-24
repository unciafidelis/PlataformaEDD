const arrayContainer = document.querySelector('.array-container');
const addButton = document.getElementById('add-btn');
const removeButton = document.getElementById('remove-btn');
const inputValue = document.getElementById('array-value');
let selectedElement = null;

// Función para agregar un elemento
function addElement() {
  const value = inputValue.value.trim();
  if (value === '') return;

  const arrayItem = document.createElement('div');
  arrayItem.classList.add('array-item');

  // Crear el índice
  const index = document.createElement('div');
  index.classList.add('index');
  index.textContent = arrayContainer.childElementCount;

  // Crear el valor
  const valueElement = document.createElement('div');
  valueElement.classList.add('value');
  valueElement.textContent = value;

  // Agregar índice y valor al elemento del arreglo
  arrayItem.appendChild(index);
  arrayItem.appendChild(valueElement);

  // Evento para seleccionar el elemento
  arrayItem.addEventListener('click', () => {
    clearSelection(); // Asegura que solo un elemento esté seleccionado
    selectedElement = arrayItem;
    arrayItem.style.backgroundColor = '#c0e8f0'; // Color de selección
    removeButton.disabled = false; // Habilita el botón de eliminar
  });

  arrayContainer.appendChild(arrayItem);
  inputValue.value = '';
  inputValue.focus();
  updateIndices();
}

// Limpia la selección actual
function clearSelection() {
  if (selectedElement) {
    selectedElement.style.backgroundColor = '#f0f0f0'; // Color por defecto
  }
  selectedElement = null;
  removeButton.disabled = true; // Deshabilita el botón de eliminar
}

// Evento para el botón "Agregar"
addButton.addEventListener('click', addElement);

// Evento para presionar la tecla "Enter" en el campo de entrada
inputValue.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addElement();
    event.preventDefault(); // Evita el comportamiento predeterminado
  }
});

// Evento para eliminar el elemento seleccionado
removeButton.addEventListener('click', () => {
  if (selectedElement) {
    arrayContainer.removeChild(selectedElement);
    clearSelection();
    updateIndices();
  }
});

// Actualizar los índices de los elementos en el arreglo
function updateIndices() {
  const items = document.querySelectorAll('.array-item');
  items.forEach((item, index) => {
    const indexElement = item.querySelector('.index');
    indexElement.textContent = index;
  });
}
