import { render, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import React from 'preact/compat';

import App from '../src/screens/chatbotUI';

describe('App Component', () => {
  it('should render the component', () => {
    render(<App />);
    expect(screen.getByText('Start a conversation!')).toBeInTheDocument();
  });
});
