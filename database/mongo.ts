import { MongoClient } from "mongodb";

export default class MongoDatabase {
  private uri: string;
  private client: MongoClient;

  /**
   * Set connection string
   *
   * @param uri
   */
  public setURI(uri: string) {
    this.uri = uri;
  }

  /**
   * Connect to mongo database
   */
  public async connect() {
    console.info(`>> Connecting to ${this.uri}`);
    this.client = new MongoClient(this.uri);
    await this.client.connect();
    console.info(`>> Connected to ${this.uri}`);
    const databaseList = await this.client.db().admin().listDatabases();
    databaseList.databases.forEach((db, index) => console.info(`>> Database ${index + 1}: ${db.name}`));
  }

  /**
   * Disconnect
   */
  public async disconnect() {
    await this.client.close(true);
    this.client = undefined;
  }

  /**
   * Get mongo client
   *
   * @returns
   */
  public getMongoClient() {
    return this.client;
  }
}
