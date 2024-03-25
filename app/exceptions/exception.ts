export default class Exception {
  /**
   * HTTP Status Code
   */
  public static httpStatus: HttpStatusCode = {
    ok: 200,
    notFound: 404,
    unauthorize: 401,
    forbidden: 403,
    badRequest: 400,
    internalServerError: 500,
    serviceUnavailable: 503,
    failureValidation: 422,
  };

  public constructor(
    public message: string,
    public code: number,
    public details: any[],
  ) {}
}

export type HttpStatusCode = Record<
  | "ok"
  | "notFound"
  | "unauthorize"
  | "forbidden"
  | "badRequest"
  | "internalServerError"
  | "serviceUnavailable"
  | "failureValidation",
  number
>;
