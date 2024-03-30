import { MongoClient } from "mongodb";
import "dotenv/config";

(async () => {
  try {
    // Master DB configs
    const host = process.env.APP_MASTER_DB_HOST || "";
    const backupHost = process.env.APP_BACKUP_DB_HOST || "";
    const name = process.env.APP_DB_NAME || "";

    // Connect to mongoDB host
    const client = await MongoClient.connect(host);
    const backupClient = await MongoClient.connect(backupHost);
    console.info(`>> Connected to master host ${host}`);
    console.info(`>> Connected to backup host ${backupHost}`);

    // Connect to mongoDB database
    const db = client.db(name);
    const backupDb = backupClient.db(name);
    console.info(`>> Connected to database ${name}`);

    // Create migrations collection
    await db.createCollection("migrations");
    await backupDb.createCollection("migrations");
    console.info(`>> Collection: migrations`);

    // Create users collection
    await db.createCollection("users");
    await backupDb.createCollection("users");
    console.info(`>> Collection: users`);

    // Close connection
    client.close();
    backupClient.close();
  } catch (error) {
    console.log(">> Database Migration Error:", error);
  } finally {
    process.exit();
  }
})();
