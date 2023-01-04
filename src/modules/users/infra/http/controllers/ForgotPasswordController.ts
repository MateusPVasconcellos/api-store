import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    await SendForgotPasswordEmailService.execute({
      email,
    });

    return response.status(httpStatus.NO_CONTENT).json();
  }
}

export default new ForgotPasswordController();
