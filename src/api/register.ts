import { AxiosError } from 'axios'
import { apiClient } from './client'

type RegisterRequest = {
  username: string
  password: string
  confirmPassword: string
}

type RegisterSuccessResponse = {
  data: any
}

type RegisterErrorResponse = {
  error: string
}

type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse

export async function register(payload: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await apiClient.post('/register', payload)
    return {
      data: response.data,
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data.message }
    }
    return { error: 'An unexpected error occurred.' }
  }
}
