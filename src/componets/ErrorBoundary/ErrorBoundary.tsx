import React, { Component } from 'react';

type ErrorBoundaryProps = { fallback: React.ReactNode; children: React.ReactNode };

export class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? this.props.fallback || null : this.props.children;
  }
}
