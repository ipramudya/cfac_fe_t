import { z } from 'zod'

const formSchema = z
  .object({
    oldPassword: z
      .string({ required_error: 'Old password is required' })
      .min(8, { message: 'Old password should be at least 8 characters' })
      .max(256, { message: 'Old password is too long' }),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(8, { message: 'New password should be at least 8 characters' })
      .max(256, { message: 'New password is too long' }),
    confirmNewPassword: z.string({ required_error: 'New password confirmation is required' }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'Please provide a different password as before',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match',
    path: ['confirmNewPassword'],
  })

export type ChangePasswordForm = z.infer<typeof formSchema>
export const changePasswordFormSchema = formSchema
