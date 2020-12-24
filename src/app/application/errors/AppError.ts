class Error {
  public readonly message: string | Record<string, unknown>;

  public readonly statusCode: number;

  constructor(message: string | Record<string, unknown>, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default Error;
