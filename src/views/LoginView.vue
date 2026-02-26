<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  if (userStore.isLoggedIn) {
    router.replace('/')
  }
})
</script>

<template>
  <div class="login-view">
    <h1>Login</h1>
    <p class="subtitle">Enter your email to access your account. A new account will be created automatically on first login.</p>
    <LoginForm />
  </div>
</template>

<style scoped>
.login-view {
  padding: 2rem;
  max-width: 600px;
}

h1 {
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}
</style>
