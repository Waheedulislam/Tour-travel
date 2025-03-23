import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const forgetPasswordSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'id sent korcelm fele diyeco' }),
    token: z.string({ required_error: 'token sent korcelm fele diyeco' }),
    password: z.string({ required_error: 'password k dibe, ' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  refreshTokenValidationSchema,
};
