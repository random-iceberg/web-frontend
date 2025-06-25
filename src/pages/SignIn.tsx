import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import PageHeader from "components/common/PageHeader";
import Card from "components/common/Card";
import Input from "components/common/forms/Input";
import Button from "components/common/Button";
import Alert from "components/common/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "providers/authProvider";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      await login(email.trim(), password);

      // Navigate to dashboard after successful login
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      console.error("Signin error:", err);

      // Handle different error scenarios
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 429) {
        setError(
          "Too many login attempts. Please wait a few minutes and try again.",
        );
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.message?.includes("Network Error")) {
        setError(
          "Unable to connect to the server. Please check your internet connection.",
        );
      } else {
        setError("An error occurred during sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="flex justify-center text-center">
        <PageHeader
          title="Sign In"
          description="Welcome back! Please sign in to your account."
        />
      </div>

      <div className="max-w-xl mx-auto">
        <Card className="p-6 sm:p-8">
          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="error" className="text-sm">
                {error}
              </Alert>
            )}

            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              required
              disabled={loading}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              required
              disabled={loading}
            />

            <div className="flex justify-end">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-900 hover:underline">
              Sign up!
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
