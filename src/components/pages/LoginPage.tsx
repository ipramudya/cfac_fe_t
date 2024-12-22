import * as api from '@/api'
import { AuthLayout } from '@/components/layout'
import { loginFormSchema, LoginFormSchema } from '@/form-validation'
import { useSession } from '@/state/useSession'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Link } from '@nextui-org/react'
import { ViewIcon, ViewOffIcon } from 'hugeicons-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const setSession = useSession((state) => state.setToken)
  const navigate = useNavigate()

  const toggleVisibility = () => setPasswordVisible((prevState) => !prevState)

  const form = useForm<LoginFormSchema>({
    mode: 'onBlur',
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  })

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await api.login(formData)

    if ('error' in res) {
      form.setError('username', { message: res.error })
      form.setError('password', { message: res.error })
      return
    }

    setSession(res.token)
    navigate('/chat')
  })

  return (
    <AuthLayout
      title="Welcome Back to Application"
      description={
        <p className="text-sm text-content4-foreground">
          Does not have an accout yet?{' '}
          <Link size="sm" href="/auth/register">
            Register
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
          endContent={
            <button
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
              type="button"
              className="focus:outline-none"
            >
              {passwordVisible ? (
                <ViewIcon className="pointer-events-none text-default-400" />
              ) : (
                <ViewOffIcon className="pointer-events-none text-default-400" />
              )}
            </button>
          }
        />
        <Button
          className="!mt-6"
          color="primary"
          type="submit"
          isDisabled={!form.formState.isValid}
          isLoading={form.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
    </AuthLayout>
  )
}
