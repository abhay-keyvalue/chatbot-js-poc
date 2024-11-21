# Milestone Chatbot

A customizable JavaScript SDK for integrating a chatbot functionality into your website. This SDK provides a user interface with basic styling options, message storage, and basic functionalities like sending messages and receiving responses.

## Features

- **Customizable Theme**: Configure button, chat window, and text colors.
- **AI-based Responses**: Utilizes artificial intelligence to provide responses to a wide range of user queries.

## Installation

To use the ChatBot SDK, include the SDK script in your HTML file:

```html
<script src="path/to/ChatBot.js"></script>
```

## Usage

Initialize the ChatBot with configuration options:

```js
const chatbot = new ChatBot({
  apiKey: 'YOUR_API_KEY', // Required: API key for authentication.
  agentType: 'YOUR_AGENT_TYPE', // Required: Agent type for the bot.
  theme: {
    primaryColor: '#25314b', // Optional: Color of the chat header.
    secondaryColor: '#3498db', // Optional: Color of the send icon.
    chatWindowColor: '#ffffff', // Optional: Background color of the chat window.
    textColor: '#333333' // Optional: Color of bot text.
  }
});
```

## Configuration Options

Configure your chatbot with below options.

| Option      | Type   | Description                                                                |
| ----------- | ------ | -------------------------------------------------------------------------- |
| `apiKey`    | String | **Required**: Your API key for authenticating the chatbot API.             |
| `agentType` | String | **Required**: Type of chatbot agent to use (e.g., `chatbot`, `assistant`). |
| `theme`     | Object | **Optional**: Customize the appearance of the chatbot. See details below.  |

### Theme Configuration

Customize the chat's appearance using the theme option:

| Property          | Type   | Default Value | Description                                         |
| ----------------- | ------ | ------------- | --------------------------------------------------- |
| `primaryColor`    | String | `#25314b`     | The color of the chatbot header.                    |
| `secondaryColor`  | String | `#3498db`     | The color of the chatbot send icon.                 |
| `chatWindowColor` | String | `#ffffff`     | The background color of the chat window.            |
| `textColor`       | String | `#333333`     | The color of the text displayed in the chat window. |

Example:

```javascript
theme: {
  primaryColor: '#4CAF50',       // Header color
  secondaryColor: '#00ff00',       // Send Icon color
  chatWindowColor: '#ffffff',   // Chat window background color
  textColor: '#333333'          // Text color
}
```

## Setup project

To set up the project, follow these steps:

#### Clone Project

To clone the project repository, use the following command:

```sh
git clone https://dev.azure.com/milestone-devops/KeyValue-AIAgent/_git/Milestone-chat-sdk
```

#### Prerequisites

You need to install:

nodejs 18>=
npm 9>=

#### Install Dependencies

To install the necessary dependencies for the project, run the following command:

```sh
npm install
```

#### Build SDK

Build the SDK by running the command npm run build. This will generate a dist folder with the JavaScript file inside the example folder.

```js
npm run build
```

#### Run example project

Inside the example folder, there is an HTML file. Make sure you have already imported the SDK file into this HTML file.
To run the example project, use the command npm run dev. This will start the development server and you will be able to see your chat bot in the example project.

```js
npm run dev
```

That's it! Your project is now set up and ready to use the chatbot SDK.
