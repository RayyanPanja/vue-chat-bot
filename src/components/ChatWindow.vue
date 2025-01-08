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
  <button type="button" v-show="!isChatWindowVisible" class="btn btn-primary" @click="toggleChatWindow"
    title="Open Chat">
    <i class="bi bi-chat"></i>
  </button>

  <!-- Chat Window -->
  <transition name="fade" mode="out-in">
    <div v-show="isChatWindowVisible" class="position-fixed bottom-0 end-0 m-3">
      <div class="card" style="width: 400px;">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Chat with Us</h5>
          <button type="button" class="btn-close" @click="toggleChatWindow"></button>
        </div>
        <div class="card-body">
          <div class="chat-area">
            <div class="messages">
              <div v-for="message in messages" :key="message.id" class="message mb-2"
                :class="{ 'bg-primary text-white': message.isUser, 'bg-light': !message.isUser }">
                {{ message.text }}
              </div>
            </div>
            <form class="input-group mt-3" @submit.prevent="sendMessage">
              <input v-model="userMessage" type="text" class="form-control" placeholder="Type a message..." />
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-send"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
