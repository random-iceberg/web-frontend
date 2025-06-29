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
import api from "services/api";

type UserRole = "anon" | "user" | "admin";
type AuthStatus = "loading" | "known" | "logging_in" | "logging_out";

interface AuthContextType {
  isLoading: boolean;
  authStatus: AuthStatus;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
  const [role, setRole] = useState<UserRole>("anon");

  const updateAuthStatus = useCallback(async () => {
    const response = await axios.get(api.url("auth/me_myself_and_I"));
    // TODO: if backend is unreachable - set authStatus to "unknown" and start polling

    // for isLoading testing. TODO: right now the pages do not look great when isLoading is true
    // await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

    setRole(response.data.role);
    return response.data.role !== "anon";
  }, []);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    updateAuthStatus().finally(() => setAuthStatus("known"));
  }, []);

  const login = useCallback((email: string, password: string) => {
    setAuthStatus("logging_in");

    return axios
      .post(api.url("auth/login"), { email, password })
      .then(updateAuthStatus)
      .then((isLoggedIn) => {
        if (!isLoggedIn) {
          throw Error("not logged in");
        }
      })
      .finally(() => setAuthStatus("known"));
  }, []);

  const logout = useCallback(() => {
    setAuthStatus("logging_out");

    return axios
      .post(api.url("auth/logout"), null)
      .then(updateAuthStatus)
      .then(() => {})
      .finally(() => setAuthStatus("known"));
  }, []);

  // Function to test/refresh authentication
  const refreshAuth = useCallback(async (): Promise<boolean> => {
    if (role === "anon") return false;
    // TODO: refreshing

    // 401 should be handled by the interceptor below
    return await updateAuthStatus();
  }, [role, logout]);

  // Handle axios interceptor for global auth error handling
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // If we get a 401, the token is likely expired
        if (error.response?.status === 401 && role !== "anon") {
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
  }, [role, logout]);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      isLoading: authStatus === "loading",
      authStatus,
      isAuthenticated: role !== "anon",
      role,
      login,
      logout,
      refreshAuth,
    }),
    [authStatus, role, login, logout, refreshAuth],
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
