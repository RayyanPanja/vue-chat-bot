import { ref} from 'vue';

const useConfigurations = () => {


    const assistant = ref({});

    const loadConfig = async () => {
        try {

            const path = import.meta.env.VITE_PATH_TO_ASSISTANT_CONFIG;
            console.log("Loading AI configuration from:", path);

            const response = await fetch(path);
            const contentType = response.headers.get("content-type");

            // Validating the content type
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("The configuration file must be a valid JSON file.");
            }
            
            // Parsing JSON from the response
            const data = await response.json();
            // Validating required keys
            if (!data.name || !data.assistant_id || !data.instruction) {
                throw new Error("The configuration file must have a 'name', 'assistant_id', and 'instruction' key.");
            }
            Object.assign(assistant.value, data);
            return true;
        } catch (error) {
            console.error("Error loading AI configuration:", error);
            return false; // Return false to indicate failure
        }
    };

    return {
        loadConfig,
        assistant,
    };

};

export default useConfigurations;
