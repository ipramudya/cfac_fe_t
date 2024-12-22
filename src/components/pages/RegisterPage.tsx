import * as api from '@/api'
import { AuthLayout } from '@/components/layout'
import { registerFormSchema, RegisterFormSchema } from '@/form-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Input, Link } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const navigate = useNavigate()

  const toggleVisibility = () => setPasswordVisible((prevState) => !prevState)

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await api.register(formData)

    if ('error' in res) {
      if (res.error === 'Username already exists') {
        form.setError('username', { message: res.error })
      } else {
        form.setError('username', { message: res.error })
        form.setError('password', { message: res.error })
        form.setError('confirmPassword', { message: res.error })
      }
      return
    }

    navigate('/auth/login', { replace: true })
  })

  return (
    <AuthLayout
      title="Hello New Member"
      description={
        <p className="text-sm text-content4-foreground">
          Already have an account?{' '}
          <Link size="sm" href="/auth/login">
            Login
          </Link>
        </p>
      }
    >
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <Input
          {...form.register('username')}
          label="Username"
          placeholder="Enter your username"
          variant="bordered"
          errorMessage={form.formState.errors.username?.message}
          isInvalid={Boolean(form.formState.errors.username)}
        />
        <Input
          {...form.register('password')}
          label="Password"
          placeholder="Enter your password"
          variant="bordered"
          type={passwordVisible ? 'text' : 'password'}
          errorMessage={form.formState.errors.password?.message}
          isInvalid={Boolean(form.formState.errors.password)}
        />
        <Input
          {...form.register('confirmPassword')}
          label="Confirm Password"
          placeholder="Re-type your password"
          variant="bordered"
          type={passwordVisible ? 'text' : 'password'}
          errorMessage={form.formState.errors.confirmPassword?.message}
          isInvalid={Boolean(form.formState.errors.confirmPassword)}
        />
        <Checkbox
          size="sm"
          className="!mt-1"
          isSelected={passwordVisible}
          onChange={toggleVisibility}
        >
          View passwords
        </Checkbox>
        <Button
          className="!mt-6"
          color="primary"
          type="submit"
          isDisabled={!form.formState.isValid}
          isLoading={form.formState.isSubmitting}
        >
          Continue
        </Button>
      </form>
    </AuthLayout>
  )
}
