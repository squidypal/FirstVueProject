<script setup lang="ts">
import { computed } from 'vue'
import { useLeaderboardStore } from '@/stores/leaderboardStore'

const leaderboardStore = useLeaderboardStore()

const lastUpdatedFormatted = computed(() =>
  leaderboardStore.lastUpdated
    ? leaderboardStore.lastUpdated.toLocaleString()
    : 'Never'
)
</script>

<template>
  <div class="leaderboard-stats">
    <div class="stat">
      <span class="label">Total Players</span>
      <span class="value">{{ leaderboardStore.totalPlayers.toLocaleString() }}</span>
    </div>
    <div class="stat">
      <span class="label">Average Score</span>
      <span class="value">{{ leaderboardStore.averageScore.toLocaleString() }}</span>
    </div>
    <div class="stat">
      <span class="label">Last Updated</span>
      <span class="value">{{ lastUpdatedFormatted }}</span>
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
  flex-wrap: wrap;
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
