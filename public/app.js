// 1. Función para cargar la lista desde Neon DB
async function cargarEquipos() {
    try {
        const respuesta = await fetch('/api/equipos');
        const equipos = await respuesta.json();
        
        const contenedor = document.getElementById('contenedor-equipos');
        contenedor.innerHTML = ''; // Borramos el texto de "Cargando"

        equipos.forEach(equipo => {
            const div = document.createElement('div');
            div.className = 'tarjeta';
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

// Ejecutamos la carga inicial
cargarEquipos();

// 2. Función para guardar un equipo nuevo (TAREA 8)
document.getElementById('form-equipo').addEventListener('submit', async (evento) => {
    evento.preventDefault(); 

    const nombre = document.getElementById('input-nombre').value;
    const tipo = document.getElementById('select-tipo').value;

    try {
        const respuesta = await fetch('/api/equipos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, tipo })
        });

        if (respuesta.ok) {
            document.getElementById('form-equipo').reset(); // Limpiamos el form
            cargarEquipos(); // Recargamos la lista automáticamente
        } else {
            const dataError = await respuesta.json();
            alert('Error: ' + dataError.error);
        }
    } catch (error) {
        console.error('Error al guardar:', error);
        alert('Hubo un error de conexión al intentar guardar.');
    }
});