import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const caller = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

caller.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message ?? error.message);
    return error;
  },
);

export const GeneralAPIs = {
  /**
   * Test if the connection to the backend is working.
   * If we've had a successful connection in the last 10 minutes, we return true.
   * Otherwise, we make a request to the backend and store the result in storage for 10 minutes.
   * If the request fails, we return false.
   * We use the HEAD HTTP method instead of GET to reduce the amount of data sent.
   */
  testConnection: async () => {
    const successConnectionAt = sessionStorage.getItem("success-connection-at");
    if (
      successConnectionAt &&
      Date.now() - parseInt(successConnectionAt, 10) < 600000
    ) {
      return true;
    }
    try {
      await caller.head("/test-connection");
      sessionStorage.setItem("success-connection-at", Date.now());
      return true;
    } catch (error) {
      return false;
    }
  },
};

export const AssistantAPIs = {
  /**
   * Retrieves the assistant with the given ID.
   * @param {string} assistantID the ID of the assistant to retrieve
   * @returns {Promise<Object>} the assistant with the given ID
   * @throws {Error} if the request to the backend fails
   */
  getAssistant: async (assistantID) => {
    try {
      const response = await caller.get(`/assistant/${assistantID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Creates a new assistant with the specified name and instruction.
   * @param {string} name - The name of the assistant to be created.
   * @param {string} instruction - The instruction or task for the assistant.
   * @returns {Promise<Object>} A promise that resolves to the created assistant's data.
   * @throws {Error} If the request to create the assistant fails.
   */
  createAssistant: async (name, instruction) => {
    try {
      const assistant = {
        name: name,
        instruction: instruction,
      };
      const response = await caller.post("/assistant", assistant);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
