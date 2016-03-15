module.exports=function(io) {

	var markers = ['images/greendragon.png', 'images/dragon.png', 'images/greendragon.png'];

	io.sockets.on ('connection',function(socket) {
		marker = markers[0];
		markers.splice(0, 1);
		marker2 = markers[0];
		socket.emit('marker', marker);
		socket.emit('marker2', marker2);
		socket.on('posMarker', function(pos){
			socket.broadcast.emit('pos', pos);
		});
	});
}