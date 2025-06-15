import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
  refreshAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = "auth_token";

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken_] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        setToken_(storedToken);
        // Set axios header immediately
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.warn("Failed to load auth token from localStorage:", error);
      // Clear any corrupted data
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to set the authentication token
  const setToken = useCallback((newToken: string | null) => {
    setToken_(newToken);

    try {
      if (newToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        localStorage.setItem(TOKEN_KEY, newToken);
      } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (error) {
      console.error("Failed to update auth token:", error);
      // If localStorage fails, at least update memory state
      setToken_(newToken);
      if (newToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setToken(null);
    // Clear any cached user data
    // Could also call backend logout endpoint here if needed
  }, [setToken]);

  // Function to test/refresh authentication
  const refreshAuth = useCallback(async (): Promise<boolean> => {
    if (!token) return false;

    try {
      // Test the token by making a request to a protected endpoint
      await axios.get("/api/auth/verify"); // Adjust endpoint as needed
      return true;
    } catch (error) {
      console.warn("Token validation failed:", error);
      // Token is invalid, clear it
      logout();
      return false;
    }
  }, [token, logout]);

  // Handle axios interceptor for global auth error handling
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // If we get a 401, the token is likely expired
        if (error.response?.status === 401 && token) {
          console.warn("Received 401 response, clearing auth token");
          logout();
        }
        return Promise.reject(error);
      },
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [token, logout]);

  // Derived state
  const isAuthenticated = Boolean(token);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      token,
      isLoading,
      isAuthenticated,
      setToken,
      logout,
      refreshAuth,
    }),
    [token, isLoading, isAuthenticated, setToken, logout, refreshAuth],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

// Auth testing utilities (for development)
export const authTestUtils = {
  // Test login flow
  testLogin: async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      return Boolean(response.data?.access_token);
    } catch (error) {
      console.error("Login test failed:", error);
      return false;
    }
  },

  // Test token persistence
  testTokenPersistence: (): boolean => {
    try {
      const testToken = "test_token_" + Date.now();
      localStorage.setItem(TOKEN_KEY, testToken);
      const retrieved = localStorage.getItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_KEY);
      return retrieved === testToken;
    } catch (error) {
      console.error("Token persistence test failed:", error);
      return false;
    }
  },

  // Test protected route access
  testProtectedAccess: async (token: string): Promise<boolean> => {
    try {
      const originalAuth = axios.defaults.headers.common["Authorization"];
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Test a protected endpoint
      await axios.get("/api/models"); // Adjust endpoint as needed

      // Restore original auth
      if (originalAuth) {
        axios.defaults.headers.common["Authorization"] = originalAuth;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }

      return true;
    } catch (error) {
      console.error("Protected access test failed:", error);
      return false;
    }
  },
};
