import { ref } from "vue";
import themeConfigs from "../config/theme.json";

const useTheme = () => {

    const themeOptions = themeConfigs.themes.map((theme, index) => {
        // Convert 'oceanBlue' to 'Ocean Blue'
        const label = theme.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase());
        return {
            label: label, // Display friendly label
            value: theme, // Store the original key value
        };
    });

    const theme = ref(themeOptions[0].value);

    const setTheme = (value) => {
        if (!value) return; // Ensure the theme value is valid
        theme.value = value;
        const body = document.body;
        body.setAttribute("data-chatbot-theme", value);
    };

    return {
        theme,
        themeOptions,
        setTheme,
    };
};

export default useTheme;
