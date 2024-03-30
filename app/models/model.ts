export default abstract class Model {
  protected table: string;

  public constructor() {}

  protected setTableName(name: string) {
    this.table = name;
  }
}
