<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/leaderboard">Leaderboard</RouterLink></li>
      <li><RouterLink to="/contact">Contact</RouterLink></li>
    </ul>

    <div class="user-section">
      <template v-if="userStore.isLoggedIn">
        <span class="user-name">{{ userStore.userName }}</span>
        <span class="user-role">{{ userStore.userRole }}</span>
        <button class="logout-btn" @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="login-link">Login</RouterLink>
      </template>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #333;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar a:hover {
  text-decoration: underline;
}

.navbar a.router-link-active {
  font-weight: bold;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
}

.user-name {
  font-weight: bold;
}

.user-role {
  background-color: #555;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: capitalize;
}

.logout-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.login-link {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.login-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  text-decoration: none !important;
}
</style>
