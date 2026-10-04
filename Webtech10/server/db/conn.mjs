import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Successfully connected to MongoDB Atlas!");
} catch (e) {
  console.error("Error connecting to MongoDB Atlas:", e);
}

// Default database name is taken from the connection string.
// If you didn't specify one in ATLAS_URI, change "blogDB" below to your preferred name.
let db = conn.db(process.env.DB_NAME || "blogDB");

export default db;
