<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const name = ref('')
const emailError = ref('')

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}

async function handleLogin() {
  emailError.value = ''

  if (!email.value) {
    emailError.value = 'Email is required'
    return
  }

  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }

  await userStore.login(email.value, name.value || undefined)

  if (!userStore.error) {
    router.push('/')
  }
}
</script>

<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <div v-if="userStore.error" class="error-message">
      {{ userStore.error }}
    </div>

    <div class="form-group">
      <label for="login-name">Display Name <span class="optional">(optional)</span></label>
      <input
        id="login-name"
        v-model="name"
        type="text"
        placeholder="Your display name"
      />
    </div>

    <div class="form-group">
      <label for="login-email">Email <span class="required">*</span></label>
      <input
        id="login-email"
        v-model="email"
        type="email"
        placeholder="your@email.com"
        :class="{ invalid: emailError }"
      />
      <span v-if="emailError" class="field-error">{{ emailError }}</span>
    </div>

    <button type="submit" :disabled="userStore.isLoading">
      {{ userStore.isLoading ? 'Logging in…' : 'Login' }}
    </button>
  </form>
</template>

<style scoped>
.login-form {
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: bold;
}

.optional {
  font-weight: normal;
  color: #888;
  font-size: 0.85rem;
}

.required {
  color: #c0392b;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

input.invalid {
  border-color: #c0392b;
}

.field-error {
  display: block;
  color: #c0392b;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover:not(:disabled) {
  background-color: #555;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  padding: 0.75rem 1rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
