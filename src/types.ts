export type Theme = {
  primaryColor?: string;
  secondaryColor?: string;
  chatWindowColor?: string;
  chatBubbleColor?: string;
  textColor?: string;
};

export type Settings = {
  chatTitle?: string;
  chatPlaceholder?: string;
  logEnabled?: boolean;
  logo?: string;
  banner?: string;
  botIcon?: string;
  sendIcon?: string;
  closeIcon?: string;
  downIcon?: string;
  maximizeIcon?: string;
  minimizeIcon?: string;
  position?: {
    bottom?: string | number;
    right?: string | number;
  };
  theme?: Theme;
};

export type ChatBotOptions = {
  apiKey: string;
  agentType: string;
  backendBaseUrl?: string;
  settings?: Settings;
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
  type: string;
  timestamp: number;
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
  backendBaseUrl?: string;
  settings?: Settings;
  chat?: {
    id?: string;
    history?: Message[];
  };
}

export interface ChatInputProps {
  handleSendMessage: () => void;
  input: string;
  setInput: (text: string) => void;
  isDisabled?: boolean;
  sendIcon?: string;
  theme?: Theme;
  placeholder?: string;
}

export interface ChatHeaderProps {
  toggleChatWindow: () => void;
  toggleSize: () => void;
  settings?: Settings;
  expanded?: boolean;
}

export interface ChatBubbleProps {
  message: Message;
  index: number;
  theme: Theme;
  event?: string;
  botIcon?: string;
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

export interface TypingBubbleProps {
  theme: Theme;
}
