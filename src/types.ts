export type Theme = {
  primaryColor?: string;
  secondaryColor?: string;
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
  data?: {
    columns?: Column[];
    rows?: Row[];
  };
}

export interface ChatBotUIProps {
  config?: {
    apiKey: string;
    agentType: string;
  };
  settings?: {
    logo?: string;
    botIcon?: string;
    banner?: string;
    sendIcon?: string;
    closeIcon?: string;
    theme?: Theme;
  };
  theme?: Theme;
  chat?: {
    id?: string;
    history?: Message[];
  };
}

export interface ChatInputProps {
  handleSendMessage: () => void;
  input: string;
  setInput: (text: string) => void;
  isDisabled: boolean;
  sendIcon?: string;
}

export interface ChatHeaderProps {
  toggleChatWindow: () => void;
  botIcon?: string;
  closeIcon?: string;
  theme?: Theme;
}

export interface ChatBubbleProps {
  message: Message;
  index: number;
  theme: Theme;
  event: string;
}

export interface MessageData {
  data?: string;
  event?: string;
}

export interface Column {
  header: string;
  accessor: string;
  align?: 'left' | 'center' | 'right';
}

export interface Row {
  [key: string]: string;
}

export interface TableComponentProps {
  columns: Column[];
  rows: Row[];
}
