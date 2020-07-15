"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./config/constants");
const app = express_1.default();
app.use(express_1.default.json());
const publicPath = path_1.default.join(__dirname, "../../public");
console.log(publicPath);
app.use(express_1.default.static(publicPath));
app.get("/api/test", (req, res) => res.json({ test: "this is a test" }));
const server = app.listen(constants_1.PORT, () => {
    console.log(`Server is listening on port ${constants_1.PORT}`);
});
const wss = new ws_1.default.Server({ server });
wss.on('connection', connection => {
    console.log("connection ... ");
    connection.on('message', message => {
        console.log(`received: ${message}`);
    });
    connection.send(`message from server at: ` + new Date());
});
