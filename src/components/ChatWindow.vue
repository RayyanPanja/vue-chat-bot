<script setup>
import { onMounted, ref } from "vue";
import useTheme from "../composable/useTheme.js";

const { themeOptions, setTheme } = useTheme();

onMounted(() => {
  setTheme(import.meta.env.VITE_CHATBOT_COLOR_THEME ?? themeOptions[0].value);
});

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
  <button type="button" v-show="!isChatWindowVisible" class="chat-open-button" @click="toggleChatWindow"
    title="Open Chat">
    <i class="bi bi-chat"></i>
  </button>

  <!-- Chat Window -->
  <transition name="fade" mode="out-in">
    <div v-show="isChatWindowVisible" class="chatbot-popup">
      <div class="header">
        <h2>Chat with Us</h2>
        <button class="close-btn" @click="toggleChatWindow">&times;</button>
      </div>
      <div class="chat-area">
        <div class="messages">
          <div v-for="message in messages" :key="message.id" class="message"
            :class="{ 'user-message': message.isUser }">
            {{ message.text }}
          </div>
        </div>
        <form class="message-input" @submit.prevent="sendMessage">
          <input v-model="userMessage" type="text" placeholder="Type a message..." />
          <button type="submit">
            <i class="bi bi-send"></i>
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>
