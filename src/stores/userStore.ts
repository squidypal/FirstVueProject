import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt?: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => user.value?.name ?? '')
  const userEmail = computed(() => user.value?.email ?? '')
  const userRole = computed(() => user.value?.role ?? 'guest')

  async function login(email: string, name?: string) {
    isLoading.value = true
    error.value = null

    try {
      const params = new URLSearchParams({ email })
      if (name) params.append('name', name)

      const response = await fetch(`/api/login?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Login failed')
      }

      user.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed'
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    error.value = null
  }

  return { user, isLoading, error, isLoggedIn, userName, userEmail, userRole, login, logout }
})
