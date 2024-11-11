(function (global) {
  // ChatBot class definition
  class ChatBot {
    constructor({ apiKey, agentType, theme = {} }) {
      this.apiKey = apiKey;
      this.agentType = agentType;

      // Theme customization with default values
      const defaultTheme = {
        buttonColor: "#25314B",
        chatWindowColor: "#ffffff",
        textColor: "#333",
      };

      this.theme = { ...defaultTheme, ...theme };

      this.isOpen = false;
      this.loadStyles();
      this.initUI();
      this.addClickOutsideListener();
      this.loadMessages();
    }

    loadStyles() {
      const style = document.createElement("style");

      style.innerHTML = `
                .chatbot-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background-color: ${this.theme.buttonColor};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    transition: transform 0.3s ease;
                }

                .chat-circle-icon {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin: auto;
                }
        
                .chat-icon {
                    color: white;
                    font-size: 24px;
                }
        
                .chat-window {
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    width: 100%;
                    max-width: 400px;
                    height: 70%;
                    max-height: 600px;
                    background-color: ${this.theme.chatWindowColor};
                    border-radius: 15px;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    z-index: 1000;
                    overflow: hidden;
                    transform-origin: bottom right;
                    transform: scale(0);
                    opacity: 0;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }

                @media (max-width: 600px) {
                    .chat-window {
                        width: 90%;
                        bottom: 90px;
                    }
                }
        
                .chat-window.open {
                    transform: scale(1);
                    opacity: 1;
                }
        
                .chat-header {
                    padding: 15px;
                    background-color: ${this.theme.buttonColor};
                    color: white;
                    font-size: 18px;
                    font-weight: 600;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;
                }
        
                .header-image {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
        
                .close-button {
                    cursor: pointer;
                    font-size: 24px;
                    color: white;
                    margin-left: 10px;
                }

                .clear {
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 400;
                    color: white;
                    margin-left: 10px;
                }
        
                .chat-display {
                    flex: 1;
                    padding: 15px;
                    overflow-y: auto;
                    background-color: #ffffff;
                    font-size: 15px;
                }

                .chat-display::-webkit-scrollbar {
                    width: 5px;
                }
                  
                .chat-display::-webkit-scrollbar-thumb {
                    background-color: #888;
                    border-radius: 10px;
                }
                  
                .chat-display::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }  
        
                .message-container {
                    display: flex;
                    margin: 8px 0;
                    align-items: flex-end;
                }

                .message-container.right {
                    justify-content: flex-end;
                }
                
                .message-bubble {
                    max-width: 70%;
                    padding: 12px 18px;
                    border-radius: 15px;
                    white-space: pre-wrap;
                    font-size: 14px;
                    word-break: break-word; 
                    flex-shrink: 1;
                }
                
                .message-container.right .message-bubble {
                    background-color: ${this.theme.buttonColor};
                    color: white;
                    border-bottom-right-radius: 0;
                }
                
                .message-container.left .message-bubble {
                    background-color: #e0e0e0;
                    color: ${this.theme.textColor};
                    border-bottom-left-radius: 0;
                    display: flex;
                    align-items: center;
                }       

                .profile-image {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    margin-right: 8px;
                }
        
                .chat-input-container {
                    display: flex;
                    padding: 4px;
                    border: 1px solid #ddd;
                    border-radius: 25px;
                    outline: none;
                    margin: 15px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    justify-content: space-between;
                    align-items: center;
                }
        
                .chat-input-container input {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    font-size: 14px;
                    outline: none;
                }
        
                .send-button {
                    cursor: pointer;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: none;
                    background-color: ${this.theme.buttonColor};
                }

                .send-icon {
                    width: 32px;
                    height: 32px;
                }
            `;
      document.head.appendChild(style);
    }

    initUI() {
      this.chatButton = document.createElement("div");
      this.chatButton.className = "chatbot-button";
      this.chatButton.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/128/18221/18221591.png" alt="Chat" class="chat-circle-icon">`;
      document.body.appendChild(this.chatButton);

      this.chatButton.addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggleChatWindow();
      });

      this.chatWindow = document.createElement("div");
      this.chatWindow.className = "chat-window";
      document.body.appendChild(this.chatWindow);

      const chatHeader = document.createElement("div");

      chatHeader.className = "chat-header";
      chatHeader.innerHTML = `
                <img src="https://cdn-icons-png.flaticon.com/128/18221/18221591.png" alt="Bot" class="header-image">
                <span>ChatBot</span>
                <span>
                    <span class="clear">Clear</span>
                    <span class="close-button">✕</span>
                </span>
            `;
      chatHeader
        .querySelector(".close-button")
        .addEventListener("click", () => this.toggleChatWindow());
      chatHeader
        .querySelector(".clear")
        .addEventListener("click", () => this.clearMessages());
      this.chatWindow.appendChild(chatHeader);

      this.chatDisplay = document.createElement("div");
      this.chatDisplay.className = "chat-display";
      this.chatWindow.appendChild(this.chatDisplay);

      const chatInputContainer = document.createElement("div");

      chatInputContainer.className = "chat-input-container";
      this.chatInput = document.createElement("input");
      this.chatInput.type = "text";
      this.chatInput.placeholder = "Message...";
      chatInputContainer.appendChild(this.chatInput);

      const sendButton = document.createElement("button");

      sendButton.className = "send-button";
      sendButton.innerHTML =
        '<img src="https://cdn-icons-png.flaticon.com/128/14025/14025522.png" alt="Send" class="send-icon" />';
      sendButton.addEventListener("click", () => this.handleSendMessage());
      this.chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") this.handleSendMessage();
      });

      chatInputContainer.appendChild(sendButton);
      this.chatWindow.appendChild(chatInputContainer);
    }

    toggleChatWindow() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.chatWindow.classList.add("open");
        this.loadMessages();
      } else {
        this.chatWindow.classList.remove("open");
      }
    }

    async handleSendMessage() {
      const userMessage = this.chatInput.value.trim();

      if (!userMessage) return;

      this.appendMessage("You", userMessage, "right");
      this.chatInput.value = "";

      const botResponse = await this.getBotResponse(userMessage);

      this.appendMessage("Bot", botResponse, "left");
      this.saveMessages();
    }

    appendMessage(sender, message, align) {
      const messageContainer = document.createElement("div");

      messageContainer.className = `message-container ${align}`;

      if (align === "left" && sender === "Bot") {
        const profileImage = document.createElement("img");

        profileImage.src =
          "https://cdn-icons-png.flaticon.com/128/18221/18221591.png";
        profileImage.className = "profile-image";
        messageContainer.appendChild(profileImage);
      }

      const messageBubble = document.createElement("div");

      messageBubble.className = "message-bubble";
      messageBubble.textContent = message;
      messageContainer.appendChild(messageBubble);

      this.chatDisplay.appendChild(messageContainer);
      this.chatDisplay.scrollTop = this.chatDisplay.scrollHeight;
    }

    async getBotResponse(userMessage) {
      try {
        const response = await fetch(
          `https://api-inference.huggingface.co/models/${this.agentType}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
              inputs: userMessage,
            }),
          }
        );
        const data = await response.json();
        const botMessage = data?.length>0 && data[0].generated_text;

        return botMessage || "I'm sorry, I don't understand that.";
      } catch (error) {
        console.error("Error:", error);

        return "Error occurred. Please try again.";
      }
    }

    saveMessages() {
      const messages = Array.from(this.chatDisplay.children).map((child) => {
        const isBot = child.classList.contains("left");
        const text = child.textContent.trim();

        return { text, isBot };
      });

      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }

    loadMessages() {
      const storedMessages =
        JSON.parse(localStorage.getItem("chatMessages")) || [];

      console.log("storedMessages", storedMessages);

      if (storedMessages?.length > 0) {
        this.chatDisplay.innerHTML = "";
        storedMessages.forEach(({ text, isBot }) => {
          this.appendMessage(
            isBot ? "Bot" : "You",
            text,
            isBot ? "left" : "right"
          );
        });
      } else {
        this.appendMessage(
          "Bot",
          "Hello! How can I assist you today?",
          "left",
          true
        );
        this.saveMessages();
      }
    }

    clearMessages() {
      localStorage.removeItem("chatMessages");
      this.chatDisplay.innerHTML = "";
    }

    addClickOutsideListener() {
      document.addEventListener("click", (event) => {
        if (
          !this.chatWindow.contains(event.target) &&
          !this.chatButton.contains(event.target)
        ) {
          this.chatWindow.classList.remove("open");
          this.isOpen = false;
        }
      });
    }
  }

  global.ChatBot = ChatBot;
})(window);
