interface Theme {
    buttonColor?: string;
    chatWindowColor?: string;
    textColor?: string;
  }
  
  interface ChatBotOptions {
    apiKey: string;
    agentType: string;
    theme?: Theme;
  }
  
  interface Message {
    text: string;
    isBot: boolean;
  }
  
(function (global: any) {
  class ChatBot {
    private apiKey: string;
    private agentType: string;
    private theme: Theme;
    private isOpen: boolean;
    private chatButton!: HTMLDivElement;
    private chatWindow!: HTMLDivElement;
    private chatDisplay!: HTMLDivElement;
    private chatInput!: HTMLInputElement;
  
    constructor({ apiKey, agentType, theme = {} }: ChatBotOptions) {
      this.apiKey = apiKey;
      this.agentType = agentType;
  
      const defaultTheme: Theme = {
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
  
    private loadStyles(): void {
      const style = document.createElement("style");

      style.innerHTML = `
          /* CSS styles here, same as provided */
        `;
      document.head.appendChild(style);
    }
  
    private initUI(): void {
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
          .querySelector(".close-button")!
          .addEventListener("click", () => this.toggleChatWindow());
        chatHeader
          .querySelector(".clear")!
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
  
    private toggleChatWindow(): void {
      this.isOpen = !this.isOpen;
      this.chatWindow.classList.toggle("open", this.isOpen);
      if (this.isOpen) 
        this.loadMessages();
        
    }
  
    private async handleSendMessage(): Promise<void> {
      const userMessage = this.chatInput.value.trim();

      if (!userMessage) return;
  
      this.appendMessage("You", userMessage, "right");
      this.chatInput.value = "";
  
      const botResponse = await this.getBotResponse(userMessage);

      this.appendMessage("Bot", botResponse, "left");
      this.saveMessages();
    }
  
    private appendMessage(sender: string, message: string, align: "left" | "right"): void {
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
  
    private async getBotResponse(userMessage: string): Promise<string> {
      try {
        const response = await fetch(
          `https://api-inference.huggingface.co/models/${this.agentType}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({ inputs: userMessage }),
          }
        );
        const data = await response.json();

        return data?.[0]?.generated_text || "I'm sorry, I don't understand that.";
      } catch (error) {
        console.error("Error:", error);

        return "Error occurred. Please try again.";
      }
    }
  
    private saveMessages(): void {
      const messages: Message[] = Array.from(this.chatDisplay.children).map(
        (child) => {
          const isBot = child.classList.contains("left");
          const text = (child as HTMLElement).innerText.trim();

          return { text, isBot };
        }
      );

      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  
    private loadMessages(): void {
      const storedMessages: Message[] = JSON.parse(localStorage.getItem("chatMessages") || "[]");
  
      if (storedMessages.length > 0) {
        this.chatDisplay.innerHTML = "";
        storedMessages.forEach(({ text, isBot }) => {
          this.appendMessage(isBot ? "Bot" : "You", text, isBot ? "left" : "right");
        });
      } else {
        this.appendMessage(
          "Bot",
          "Hello! How can I assist you today?",
          "left"
        );
        this.saveMessages();
      }
    }
  
    private clearMessages(): void {
      localStorage.removeItem("chatMessages");
      this.chatDisplay.innerHTML = "";
    }
  
    private addClickOutsideListener(): void {
      document.addEventListener("click", (event) => {
        if (
          !this.chatWindow.contains(event.target as Node) &&
            !this.chatButton.contains(event.target as Node)
        ) {
          this.chatWindow.classList.remove("open");
          this.isOpen = false;
        }
      });
    }
  }
  
  global.ChatBot = ChatBot;
})(window);
  