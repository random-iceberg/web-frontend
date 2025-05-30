import React, { useState } from "react";
import Layout from "components/Layout";
import PageHeader from "components/common/PageHeader";
import Card from "components/common/Card";
import Input from "components/common/forms/Input";
import Button from "components/common/Button";
import Alert from "components/common/Alert";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      {
        /* TODO: do actual auth checks */
      }
      setLoading(false);
      setError("The email and password you entered do not match.");
    }, 250);
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
