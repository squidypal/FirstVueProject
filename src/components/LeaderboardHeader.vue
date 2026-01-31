<script setup lang="ts">
defineProps<{
  title: string
}>()

const emit = defineEmits<{
  refresh: []
}>()

function handleRefresh() {
  emit('refresh')
}
</script>

<template>
  <div class="leaderboard-header">
    <h1>{{ title }}</h1>
    <button @click="handleRefresh">Refresh</button>
  </div>
</template>

<style scoped>
.leaderboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
