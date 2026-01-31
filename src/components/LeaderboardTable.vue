<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface LeaderboardEntry {
  id: number
  rank: number
  name: string
  score: number
}

const entries = ref<LeaderboardEntry[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchLeaderboard() {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()

    entries.value = data.slice(0, 10).map((user: any, index: number) => ({
      id: user.id,
      rank: index + 1,
      name: user.name,
      score: Math.floor(Math.random() * 10000)
    }))
  } catch (e) {
    error.value = 'Failed to fetch leaderboard data'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLeaderboard()
})

defineExpose({ fetchLeaderboard })
</script>

<template>
  <div class="leaderboard-table">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <table v-else>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id">
          <td>{{ entry.rank }}</td>
          <td>{{ entry.name }}</td>
          <td>{{ entry.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.leaderboard-table {
  margin-top: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #fafafa;
}
</style>
