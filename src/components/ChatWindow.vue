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
  <!-- Chat Button -->
  <button class="chat-open-button" @click="toggleChatWindow" title="Open Chat">
    <i class="bi bi-chat"></i>
  </button>

  <!-- Chat Window -->
  <div v-if="isChatWindowVisible" class="chat-window">
    <!-- Chat Header -->
    <div class="chat-header">
      <h6 class="mb-0">Chat Assistant (Experimental)</h6>
      <button @click="toggleChatWindow" class="close-button">
        <i class="bi bi-x"></i>
      </button>
    </div>

    <!-- Chat Body -->
    <div class="chat-body">
      <!-- Messages Area -->
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="message">
          <div :class="['alert', message.isUser ? 'user-message' : 'bot-message']">
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="input-area">
        <input v-model="userMessage" @keyup.enter="sendMessage" class="message-input" placeholder="Type a message..."
          type="text" />
        <button @click="sendMessage" class="send-button">
          <i class="bi bi-send"></i>
        </button>
      </div>
    </div>

    <!-- Chat Footer -->
    <div class="chat-footer">
      <small>Powered by Vue.js & OpenAI</small>
    </div>
  </div>

</template>