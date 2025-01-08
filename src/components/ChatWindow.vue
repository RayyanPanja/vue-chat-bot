<script setup>
import { ref } from "vue";

const isChatWindowVisible = ref(false);
const messages = ref([
  { id: 1, text: "Hello! How can I assist you today?", isUser: false },
]);
const userMessage = ref("");

const toggleChatWindow = () => {
  isChatWindowVisible.value = !isChatWindowVisible.value;
};

const sendMessage = () => {
  if (userMessage.value.trim() === "") return;
  messages.value.push({ id: Date.now(), text: userMessage.value, isUser: true });
  userMessage.value = "";
};
</script>

<template>
  <div>
    <!-- Chat Button -->
    <button class="chat-icon btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-3" @click="toggleChatWindow"
      title="Open Chat">
      <i class="bi bi-chat-dots"></i>
    </button>

    <!-- Chat Window -->
    <div v-if="isChatWindowVisible" class="chat-window card shadow-sm position-fixed bottom-0 end-0 m-3">
      <!-- Chat Header -->
      <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <h6 class="mb-0">Chat Assistant</h6>
        <button @click="toggleChatWindow" class="btn btn-sm btn-light">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <!-- Chat Body -->
      <div class="card-body">
        <!-- Messages Area -->
        <div class="messages mb-3" style="max-height: 300px; overflow-y: auto;">
          <div v-for="message in messages" :key="message.id" class="message">
            <div :class="['alert', message.isUser ? 'alert-primary text-end' : 'alert-info']" role="alert">
              {{ message.text }}
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="input-area d-flex">
          <input v-model="userMessage" @keyup.enter="sendMessage" class="form-control me-2"
            placeholder="Type a message..." type="text" />
          <button @click="sendMessage" class="btn btn-primary">
            <i class="bi bi-send"></i>
          </button>
        </div>
      </div>

      <!-- Chat Footer -->
      <div class="card-footer text-center bg-light">
        <small class="text-muted">Powered by Vue.js & OpenAI</small>
      </div>
    </div>
  </div>
</template>