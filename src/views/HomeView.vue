<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <div class="home">
    <template v-if="userStore.isLoggedIn">
      <h1>Welcome back, {{ userStore.userName }}!</h1>
      <p class="role-badge">Role: <strong>{{ userStore.userRole }}</strong></p>
      <p>Use the navigation above to check the Leaderboard or send us a message via Contact.</p>
    </template>

    <template v-else>
      <h1>Welcome to the App</h1>
      <p>Use the navigation above to explore the Leaderboard and Contact screens.</p>
      <p class="login-prompt">
        <RouterLink to="/login">Login</RouterLink> to personalise your experience and submit scores.
      </p>
    </template>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
}

.role-badge {
  display: inline-block;
  color: #555;
  margin-bottom: 0.5rem;
}

.login-prompt {
  margin-top: 1rem;
  color: #555;
}

.login-prompt a {
  color: #333;
  font-weight: bold;
}
</style>
