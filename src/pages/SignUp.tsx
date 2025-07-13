import React, { useState } from "react";
import Layout from "components/Layout";
import PageHeader from "components/common/PageHeader";
import Card from "components/common/Card";
import Input from "components/common/forms/Input";
import Button from "components/common/Button";
import Alert from "components/common/Alert";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "services/api";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      await axios.post(api.url("auth/signup"), {
        email,
        password,
      });
      setLoading(false);
      setSuccess(true);
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        if (err.response.status === 409) {
          setError("This email is already registered.");
        } else if (err.response.data && err.response.data.detail) {
          setError(err.response.data.detail);
        } else {
          setError("An error occurred during sign up.");
        }
      } else {
        setError("An error occurred during sign up.");
      }
      console.log("Signup error:", err);
    }
  };

  return (
    <Layout>
      {/* ─── Page Header ─── */}
      <div className="flex justify-center text-center">
        <PageHeader title="Sign Up" description="" />
      </div>
      <div className="max-w-xl mx-auto">
        <Card className="p-6 sm:p-8">
          {/* ─── Sign Up Form ─── */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="error" className="text-sm">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="text-sm">
                {"You have succesfully signed up :)"}
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
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </form>

          {/* ─── Sign in link ─── */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-900 hover:underline">
              Sign in!
            </Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
