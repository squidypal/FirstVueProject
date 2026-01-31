<script setup lang="ts">
import ContactForm from '@/components/ContactForm.vue'
</script>

<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <p>Have feedback or questions? Fill out the form below and we'll get back to you.</p>
    <ContactForm />
  </div>
</template>

<style scoped>
.contact {
  padding: 2rem;
}

h1 {
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1.5rem;
  color: #666;
}
</style>
