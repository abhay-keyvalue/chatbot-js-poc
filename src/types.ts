export type Theme = {
  buttonColor?: string;
  chatWindowColor?: string;
  textColor?: string;
};

export type ChatBotOptions = {
  apiKey: string;
  agentType: string;
  theme?: Theme;
};

export type GetCookieTypes = {
  cookieName: string;
};

export type SetCookieTypes = {
  cookieName: string;
  cookieValue: string;
  expiryInDays: number;
};

export interface Message {
  text: string;
  isBot: boolean;
}

export interface ChatBotUIProps {
  theme?: {
    buttonColor?: string;
    chatWindowColor?: string;
    textColor?: string;
  };
  config?: {
    apiKey: string;
    agentType: string;
  };
}
