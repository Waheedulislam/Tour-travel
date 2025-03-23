import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name must be provided and must be a string',
      })
      .min(5, 'Name must be at least 5 characters long')
      .max(50, 'Name cannot exceed 50 characters'),

    age: z
      .number({
        required_error: 'Age must be provided and must be a number',
      })
      .int('Age must be an integer')
      .positive('Age must be a positive number')
      .optional(),

    email: z
      .string({
        required_error: 'Email must be provided and must be a valid string',
      })
      .email('Invalid email format'),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters long'),

    photo: z.string().url('Invalid photo URL').optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
