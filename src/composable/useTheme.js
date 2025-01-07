import { ref } from "vue";
import themeConfigs from "../config/theme.json";

const useTheme = () => {
    const themeOptions = Object.keys(themeConfigs.themes).map((key) => {
        // Convert 'oceanBlue' to 'Ocean Blue'
        const label = key
            .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
            .replace(/^./, (str) => str.toUpperCase());
        return {
            label: label, // Display friendly label
            value: key, // Store the original key value
        };
    });

    // Get the current theme from localStorage, default to the first option if not found
    const savedTheme = localStorage.getItem("theme") || themeOptions[0].value;
    const theme = ref(savedTheme);

    // Set theme and save to localStorage
    const setTheme = (value) => {
        theme.value = value;
        document.body.dataset["chatbot-theme"] = value;
        localStorage.setItem("theme", value);
    };

    return {
        theme,
        themeOptions,
        setTheme,
    };
};

export default useTheme;
