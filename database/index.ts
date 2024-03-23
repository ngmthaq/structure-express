import { ObjectId } from "mongodb";
import MongoDatabase from "./mongo";

type DatabaseFactoryKeyType = "default";

class DatabaseFactory {
  private defaultMongoDatabse = new MongoDatabase();

  private async getDefaultMongoDatabase() {
    this.defaultMongoDatabse.setURI(process.env.APP_DB_1);
    await this.defaultMongoDatabse.connect();
    return this.defaultMongoDatabse.getMongoClient();
  }

  public async getDatabase(name: DatabaseFactoryKeyType) {
    switch (name) {
      case "default":
        return this.getDefaultMongoDatabase();

      default:
        throw new Error("Invalid DatabaseFactoryKeyType");
    }
  }
}

const databaseFactory = new DatabaseFactory();

export default databaseFactory;

export type { ObjectId, DatabaseFactoryKeyType };
