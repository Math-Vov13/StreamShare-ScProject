import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

const pool = new Pool({
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

console.log("Connecting to Database...")
pool.connect((err) => {
  if (err) {
    console.error("DB error:", err.message);
    return;
  }
  console.log("Database connected!")
})

export async function query(text: string, params?: any[]) {
  console.log("Query:", text);
  const response = await pool.query(text, params);
  console.log(`Resultat: [${response.rowCount}]\n`, response.rows);
  return response
}
// export const query = (text: string, params?: any[]) => pool.query(text, params);