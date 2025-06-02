import React from "react";
import "./global.css";
import AuthProvider from "providers/authProvider";
import Routes from "./routes";

const App: React.FC = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
);

export default App;
