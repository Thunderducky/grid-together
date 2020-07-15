import http from 'http';
import express from 'express';
import WebSocket from 'ws';
import path from "path";
import { PORT } from './config/constants';

const app = express();
app.use(express.json());
const publicPath = path.join(__dirname, "../../public");
console.log(publicPath);
app.use(express.static(publicPath));

app.get("/api/test", (req, res) => res.json({ test: "this is a test" }));

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

const wss = new WebSocket.Server({ server })
wss.on('connection', connection => {
    console.log("connection ... ");
    connection.on('message', message => {
        console.log(`received: ${message}`);
    })
    connection.send(`message from server at: ` + new Date());
})