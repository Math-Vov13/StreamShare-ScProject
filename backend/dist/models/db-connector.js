"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });
const pool = new pg_1.Pool({
    host: "streamshare-db.c3aagkeyc1x2.eu-west-3.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "6QTrTHM7tUvTWeRRPLoK",
    database: "StreamShare_db",
    ssl: {
        rejectUnauthorized: false
    }
});
// const client = new Client({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });
// client.connect()
//   .then(() => console.log('Connected to PostgreSQL database!'))
//   .catch(err => console.error('Connection error', err.stack));
console.log("Connecting to Database...");
pool.connect((err) => {
    if (err) {
        console.error("DB error:", err.message);
        return;
    }
    console.log("Database connected!");
});
function query(text, params) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Query:", text);
        const response = yield pool.query(text, params);
        console.log(`Resultat: [${response.rowCount}]\n`, response.rows);
        return response;
    });
}
// export const query = (text: string, params?: any[]) => pool.query(text, params);
