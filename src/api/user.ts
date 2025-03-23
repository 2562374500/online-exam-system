import request from '@/utils/request'

export interface LoginForm {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  username: string
  role: number
}

export const login = (data: LoginForm) => {
  return request<LoginResponse>({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

export const updateUserInfo = (data: any) => {
  return request({
    url: '/api/user/info',
    method: 'put',
    data
  })
} 