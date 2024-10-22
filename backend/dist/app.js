"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const log_1 = __importDefault(require("./middlewares/log"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const groups_1 = __importDefault(require("./routes/groups"));
const auth_users_1 = __importDefault(require("./routes/auth_users"));
const content_1 = __importDefault(require("./routes/content"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middlewares
app.use(express_1.default.json()); // Middleware pour parser le body JSON
app.use((0, cookie_parser_1.default)()); // Middleware pour parser les Cookies
app.use((0, cors_1.default)());
app.use(log_1.default);
// Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER');
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
});
// Routes
app.use("/api/v1/groups/auth", auth_1.default);
app.use("/api/v1/groups", auth_users_1.default);
app.use("/api/v1/groups", groups_1.default);
app.use("/api/v1/groups", users_1.default);
app.use("/api/v1/search", content_1.default);
// Redirections
app.use((req, res, next) => {
    if (req.originalUrl === '/groups') {
        res.redirect(301, '/api/v1/groups');
        // } else if (req.originalUrl === '/users') {
        //   res.redirect(301, '/api/v1/users');
    }
    else if (req.originalUrl === '/search') {
        res.redirect(301, '/api/v1/search');
    }
    else {
        next();
    }
});
// Endpoints
app.get("/", (_req, res) => {
    res.send("Welcome to StreamShare API ! :D");
});
app.get("/debug", (req, res) => {
    res.json({
        method: req.method,
        protocol: req.protocol,
        request: {
            url: req.url,
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers
        }
    });
});
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use((0, cors_1.default)(corsConfig));
app.options('*', (0, cors_1.default)(corsConfig));
// app.use(cors({ 
//   origin: 'http://localhost:3000'
//   // credentials: true,
// }));
// Listen Port (Start Server)
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
