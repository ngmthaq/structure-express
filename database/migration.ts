import { MongoClient } from "mongodb";
import "dotenv/config";

(async () => {
  try {
    // Master DB configs
    const host = process.env.APP_MASTER_DB_HOST || "";
    const name = process.env.APP_MASTER_DB_NAME || "";

    // Connect to mongoDB host
    const client = await MongoClient.connect(host);
    console.info(`>> Connected to host ${host}`);

    // Connect to mongoDB database
    const db = client.db(name);
    console.info(`>> Connected to database ${name}`);

    // Create migrations collection
    const migration = await db.createCollection("migrations");
    console.info(`>> Collection: ${migration.collectionName}`);

    // Create users collection
    const user = await db.createCollection("users");
    console.info(`>> Collection: ${user.collectionName}`);

    // Close connection
    client.close();
  } catch (error) {
    console.log(">> Database Migration Error:", error);
  } finally {
    process.exit();
  }
})();
