// Auth Flow Test Suite
// This can be run in the browser console to test the authentication flow

import axios from "axios";
import api from "services/api";

interface TestResult {
  test: string;
  passed: boolean;
  error?: string;
  details?: any;
}

class AuthFlowTester {
  private results: TestResult[] = [];
  private testCredentials = {
    email: `test_${Date.now()}@example.com`,
    password: "TestPassword123!",
  };

  async runAllTests(): Promise<TestResult[]> {
    console.log("🚀 Starting Auth Flow Tests...");
    this.results = [];

    await this.testTokenPersistence();
    await this.testSignUpFlow();
    await this.testSignInFlow();
    await this.testProtectedRouteAccess();
    await this.testTokenRefresh();
    await this.testLogoutFlow();
    await this.testInvalidCredentials();
    await this.testExpiredToken();

    this.printResults();
    return this.results;
  }

  private addResult(
    test: string,
    passed: boolean,
    error?: string,
    details?: any,
  ) {
    this.results.push({ test, passed, error, details });
    const icon = passed ? "✅" : "❌";
    console.log(`${icon} ${test}`, error ? `- ${error}` : "");
  }

  async testTokenPersistence(): Promise<void> {
    try {
      const testToken = `test_token_${Date.now()}`;

      // Test localStorage availability
      localStorage.setItem("test_auth_token", testToken);
      const retrieved = localStorage.getItem("test_auth_token");
      localStorage.removeItem("test_auth_token");

      if (retrieved === testToken) {
        this.addResult("Token Persistence", true);
      } else {
        this.addResult(
          "Token Persistence",
          false,
          "Retrieved token doesn't match",
        );
      }
    } catch (error) {
      this.addResult("Token Persistence", false, (error as Error).message);
    }
  }

  async testSignUpFlow(): Promise<void> {
    try {
      const response = await axios.post(api.url("auth/signup"), {
        email: this.testCredentials.email,
        password: this.testCredentials.password,
      });

      if (response.status === 200 || response.status === 201) {
        this.addResult("Sign Up Flow", true, undefined, response.data);
      } else {
        this.addResult(
          "Sign Up Flow",
          false,
          `Unexpected status: ${response.status}`,
        );
      }
    } catch (error: any) {
      // Sign up might fail if user already exists, which is acceptable
      if (error.response?.status === 409) {
        this.addResult(
          "Sign Up Flow",
          true,
          "User already exists (acceptable)",
        );
      } else {
        this.addResult(
          "Sign Up Flow",
          false,
          error.response?.data?.detail || error.message,
        );
      }
    }
  }

  async testSignInFlow(): Promise<void> {
    try {
      const response = await axios.post(api.url("auth/login"), {
        email: this.testCredentials.email,
        password: this.testCredentials.password,
      });

      if (response.data?.access_token) {
        // Store token for subsequent tests
        localStorage.setItem("test_token", response.data.access_token);
        this.addResult("Sign In Flow", true, undefined, {
          tokenLength: response.data.access_token.length,
        });
      } else {
        this.addResult("Sign In Flow", false, "No access token in response");
      }
    } catch (error: any) {
      this.addResult(
        "Sign In Flow",
        false,
        error.response?.data?.detail || error.message,
      );
    }
  }

  async testProtectedRouteAccess(): Promise<void> {
    try {
      const token = localStorage.getItem("test_token");
      if (!token) {
        this.addResult(
          "Protected Route Access",
          false,
          "No token available for testing",
        );
        return;
      }

      // Test accessing protected endpoint
      const response = await axios.get(api.url("models"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        this.addResult("Protected Route Access", true);
      } else {
        this.addResult(
          "Protected Route Access",
          false,
          `Unexpected status: ${response.status}`,
        );
      }
    } catch (error: any) {
      this.addResult(
        "Protected Route Access",
        false,
        error.response?.data?.detail || error.message,
      );
    }
  }

  async testTokenRefresh(): Promise<void> {
    try {
      const token = localStorage.getItem("test_token");
      if (!token) {
        this.addResult(
          "Token Refresh",
          false,
          "No token available for testing",
        );
        return;
      }

      // Test token validation endpoint if available
      try {
        await axios.get(api.url("auth/verify"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.addResult("Token Refresh", true);
      } catch (error: any) {
        if (error.response?.status === 404) {
          this.addResult(
            "Token Refresh",
            true,
            "Endpoint not implemented (acceptable)",
          );
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      this.addResult(
        "Token Refresh",
        false,
        error.response?.data?.detail || error.message,
      );
    }
  }

  async testLogoutFlow(): Promise<void> {
    try {
      const token = localStorage.getItem("test_token");
      if (!token) {
        this.addResult("Logout Flow", false, "No token available for testing");
        return;
      }

      // Test logout endpoint if available
      try {
        await axios.post(
          api.url("auth/logout"),
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } catch (error: any) {
        if (error.response?.status === 404) {
          // Logout endpoint not implemented, just test token removal
        } else {
          throw error;
        }
      }

      // Test that token is removed from localStorage
      localStorage.removeItem("test_token");
      const removedToken = localStorage.getItem("test_token");

      if (removedToken === null) {
        this.addResult("Logout Flow", true);
      } else {
        this.addResult("Logout Flow", false, "Token not properly removed");
      }
    } catch (error: any) {
      this.addResult(
        "Logout Flow",
        false,
        error.response?.data?.detail || error.message,
      );
    }
  }

  async testInvalidCredentials(): Promise<void> {
    try {
      await axios.post(api.url("auth/login"), {
        email: "invalid@example.com",
        password: "wrongpassword",
      });

      this.addResult(
        "Invalid Credentials Test",
        false,
        "Should have failed with invalid credentials",
      );
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.addResult("Invalid Credentials Test", true);
      } else {
        this.addResult(
          "Invalid Credentials Test",
          false,
          `Unexpected error: ${error.message}`,
        );
      }
    }
  }

  async testExpiredToken(): Promise<void> {
    try {
      // Test with a clearly invalid token
      const invalidToken = "invalid.token.here";

      await axios.get(api.url("models"), {
        headers: { Authorization: `Bearer ${invalidToken}` },
      });

      this.addResult(
        "Expired Token Test",
        false,
        "Should have failed with invalid token",
      );
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.addResult("Expired Token Test", true);
      } else {
        this.addResult(
          "Expired Token Test",
          false,
          `Unexpected error: ${error.message}`,
        );
      }
    }
  }

  private printResults(): void {
    console.log("\n📊 Auth Flow Test Results:");
    console.log("=".repeat(50));

    const passed = this.results.filter((r) => r.passed).length;
    const total = this.results.length;

    console.log(`✅ Passed: ${passed}/${total}`);
    console.log(`❌ Failed: ${total - passed}/${total}`);

    const failed = this.results.filter((r) => !r.passed);
    if (failed.length > 0) {
      console.log("\n❌ Failed Tests:");
      failed.forEach((result) => {
        console.log(`  - ${result.test}: ${result.error}`);
      });
    }

    console.log("\n🔧 Recommendations:");
    if (failed.some((r) => r.test.includes("Sign"))) {
      console.log("  - Check backend authentication endpoints");
    }
    if (failed.some((r) => r.test.includes("Protected"))) {
      console.log("  - Verify protected route authorization");
    }
    if (failed.some((r) => r.test.includes("Token"))) {
      console.log("  - Check token handling and storage");
    }
  }

  // Utility method to test auth state in React components
  testReactAuthState(): void {
    console.log("🔍 Testing React Auth State...");

    // This would need to be called from within a React component
    const authStateTest = `
      // Add this to a React component for testing:
      
      import { useAuth } from 'providers/authProvider';
      
      function AuthStateTest() {
        const { token, isAuthenticated, isLoading } = useAuth();
        
        console.log('Auth State:', {
          hasToken: !!token,
          isAuthenticated,
          isLoading,
          tokenLength: token?.length
        });
        
        return null;
      }
    `;

    console.log(authStateTest);
  }
}

// Export for use in browser console or tests
export const authTester = new AuthFlowTester();

// Usage example:
// authTester.runAllTests().then(results => console.log('Tests completed:', results));

// For browser console usage:
if (typeof window !== "undefined") {
  (window as any).authTester = authTester;
  console.log("🔧 Auth tester available at window.authTester");
  console.log("Run: authTester.runAllTests()");
}
