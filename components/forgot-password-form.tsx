"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
        {success ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Check your email
            </h1>
            <p className="text-sm text-gray-500 text-center">
              If an account exists for this email, you will receive a password
              reset link shortly.
            </p>

            <p className="mt-6 text-center text-sm">
              <Link
                href="/auth/login"
                className="underline underline-offset-4 text-gray-700"
              >
                Back to login
              </Link>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Reset your password
            </h1>
            <p className="mb-6 text-sm text-gray-500 text-center">
              Enter your email and we&apos;ll send you a reset link
            </p>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-black text-white py-2 text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send reset email"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Go back to{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
