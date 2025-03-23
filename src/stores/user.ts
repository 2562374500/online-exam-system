import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, logout } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const username = ref(localStorage.getItem('username') || '')
  const role = ref(Number(localStorage.getItem('role')) || 0)

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUsername = (newUsername: string) => {
    username.value = newUsername
    localStorage.setItem('username', newUsername)
  }

  const setRole = (newRole: number) => {
    role.value = newRole
    localStorage.setItem('role', String(newRole))
  }

  const loginAction = async (loginForm: { username: string; password: string }) => {
    try {
      const res = await login(loginForm)
      setToken(res.token)
      setUsername(res.username)
      setRole(res.role)
      return res
    } catch (error) {
      throw error
    }
  }

  const logoutAction = async () => {
    try {
      await logout()
      token.value = ''
      username.value = ''
      role.value = 0
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('role')
    } catch (error) {
      throw error
    }
  }

  return {
    token,
    username,
    role,
    loginAction,
    logoutAction
  }
}) 