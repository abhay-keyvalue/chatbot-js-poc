import { fireEvent, render, screen } from '@testing-library/preact';
import React from 'preact/compat';
import '@testing-library/jest-dom';

import ChatBotUI from '../src/screens/chatbotUI';

describe('ChatBotUI Component', () => {
  const mockSettings = {
    botIcon: 'test-bot-icon.png',
    sendIcon: 'test-send-icon.png',
    closeIcon: 'test-close-icon.png'
  };
  const mockTheme = {
    primaryColor: '#000000'
  };

  it('should render the chatbot icon', () => {
    render(<ChatBotUI settings={mockSettings} theme={mockTheme} />);
    const botIcon = screen.getByAltText('Chat');

    expect(botIcon).toBeInTheDocument();
  });

  it('should open the chat window when the chatbot button is clicked', () => {
    render(<ChatBotUI settings={mockSettings} theme={mockTheme} />);
    const chatbotButton = screen.getByAltText('Chat');

    fireEvent.click(chatbotButton);

    const chatWindow = screen.getByRole('dialog', { hidden: true });

    expect(chatWindow).toHaveClass('open');
  });
});
