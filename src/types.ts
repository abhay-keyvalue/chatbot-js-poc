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
