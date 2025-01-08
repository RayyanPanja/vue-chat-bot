# vue-ai-chat-bot (Still Under Development Do not Install)

## Project Description:
vue-ai-chat-bot is a customizable chat window component designed to integrate an AI-powered chat assistant into web applications. It supports dynamic theming, is built with Vue 3's Composition API, and can be easily configured through JSON files for bot settings and appearance. The component connects seamlessly to an Express backend that communicates with the OpenAI API, offering a smooth and interactive chat experience.

## Features:

* Configurable settings for bot behavior
* Customizable chat window themes
* Integrates with OpenAI API
* Built with Vue 3 and Composition API
* Easy integration into Vue-based projects

## Installation Instructions:

To install vue-ai-chat-bot, simply add it to your project's dependencies. Follow the steps below for installation.

Install the package:

```bash copy
npm i @rayyan-panja/vue-ai-chat-bot
```

Include the component:

```vue copy
<script setup>
import VueAIChatBot from '@rayyan-panja/vue-ai-chat-bot';
</script>

<template>
  <VueAIChatBot />
</template>
```

## Set up the backend:

Add The Endpoint to .env file

```env copy
VITE_CHATBOT_API_ENDPOINT=
```

## Usage:

To use the vue-ai-chat-bot component in your project, follow the steps below:

Import the component:
```vue copy
<script setup>
import VueAIChatBot from '@rayyan-panja/vue-ai-chat-bot';
</script>
```

Add the component to your template:
```vue
<template>
  <VueAIChatBot />
</template>
```

## Available Themes:
vue-ai-chat-bot offers several pre-defined themes for easy customization. You can switch between themes or create your own by adjusting the settings in the configuration file.

```json
{
  "themes": [
    "oceanBlue",
    "lightMode",
    "darkMode",
    "sunset",
    "forestGreen",
    "purpleRain",
    "vibrantYellow"
  ]
}
```

## License:
This project is proprietary and cannot be modified, distributed, or used for commercial purposes without explicit permission.

