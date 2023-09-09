// Importación de bibliotecas y módulos necesarios
import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";
import { validarFormulario, Toast, confirmacion } from "../funciones";
import Datatable from "datatables.net-bs5";
import { lenguaje } from "../lenguaje";
import L from "leaflet";

// Obtener el elemento del botón de actualización
const butonActualizar = document.getElementById("actualizar");

// Creación del mapa Leaflet
const map = L.map('mapa', {
    center: [15.52, -90.32], // Centro del mapa
    zoom: 5, // Nivel de zoom inicial
    maxZoom: 15, // Zoom máximo permitido
    minZoom: 1, // Zoom mínimo permitido
});

// Capas de mapa
const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const carreteraLayer = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Capa de marcadores
const markerLayer = L.layerGroup();

// Icono personalizado para los marcadores
const icono = L.icon({
    iconUrl: './images/cit.png',
    iconSize: [35, 35]
});

// Función para crear un círculo alrededor de un marcador
function crearCirculoAlrededor(latitud, longitud) {
    const radioCirculo = 50000; // Define el radio del círculo en metros
    L.circle([latitud, longitud], {
        radius: radioCirculo,
        fillOpacity: 0.2, // Cambia la opacidad del relleno si es necesario
    }).addTo(markerLayer);
}

// Agregar capas al mapa
mapLayer.addTo(map);
carreteraLayer.addTo(map);
markerLayer.addTo(map);

// Manejar el evento de clic en el mapa
map.on('click', (e) => {
    console.log(e);
    alert('Selecciona un marcador');
});

// Función para buscar coordenadas y actualizar el mapa
const buscar = async () => {
    const url = `/mapa/API/mapa/buscar`;

    // Configuración de la solicitud
    const config = {
        method: 'GET'
    };

    try {
        // Realizar la solicitud de búsqueda
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        console.log(data);

        // Limpiar marcadores existentes antes de agregar nuevos
        markerLayer.clearLayers();

        if (data && data.length > 0) {
            // Iterar sobre los registros y agregar marcadores al mapa con círculos
            data.forEach(registro => {
                const latitud = parseFloat(registro.coor_latitud);
                const longitud = parseFloat(registro.coor_longitud);

                if (!isNaN(latitud) && !isNaN(longitud)) {
                    // Crear un círculo alrededor del marcador
                    crearCirculoAlrededor(latitud, longitud);

                    const nuevoMarcador = L.marker([latitud, longitud], {
                        icon: icono,
                        draggable: true
                    });

                    const popup = L.popup()
                        .setLatLng([latitud, longitud])
                        .setContent(`<p>Nombre: ${registro.coor_descr}</p>
                                 <p>Latitud: ${latitud}</p>
                                 <p>Longitud: ${longitud}</p>`);

                    nuevoMarcador.bindPopup(popup);
                    nuevoMarcador.addTo(markerLayer);
                }
            });
        } else {
            // Mostrar mensaje si no se encontraron registros
            Toast.fire({
                title: 'No se encontraron registros',
                icon: 'info'
            });
        }
    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al cargar los datos desde la base de datos:', error);
    }
};

// Agregar un evento de clic al botón de actualización
butonActualizar.addEventListener("click", () => {
    // Mostrar un mensaje de actualización
    Toast.fire({
        title: 'Actualizando datos...',
        icon: 'info',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    // Ejecutar la función de búsqueda para actualizar el mapa
    buscar();
});
