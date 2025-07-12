import React, { Component, ReactNode } from 'react';
import { classifyError } from '../../lib';
import { ClassifiedError, ErrorReporter } from '../../model/types';
import { GenericErrorFallback } from '../fallbacks/GenericErrorFallback/GenericErrorFallback';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: ClassifiedError; resetErrorBoundary: () => void }>;
  reporter?: ErrorReporter;
  onReset?: () => void;
}

interface State {
  error: ClassifiedError | null;
}

const initialState: State = {
  error: null,
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = initialState;

  static getDerivedStateFromError(error: Error): State {
    const classifiedError = classifyError(error);
    return { error: classifiedError };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const classifiedError = classifyError(error, {
      componentStack: errorInfo.componentStack,
    });

    if (this.props.reporter && classifiedError.shouldReport) {
      this.props.reporter.report(classifiedError);
    }
  }

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState(initialState);
  };

  override render() {
    const { children, fallback: FallbackComponent = GenericErrorFallback } = this.props;
    const { error } = this.state;

    if (error) {
      return <FallbackComponent error={error} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return children;
  }
}
