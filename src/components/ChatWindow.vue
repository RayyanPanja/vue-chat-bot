<script setup>
import { onMounted, ref } from "vue";
import useTheme from "../composable/useTheme.js";
const { themeOptions, setTheme } = useTheme();


const assistant = ref({});

const fetchAIConfig = async () => {
  try {
    const path = import.meta.env.VITE_PATH_TO_ASSISTANT_CONFIG;
    const response = await fetch(path);
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("The configuration file must be a valid JSON file.");
    }

    const data = await response.json();
    if (!data.name || !data.assistant_id || !data.instruction) {
      throw new Error(
        "The configuration file must have a 'name', 'assistant_id', and 'instruction' key."
      );
    }

    const { name, assistant_id, instruction } = data;
    assistant.value = { name, assistant_id, instruction };

    return true;
  } catch (error) {
    console.error("Error loading AI configuration:", error);
    return false; // Return false to indicate failure
  }
};




onMounted(async () => {
  const configLoaded = await fetchAIConfig();

  if (!configLoaded) {
    console.error("Failed to load AI configuration. The component will not load.");
    return;
  }

  setTheme(import.meta.env.VITE_CHATBOT_COLOR_THEME ?? themeOptions[0].value);
});


const isChatWindowVisible = ref(false);
const messages = ref([
  { id: 1, type: "system", text: "Welcome to the chat!" },
]);

const userMessage = ref("");

const toggleChatWindow = () => {
  isChatWindowVisible.value = !isChatWindowVisible.value;
};

const sendMessage = () => {
  if (userMessage.value.trim() === "") return;
  messages.value.push({ id: Date.now(), type: "user", text: userMessage.value });
  userMessage.value = "";

  setTimeout(() => {
    messages.value.push({ id: Date.now(), type: "assistant", text: "Hello, how can I help you?" });
  }, 1500);
};

/**
 * Converts a message type (user, system, assistant) to a class name
 * that can be used in the message component.
 *
 * @param {string} type - The type of the message.
 *
 * @returns {string} - The CSS class name that corresponds to the given type.
 */
const parseMessageType = (type) => {
  const types = {
    user: "user-message",
    system: "system-message",
    assistant: "assistant-message",
  };
  return types[type];
};

// Handle theme selection
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

  <div v-if="isChatWindowVisible" class="chat-popup d-flex" id="chatbox">
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

    <div class="chat-body">
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
