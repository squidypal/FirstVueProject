<script setup lang="ts">
import { onMounted } from 'vue'
import { useLeaderboardStore } from '@/stores/leaderboardStore'

const leaderboardStore = useLeaderboardStore()

async function fetchLeaderboard() {
  await leaderboardStore.fetchLeaderboard()
}

onMounted(() => {
  fetchLeaderboard()
})

defineExpose({ fetchLeaderboard })
</script>

<template>
  <div class="leaderboard-table">
    <div v-if="leaderboardStore.isLoading" class="loading">Loading leaderboard…</div>

    <div v-else-if="leaderboardStore.error" class="error">
      {{ leaderboardStore.error }}
    </div>

    <div v-else-if="leaderboardStore.sortedEntries.length === 0" class="empty">
      No leaderboard entries yet. Be the first!
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="entry in leaderboardStore.sortedEntries"
          :key="entry.id"
          :class="{ 'top-three': entry.rank <= 3 }"
        >
          <td class="rank-cell">
            <span v-if="entry.rank === 1">🥇</span>
            <span v-else-if="entry.rank === 2">🥈</span>
            <span v-else-if="entry.rank === 3">🥉</span>
            <span v-else>{{ entry.rank }}</span>
          </td>
          <td>{{ entry.player_name }}</td>
          <td class="score-cell">{{ entry.score.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.leaderboard-table {
  margin-top: 1rem;
}

.loading,
.error,
.empty {
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.loading {
  color: #555;
}

.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.empty {
  color: #777;
  font-style: italic;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.6rem 0.75rem;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #fafafa;
}

tr.top-three td {
  background-color: #fffde7;
}

.rank-cell {
  text-align: center;
  width: 60px;
}

.score-cell {
  font-weight: bold;
}
</style>
