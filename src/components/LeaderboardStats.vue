<script setup lang="ts">
import { ref, onMounted } from 'vue'

const totalPlayers = ref(0)
const averageScore = ref(0)
const lastUpdated = ref('')

onMounted(() => {
  totalPlayers.value = 1234
  averageScore.value = 5678
  lastUpdated.value = new Date().toLocaleString()
})
</script>

<template>
  <div class="leaderboard-stats">
    <div class="stat">
      <span class="label">Total Players:</span>
      <span class="value">{{ totalPlayers }}</span>
    </div>
    <div class="stat">
      <span class="label">Average Score:</span>
      <span class="value">{{ averageScore }}</span>
    </div>
    <div class="stat">
      <span class="label">Last Updated:</span>
      <span class="value">{{ lastUpdated }}</span>
    </div>
  </div>
</template>

<style scoped>
.leaderboard-stats {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-top: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.875rem;
  color: #666;
}

.value {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
