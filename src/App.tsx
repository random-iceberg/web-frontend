import React, { Suspense } from "react";
import "./global.css";
import AuthProvider from "providers/authProvider";
import Routes from "./routes";
import ErrorBoundary, { AuthErrorBoundary } from "components/ErrorBoundary";
import LoadingState from "components/common/LoadingState";

// Loading component for Suspense fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingState message="Loading application..." />
  </div>
);

const App: React.FC = () => (
  <ErrorBoundary>
    <AuthErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes />
        </Suspense>
      </AuthProvider>
    </AuthErrorBoundary>
  </ErrorBoundary>
);

export default App;
