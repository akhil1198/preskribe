const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const dotenv = require("dotenv");
dotenv.config();

const connection = require("./app/config/connection");
const session = require("./app/sessions/index")

connection();

app.use(express.json({ extended: false }));

app.use(session)	//calling session middleware

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

//create an IO server instance
let ioServer = app => {
	app.locals.chatrooms = [];
	const server = require('http').Server(app)
	const io = require('socket.io')(server, {
		pingTimeout: 60000,
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"]
		}
	})
	io.use((socket, next) => {
		require('./app/sessions/index')(socket.request, {}, next)
	})
	require('./app/socket')(io, app)
	return server;
}

app.use("/api/pets", require("./app/routes/PetRoutes"));
app.use("/api/vets", require("./app/routes/VetRoutes"));
app.use("/api/chat", require("./app/routes/ChatRoutes"));
app.use("/api", (req, res) => {
	res.send("NodeJS server up and running.");
});

const port = process.env.PORT;
console.log(process.env.PORT);

ioServer(app).listen(port, () => console.log(`NodeJS server up and running at ${port}`));
