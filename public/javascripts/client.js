$(document).ready(function() {

	var dragonMarker;
	var dragonMarker2;

	var socket = io.connect("192.168.1.17:3000");

	socket.on('connect',function(){
		console.log("Conectado con socket");
	});

	socket.on('pos', function(pos) {
		L.marker(pos, {icon: dragonMarker2}).addTo(mymap);
	});

	var mymap = L.map('mapid').setView([51.505, -0.09], 13);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyZ29uIiwiYSI6ImNpbGxpYjYwZjAwMzV1MWx6NzlhZXZ6Z3oifQ.KtAxNompyR0Jd7e3pM-4iQ', {
	    maxZoom: 18,
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    id: 'margon.pc8i3mka'
	}).addTo(mymap);

	socket.on('marker', function(marker){
		dragonMarker = L.icon({
			iconUrl: marker,
			iconSize: [50, 60]
		});
	});

	socket.on('marker2', function(marker2){
		dragonMarker2 = L.icon({
			iconUrl: marker2,
			iconSize: [50, 60]
		});
	});
/*
	var dragonMarker = L.icon({
		iconUrl: 'images/greendragon.png',
		iconSize: [50, 60]
	});

	var dragon2Marker = L.icon({
		iconUrl: 'images/dragon.png',
		iconSize: [60, 60]
	});
*/
	mymap.on('click', onMapClick);

	function onMapClick(e) {
		pos = e.latlng;
		var marker = L.marker(pos, {icon: dragonMarker}).addTo(mymap);
		socket.emit('posMarker', pos);
	}
});