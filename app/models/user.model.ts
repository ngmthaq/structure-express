import Model from "./model";

export default class User extends Model {
  public constructor() {
    super();
    this.setTableName("users");
  }
}
