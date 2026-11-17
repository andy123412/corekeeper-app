async function cargarEquipos() {
    try {
        // Le pegamos a nuestra propia API
        const respuesta = await fetch('/api/equipos');
        const equipos = await respuesta.json();
        
        const contenedor = document.getElementById('contenedor-equipos');
        contenedor.innerHTML = ''; // Limpiamos el texto de "Cargando"

        equipos.forEach(equipo => {
            const div = document.createElement('div');
            div.className = 'tarjeta';
            // Usamos JSON y JavaScript para pintar los datos en pantalla
            div.innerHTML = `
                <strong>${equipo.nombre}</strong> (${equipo.tipo}) <br>
                Estado: <em>${equipo.estado}</em> <br>
                Adquirido: ${new Date(equipo.fecha_adquisicion).toLocaleDateString()}
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error('Error al cargar:', error);
    }
}

// Arrancamos la función apenas abre la página
cargarEquipos();