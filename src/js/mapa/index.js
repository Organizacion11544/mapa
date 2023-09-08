import L from "leaflet"


const map = L.map('map', {
    center: [15.525158, -90.32959],
    zoom: 7,
})

const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const markerLayer = L.layerGroup(); 

const icon = L.icon({
    iconUrl : './images/cit.png',
    iconSize : [35, 35]
})

const marker = L.marker([15.525158, -90.32959],{
    icon
}).addTo(markerLayer)

var tooltip = L.tooltip()
    .setLatLng([15.525158, -90.32959])
    .setContent('Hello world!<br />This is a nice tooltip.')
    .addTo(map);

    var popup = L.popup()
    .setLatLng([15.525158, -90.32959])
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')

    marker.bindPopup(popup)

    const coordenadas = [
        [14.1, -90.5],
        [14.3, -90.8],
        [14.6, -90.9],
        [15.0, -90.6],
        [15.3, -90.7]
      ];

var polygon = L.polygon(coordenadas, {color: 'red'}).addTo(map);
L.circle([14.6, -90.9], {radius: 5000}).addTo(map);
markerLayer.addTo(map)