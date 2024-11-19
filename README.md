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
    buttonColor: '#3498db', // Optional: Color of the chat button.
    chatWindowColor: '#f5f5f5', // Optional: Background color of the chat window.
    textColor: '#333' // Optional: Color of bot text.
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
| `buttonColor`     | String | `#25314B`     | The color of the chatbot button.                    |
| `chatWindowColor` | String | `#ffffff`     | The background color of the chat window.            |
| `textColor`       | String | `#333333`     | The color of the text displayed in the chat window. |

Example:

```javascript
theme: {
  buttonColor: '#4CAF50',       // Button color
  chatWindowColor: '#ffffff',   // Chat window background color
  textColor: '#333333'          // Text color
}
```

### Methods

#### toggleChatWindow

Toggles the visibility of the chat window.

```js
chatbot.toggleChatWindow();
```
