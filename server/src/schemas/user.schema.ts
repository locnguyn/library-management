import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().regex(/^\d+$/),
    gender: z.enum(['male', 'female', 'others']),
  })
  .strict();

export const updateUserSchema = createUserSchema.partial();
