import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./vue-ai-chat-bot.css"; // Global styles

import ChatWindow from "./components/ChatWindow.vue";

export default defineComponent({
  name: "VueAIChatBot",
  components: {
    ChatWindow,
  },
  template: `
    <div class="vue-chat-bot">
      <ChatWindow />
    </div>
  `,
});
