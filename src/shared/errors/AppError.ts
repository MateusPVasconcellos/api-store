class AppError {
  public readonly message: string;
  public readonly httpStatus: number;

  constructor(message: string, httpStatus = 400) {
    this.message = message;
    this.httpStatus = httpStatus;
  }
}

export default AppError;
