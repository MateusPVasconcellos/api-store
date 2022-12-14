import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import ResetPasswordService from '../services/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    await ResetPasswordService.execute({
      token,
      password,
    });

    return response.status(httpStatus.NO_CONTENT).json();
  }
}

export default new ResetPasswordController();
