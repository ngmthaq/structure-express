import { ObjectId } from "mongodb";
import MongoDatabase from "./mongo";
import Exception from "../app/exceptions/exception";

class DatabaseFactory {
  /**
   * Master database instance
   */
  private masterMongoDatabse = new MongoDatabase();

  /**
   * Backup database instance
   */
  private backupMongoDatabse = new MongoDatabase();

  /**
   * Connect to master database
   *
   * @returns
   */
  private async getMasterMongoDatabase() {
    this.masterMongoDatabse.setURI(process.env.APP_MASTER_DB_HOST);
    await this.masterMongoDatabse.connect();
    const client = this.masterMongoDatabse.getMongoClient();
    return client.db(process.env.APP_DB_NAME || "");
  }

  /**
   * Connect to backup database
   *
   * @returns
   */
  private async getBackupMongoDatabase() {
    this.backupMongoDatabse.setURI(process.env.APP_BACKUP_DB_HOST);
    await this.backupMongoDatabse.connect();
    const client = this.backupMongoDatabse.getMongoClient();
    return client.db(process.env.APP_DB_NAME || "");
  }

  /**
   * Get database instance
   *
   * @param name
   * @returns
   */
  public async getDatabase(name: DatabaseFactoryKey) {
    switch (name) {
      case "master":
        return this.getMasterMongoDatabase();

      case "backup":
        return this.getBackupMongoDatabase();

      default:
        throw new Exception("Invalid DatabaseFactoryKey", Exception.httpStatus.internalServerError, []);
    }
  }
}

const databaseFactory = new DatabaseFactory();

export default databaseFactory;

type DatabaseFactoryKey = "master" | "backup";

export type { ObjectId, DatabaseFactoryKey };
