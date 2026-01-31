<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)

function handleSubmit() {
  console.log('Form submitted:', {
    name: name.value,
    email: email.value,
    message: message.value
  })

  submitted.value = true

  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <div v-if="submitted" class="success-message">
      Thank you for your message! We'll get back to you soon.
    </div>

    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="name"
        type="text"
        required
        placeholder="Your name"
      />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        placeholder="your@email.com"
      />
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea
        id="message"
        v-model="message"
        required
        rows="5"
        placeholder="Your message or inquiry"
      ></textarea>
    </div>

    <button type="submit">Send Message</button>
  </form>
</template>

<style scoped>
.contact-form {
  max-width: 500px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #555;
}

.success-message {
  padding: 1rem;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
