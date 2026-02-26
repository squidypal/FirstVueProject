<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const name = ref(userStore.userName)
const email = ref(userStore.userEmail)
const message = ref('')

const submitted = ref(false)
const isLoading = ref(false)
const serverError = ref<string | null>(null)

const validationErrors = ref<{ name?: string; email?: string; message?: string }>({})

// Keep name/email in sync if user logs in while on this page
watch(
  () => userStore.user,
  (newUser) => {
    if (newUser) {
      name.value = newUser.name
      email.value = newUser.email
    }
  }
)

function validateEmail(val: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}

function validate(): boolean {
  const errors: typeof validationErrors.value = {}

  if (!name.value.trim()) errors.name = 'Name is required'
  if (!email.value.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(email.value)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!message.value.trim()) errors.message = 'Message is required'

  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  serverError.value = null
  submitted.value = false

  if (!validate()) return

  isLoading.value = true

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim()
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error ?? 'Failed to send message')
    }

    submitted.value = true
    name.value = userStore.userName
    email.value = userStore.userEmail
    message.value = ''
    validationErrors.value = {}
  } catch (e) {
    serverError.value = e instanceof Error ? e.message : 'Failed to send message'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <div v-if="submitted" class="success-message">
      Thank you for your message! We'll get back to you soon.
    </div>

    <div v-if="serverError" class="error-message">
      {{ serverError }}
    </div>

    <div class="form-group">
      <label for="contact-name">Name <span class="required">*</span></label>
      <input
        id="contact-name"
        v-model="name"
        type="text"
        placeholder="Your name"
        :class="{ invalid: validationErrors.name }"
      />
      <span v-if="validationErrors.name" class="field-error">{{ validationErrors.name }}</span>
    </div>

    <div class="form-group">
      <label for="contact-email">Email <span class="required">*</span></label>
      <input
        id="contact-email"
        v-model="email"
        type="email"
        placeholder="your@email.com"
        :class="{ invalid: validationErrors.email }"
      />
      <span v-if="validationErrors.email" class="field-error">{{ validationErrors.email }}</span>
    </div>

    <div class="form-group">
      <label for="contact-message">Message <span class="required">*</span></label>
      <textarea
        id="contact-message"
        v-model="message"
        rows="5"
        placeholder="Your message or inquiry"
        :class="{ invalid: validationErrors.message }"
      ></textarea>
      <span v-if="validationErrors.message" class="field-error">{{ validationErrors.message }}</span>
    </div>

    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Sending…' : 'Send Message' }}
    </button>
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

.required {
  color: #c0392b;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

input.invalid,
textarea.invalid {
  border-color: #c0392b;
}

.field-error {
  display: block;
  color: #c0392b;
  font-size: 0.85rem;
  margin-top: 0.25rem;
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

button:hover:not(:disabled) {
  background-color: #555;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  padding: 1rem;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.error-message {
  padding: 1rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
