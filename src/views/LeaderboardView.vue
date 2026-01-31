<script setup lang="ts">
import { ref } from 'vue'
import LeaderboardHeader from '@/components/LeaderboardHeader.vue'
import LeaderboardTable from '@/components/LeaderboardTable.vue'
import LeaderboardStats from '@/components/LeaderboardStats.vue'

const tableRef = ref<InstanceType<typeof LeaderboardTable> | null>(null)

function handleRefresh() {
  tableRef.value?.fetchLeaderboard()
}
</script>

<template>
  <div class="leaderboard">
    <LeaderboardHeader title="Leaderboard" @refresh="handleRefresh" />
    <LeaderboardStats />
    <LeaderboardTable ref="tableRef" />
  </div>
</template>

<style scoped>
.leaderboard {
  padding: 2rem;
}
</style>
