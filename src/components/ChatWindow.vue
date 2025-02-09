<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import useTheme from "../composable/useTheme.js";
import useConfigurations from "../composable/useConfigurations.js";
const { themeOptions, setTheme } = useTheme();
const { loadConfig, assistant } = useConfigurations();

onMounted(async () => {
  const configLoaded = await loadConfig();
  if (!configLoaded) {
    console.error("Failed to load AI configuration. The component will not load.");
    return;
  }
  setTheme(import.meta.env.VITE_CHATBOT_COLOR_THEME ?? themeOptions[0].value);
});

const isChatWindowVisible = ref(false);
const messages = ref([{ id: 1, type: "system", text: "Welcome to the chat!" }]);
const userMessage = ref("");

const toggleChatWindow = () => {
  isChatWindowVisible.value = !isChatWindowVisible.value;
};

const sendMessage = () => {
  if (userMessage.value.trim() === "") return;
  messages.value.push({ id: Date.now(), type: "user", text: userMessage.value });
  userMessage.value = "";
  setTimeout(() => {
    messages.value.push({
      id: Date.now(),
      type: "assistant",
      text: "Hello, how can I help you?",
    });
  }, 1500);
};

watch(
  () => messages.value.length,
  async () => {
    await nextTick();
    const chatbox = document.getElementById("chat-body");
    if (chatbox) {
      chatbox.scroll({
        top: chatbox.scrollHeight,
        behavior: "smooth",
      });
    }
  }
);

const parseMessageType = (type) => {
  const types = {
    user: "user-message align-self-end",
    system: "system-message align-self-center",
    assistant: "assistant-message align-self-start",
  };
  return types[type];
};

const selectedTheme = ref(import.meta.env.VITE_CHATBOT_COLOR_THEME ?? themeOptions[0].value);
const changeTheme = (theme) => {
  setTheme(theme);
  selectedTheme.value = theme;
};
</script>

<template>
  <button v-if="!isChatWindowVisible" class="toggle-ai-chatbot-btn" @click="toggleChatWindow">
    <i class="bi bi-chat"></i>
  </button>

  <div v-if="isChatWindowVisible" class="chat-popup d-flex" id="chat-popup">
    <div class="chat-header d-flex justify-content-between align-items-center">
      <strong>{{ assistant.name }}</strong>
      <select class="form-select form-select-sm w-auto theme-selector" v-model="selectedTheme"
        @change="changeTheme(selectedTheme)">
        <option v-for="option in themeOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <button class="btn-close btn-close-white float-end" @click="toggleChatWindow"></button>
    </div>

    <div id="chat-body" class="chat-body d-flex flex-column">
      <div v-for="message in messages" :key="message.id" class="message" :class="parseMessageType(message.type)">
        {{ message.text }}
      </div>
    </div>

    <div class="chat-footer">
      <div class="input-group">
        <input type="text" v-model="userMessage" class="form-control" placeholder="Type a message..."
          @keydown.enter="sendMessage">
        <button class="btn btn-primary" @click="sendMessage">
          <i class="bi bi-send"></i>
        </button>
      </div>
    </div>
  </div>
</template>
