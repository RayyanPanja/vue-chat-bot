<script setup>
import { ref } from "vue";

// State for the chat window visibility
const isChatWindowVisible = ref(false);

// State for messages in the chat
const messages = ref([{ id: 1, text: "Hello! How can I assist you today?" }]);

// State for user message input
const userMessage = ref("");

// Toggle chat window visibility
function toggleChatWindow() {
  isChatWindowVisible.value = !isChatWindowVisible.value;
}

// Send user message
function sendMessage() {
  if (userMessage.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      text: userMessage.value,
    });
    userMessage.value = "";
  }
}
</script>

<template>
  <button class="chat-icon btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-3" @click="toggleChatWindow"
    title="Open Chat">
    <i class="bi bi-chat-dots"></i>
  </button>

  <!-- Chat Window -->
  <div v-if="isChatWindowVisible" class="chat-window card shadow-sm position-fixed bottom-0 end-0 m-3">
    <div class="card-body">
      <div class="messages mb-3" style="max-height: 300px; overflow-y: auto">
        <div v-for="message in messages" :key="message.id" class="message mb-2">
          <div class="alert alert-info mb-1" role="alert">
            {{ message.text }}
          </div>
        </div>
      </div>
      <div class="input-area d-flex">
        <input v-model="userMessage" @keyup.enter="sendMessage" class="form-control me-2"
          placeholder="Type a message..." type="text" />
        <button @click="sendMessage" class="btn btn-primary">Send</button>
      </div>
    </div>
  </div>
</template>
