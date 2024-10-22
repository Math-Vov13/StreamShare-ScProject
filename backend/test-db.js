const { Pool } = require('pg');


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

console.log("Connecting to Database...")
pool.connect((err) => {
  if (err) {
    console.error("DB error:", err.message);
    return;
  }
  console.log("Database connected!")
})