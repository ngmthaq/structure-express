import { MongoClient } from "mongodb";

export default class MongoDatabase {
  private uri: string;
  private client: MongoClient;

  public setURI(uri: string) {
    this.uri = uri;
  }

  public async connect() {
    console.info(`>> Connecting to ${this.uri}`);
    this.client = new MongoClient(this.uri);
    await this.client.connect();
    console.info(`>> Connected to ${this.uri}`);
    const databaseList = await this.client.db().admin().listDatabases();
    databaseList.databases.forEach((db, index) =>
      console.info(`>> Database ${index + 1}: ${db.name}`)
    );
  }

  public async disconnect() {
    await this.client.close(true);
    this.client = undefined;
  }

  public getMongoClient() {
    return this.client;
  }
}
