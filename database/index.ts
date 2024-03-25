import { ObjectId } from "mongodb";
import MongoDatabase from "./mongo";
import Exception from "../app/exceptions/exception";

class DatabaseFactory {
  /**
   * Default database instance
   */
  private masterMongoDatabse = new MongoDatabase();

  /**
   * Connect to default database
   *
   * @returns
   */
  private async getMasterMongoDatabase() {
    this.masterMongoDatabse.setURI(process.env.APP_MASTER_DB_HOST);
    await this.masterMongoDatabse.connect();
    const client = this.masterMongoDatabse.getMongoClient();
    return client.db(process.env.APP_MASTER_DB_HOST || "");
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

      default:
        throw new Exception("Invalid DatabaseFactoryKey", Exception.httpStatus.internalServerError, []);
    }
  }
}

const databaseFactory = new DatabaseFactory();

export default databaseFactory;

type DatabaseFactoryKey = "master";

export type { ObjectId, DatabaseFactoryKey };
