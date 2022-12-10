class AppError extends Error {
  public readonly message: string;
  public readonly httpStatus: number;

  constructor(message: string, httpStatus = 400) {
    super();
    this.message = message;
    this.httpStatus = httpStatus;
  }
}

export default AppError;
