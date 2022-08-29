import { Request, Response } from 'express';

import User from '../models/user.model';
import { AppError } from '../utils/app-error.util';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find();

    return res.json(users);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    if (!req.body.email || !req.body.firstName || !req.body.lastName) {
      throw new AppError('Missing fields.', 400);
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
