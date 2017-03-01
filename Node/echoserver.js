net = require("net");
var clients = [];
net.createServer(function(socket) {
	socket.name = socket.remoteAddress + ":" + socket.remotePort;
	clients.push(socket);
	socket.write("Welcome, " + socket.name + "\n");
	broadcast(socket.name + " joined!", socket);
	socket.on("data", function(data) {
		broadcast(socket.name + " : " + data, socket);
	});
	socket.on("end", function() {
		clients.splice(clients.indexOf(socket), 1);
		broadcast(socket.name + " left");
	});
	function broadcast(message, sender) {
		clients.forEach(function(client) {
			if(client === sender) return;
			client.write(message + "\n");
		});
	}
}).listen(8001);