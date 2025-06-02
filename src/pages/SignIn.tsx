import React, { useState } from "react";
import Layout from "components/Layout";
import PageHeader from "components/common/PageHeader";
import Card from "components/common/Card";
import Input from "components/common/forms/Input";
import Button from "components/common/Button";
import Alert from "components/common/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "services/api";
import { useAuth } from "providers/authProvider";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(api.url("auth/login"), {
        email,
        password,
      });
      console.log("Success: Signin response:", response.data);
      const token = response.data?.access_token;
      if (!token) throw new Error("No token in response.");

      setToken(token);
      setLoading(false);
      navigate("/");
    } catch (err: any) {
      setLoading(false);
      if (err.response?.status === 401) {
        setError("Invalid credentials.");
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("An error occurred during sign in.");
      }
      console.error("Signin error:", err);
    }
  };

  return (
    <Layout>
      {/* ─── Page Header ─── */}
      <div className="flex justify-center text-center">
        <PageHeader title="Sign In" description="" />
      </div>
      <div className="max-w-xl mx-auto">
        <Card className="p-6 sm:p-8">
          {/* ─── Sign In Form ─── */}
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
              required
              disabled={loading}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
              disabled={loading}
            />

            <div className="flex justify-end">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>

          {/* ─── Sign up link ─── */}
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
