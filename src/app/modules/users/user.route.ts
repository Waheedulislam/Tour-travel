import { NextFunction, Request, Response, Router } from 'express';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../../middleWares/auth';

const userRouter = Router();

userRouter.post(
  '/create-admin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = await UserValidation.userValidationSchema.parseAsync(
        req.body,
      );
      req.body = parsedBody;
      next();
    } catch (error) {
      next(error);
    }
  },
  userController.createUser,
);
userRouter.get('/', auth('admin'), userController.getUser);
userRouter.get('/:userId', userController.getSingleUser);
userRouter.patch('/:userId', auth('admin'), userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

export default userRouter;
