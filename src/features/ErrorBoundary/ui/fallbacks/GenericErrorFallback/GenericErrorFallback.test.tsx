import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { GenericErrorFallback } from './GenericErrorFallback';
import { classifyError } from '../../../lib';
import { ErrorRecoveryOptions } from '../../../model/types';

describe('GenericErrorFallback', () => {
  const mockResetErrorBoundary = jest.fn();

  // The location mock will be handled globally in jest setup

  beforeEach(() => {
    mockResetErrorBoundary.mockClear();
    // Clear any previous mock calls
    if (window.location.reload) {
      (window.location.reload as jest.Mock).mockClear();
    }
  });

  it('should display the correct user-friendly message', () => {
    const error = classifyError(new Error('Invalid input for validation'));
    render(<GenericErrorFallback error={error} resetErrorBoundary={mockResetErrorBoundary} />);
    expect(screen.getByText('Invalid input for validation')).toBeInTheDocument();
  });

  it('should render a "Try Again" button when the error is recoverable with RETRY', () => {
    const error = classifyError(new Error('Network connection failed'));
    render(<GenericErrorFallback error={error} resetErrorBoundary={mockResetErrorBoundary} />);

    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();
  });

  it('should render a "Reload Page" button when the error is recoverable with RELOAD', () => {
    const error = classifyError(new Error('Failed to load chunk 123'));
    render(<GenericErrorFallback error={error} resetErrorBoundary={mockResetErrorBoundary} />);

    const button = screen.getByRole('button', { name: /reload page/i });
    expect(button).toBeInTheDocument();
  });

  it('should not render any button if the error is not recoverable', () => {
    const error = classifyError(new Error('Some random runtime error'));
    error.isRecoverable = null; // Ensure it's not recoverable
    render(<GenericErrorFallback error={error} resetErrorBoundary={mockResetErrorBoundary} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should call resetErrorBoundary when "Try Again" is clicked', () => {
    const error = classifyError(new Error('Network timeout'));
    render(<GenericErrorFallback error={error} resetErrorBoundary={mockResetErrorBoundary} />);

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it('should call window.location.reload when "Reload Page" is clicked', () => {
    const error = classifyError(new Error('Loading chunk failed'));
    render(<GenericErrorFallback error={error} resetErrorBoundary={mockResetErrorBoundary} />);

    fireEvent.click(screen.getByRole('button', { name: /reload page/i }));
    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(mockResetErrorBoundary).not.toHaveBeenCalled();
  });
});
