export function errorResponse(status: number, message: string, details: any[]) {
  return { status, message, details };
}
