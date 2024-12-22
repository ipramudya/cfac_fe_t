import { z } from 'zod'

const formSchema = z
  .object({
    username: z.string().min(6, { message: 'Username should be at least 6 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password should be at least 8 characters' })
      .max(256, { message: 'Password is too long' })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        'Password must contain at least one alphabet and one number.',
      ),
    confirmPassword: z.string().min(8, { message: 'Password should be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
export const registerFormSchema = formSchema
