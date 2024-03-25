import humps from "humps";

export default abstract class Controller {
  public constructor() {}

  /**
   * Convert camelCase data to snake_case data
   *
   * @param data any
   * @returns any
   */
  protected toSnake(data: any) {
    return humps.decamelizeKeys(data);
  }

  /**
   * Convert snake_case data to camelCase data
   *
   * @param data any
   * @returns any
   */
  protected toCamel(data: any) {
    return humps.camelizeKeys(data);
  }
}
