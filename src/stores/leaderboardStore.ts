import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface LeaderboardEntry {
  id: number
  player_name: string
  score: number
  email?: string
  created_at?: string
}

export interface RankedEntry extends LeaderboardEntry {
  rank: number
}

export const useLeaderboardStore = defineStore('leaderboard', () => {
  const entries = ref<LeaderboardEntry[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastUpdated = ref<Date | null>(null)

  const sortedEntries = computed<RankedEntry[]>(() =>
    [...entries.value]
      .sort((a, b) => b.score - a.score)
      .map((entry, index) => ({ ...entry, rank: index + 1 }))
  )

  const totalPlayers = computed(() => entries.value.length)

  const averageScore = computed(() => {
    if (entries.value.length === 0) return 0
    const sum = entries.value.reduce((acc, e) => acc + e.score, 0)
    return Math.round(sum / entries.value.length)
  })

  async function fetchLeaderboard() {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/api/leaderboard')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to fetch leaderboard')
      }

      entries.value = data
      lastUpdated.value = new Date()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch leaderboard'
    } finally {
      isLoading.value = false
    }
  }

  async function submitScore(playerName: string, score: number, email?: string) {
    error.value = null

    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_name: playerName, score, email })
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to submit score')
      }

      await fetchLeaderboard()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to submit score'
    }
  }

  return {
    entries,
    isLoading,
    error,
    lastUpdated,
    sortedEntries,
    totalPlayers,
    averageScore,
    fetchLeaderboard,
    submitScore
  }
})
