import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('renders navbar brand', () => {
  render(<App />);
  const brandElement = screen.getByRole('button', { name: /axel s/i });
  expect(brandElement).toBeInTheDocument();
});

test('opens folder context menu and shows properties panel', () => {
  render(<App />);

  const folderLabel = screen.getByText('Illustration');
  fireEvent.contextMenu(folderLabel);

  fireEvent.click(screen.getByRole('button', { name: 'Properties' }));

  const propertiesPanel = screen.getByTestId('properties-panel');
  expect(propertiesPanel).toBeInTheDocument();
  expect(within(propertiesPanel).getByText(/Name:/i)).toBeInTheDocument();
  expect(within(propertiesPanel).getByText(/Illustration/i)).toBeInTheDocument();
});

test('closes context menu with Escape', () => {
  render(<App />);

  const folderLabel = screen.getByText('Illustration');
  fireEvent.contextMenu(folderLabel);
  expect(screen.getByRole('button', { name: 'Properties' })).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByRole('button', { name: 'Properties' })).not.toBeInTheDocument();
});
