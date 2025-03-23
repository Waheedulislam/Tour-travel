import { z } from 'zod';

export const tourValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be at most 100 characters'),
  durationHours: z.number().min(1, 'Duration must be at least 1 hour'),
  averageRating: z.number().min(0).max(5).default(0),
  price: z.number().min(0, 'Price must be a positive number'),
  coverImage: z.string().url('Cover image must be a valid URL'),
  image: z.array(z.string().url('Each image must be a valid URL')),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  startLocation: z
    .string()
    .min(3, 'Start location must have at least 3 characters'),
  location: z.array(
    z.string().min(3, 'Each location must have at least 3 characters'),
  ),
  slug: z.string().min(3, 'Slug must have at least 3 characters'),
  availableSets: z.number().min(0, 'Available sets must be a positive number'),
});

export const TourValidation = {
  tourValidationSchema,
};
