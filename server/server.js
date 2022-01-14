const express = require('express');
const cors = require('cors');
const app = express();
const http = require("http").createServer(app)

app.use(express.json({extended: false}));

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)

app.use("/", (req, res) => {
    res.send("NodeJS server up and running.");
})

const port = process.env.PORT || 8000

http.listen(port, () => console.log(`NodeJS server up and running at ${port}`));