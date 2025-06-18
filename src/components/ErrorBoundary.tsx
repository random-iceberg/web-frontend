import React, { Component, ErrorInfo, ReactNode } from "react";
import Alert from "components/common/Alert";
import Button from "components/common/Button";
import Card from "components/common/Card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <Card className="max-w-lg w-full p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Something went wrong
              </h1>
              <Alert variant="error" className="text-left mb-6">
                <div className="space-y-2">
                  <p className="font-medium">
                    {this.state.error?.message ||
                      "An unexpected error occurred"}
                  </p>
                  {process.env.NODE_ENV === "development" &&
                    this.state.errorInfo && (
                      <details className="text-xs">
                        <summary className="cursor-pointer">
                          Technical details
                        </summary>
                        <pre className="mt-2 whitespace-pre-wrap">
                          {this.state.error?.stack}
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                </div>
              </Alert>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={this.handleReset} variant="secondary">
                  Try Again
                </Button>
                <Button onClick={this.handleReload} variant="primary">
                  Reload Page
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Auth-specific error boundary for authentication flows
export const AuthErrorBoundary: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const handleAuthError = (error: Error, errorInfo: ErrorInfo) => {
    console.error("Authentication error:", error, errorInfo);

    // Clear potentially corrupted auth state
    localStorage.removeItem("token");

    // Report to error tracking service in production
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(error, { contexts: { errorInfo } });
    }
  };

  return (
    <ErrorBoundary
      onError={handleAuthError}
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <Card className="max-w-md w-full p-6">
            <Alert variant="error" title="Authentication Error">
              <p className="mb-4">
                There was a problem with authentication. Please sign in again.
              </p>
              <Button
                onClick={() => (window.location.href = "/signin")}
                variant="primary"
                fullWidth
              >
                Go to Sign In
              </Button>
            </Alert>
          </Card>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};
