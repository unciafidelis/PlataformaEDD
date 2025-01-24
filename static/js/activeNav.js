
    // Obtener todos los enlaces de la barra de navegación
    const navItems = document.querySelectorAll('.nav-item');

    // Agregar un evento de clic a cada enlace
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Eliminar la clase 'active' de todos los elementos
            navItems.forEach(item => item.classList.remove('active'));

            // Agregar la clase 'active' al elemento clickeado
            this.classList.add('active');
        });
    });
