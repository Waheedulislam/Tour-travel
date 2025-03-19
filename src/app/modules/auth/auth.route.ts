import { Router } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../../middleWares/validationRequest';
import { UserValidation } from '../users/user.validation';
import { AuthValidation } from './auth.validation';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthController.register,
);
authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login,
);

export default authRouter;
