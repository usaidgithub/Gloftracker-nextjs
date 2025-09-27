import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Changing to the blue color used in the Home page
const PRIMARY_COLOR_CLASS = "blue";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // AUTH CHECK: Use a client-side flag to prevent double redirect/flash
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth");
        if (res.ok) {
          // User is authenticated, redirect
          router.push("/dashboard");
        }
      } catch (error) {
        // User is not authenticated, stay on login
        console.error("Error checking authentication:", error);
      } finally {
        setIsCheckingAuth(false); // Done checking, allow form render
      }
    };
    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // NOTE: Replace with your actual API endpoint for login
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Login failed. Please check your credentials."
        );
      }

      setSuccess("Login successful! Redirecting to dashboard...");
      // Redirect to the main application page upon success
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Optionally render a loading spinner while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  return (
    // Background: Dark theme from Home page (bg-gray-900)
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      {/* Card Container */}
      <div className="w-full max-w-md bg-gray-800 p-10 border border-gray-700 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-white mb-2 tracking-tight">
          Welcome Back to{" "}
          <span className={`text-${PRIMARY_COLOR_CLASS}-500`}>
            GlofTracker
          </span>
        </h1>
        <p className="text-center text-gray-400 mb-8 text-lg">
          Sign in to your account
        </p>

        {/* Error/Success Messages */}
        {error && (
          <p
            className="bg-red-900/40 text-red-400 p-3 rounded-lg text-sm mb-4 border border-red-800"
            role="alert"
          >
            🚨 {error}
          </p>
        )}
        {success && (
          <p
            className="bg-green-900/40 text-green-400 p-3 rounded-lg text-sm mb-4 border border-green-800"
            role="alert"
          >
            ✅ {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full border-gray-600 border bg-gray-700 text-white rounded-lg px-4 py-2.5 placeholder-gray-400 focus:ring-2 focus:ring-${PRIMARY_COLOR_CLASS}-500 focus:border-${PRIMARY_COLOR_CLASS}-500 outline-none transition duration-150 ease-in-out`}
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full border-gray-600 border bg-gray-700 text-white rounded-lg px-4 py-2.5 placeholder-gray-400 focus:ring-2 focus:ring-${PRIMARY_COLOR_CLASS}-500 focus:border-${PRIMARY_COLOR_CLASS}-500 outline-none transition duration-150 ease-in-out`}
              placeholder="Your secure password"
            />

            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <a
                href="/forgot-password"
                className={`text-xs font-medium text-${PRIMARY_COLOR_CLASS}-500 hover:text-${PRIMARY_COLOR_CLASS}-400 transition`}
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-${PRIMARY_COLOR_CLASS}-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-${PRIMARY_COLOR_CLASS}-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className={`text-${PRIMARY_COLOR_CLASS}-500 font-semibold hover:text-${PRIMARY_COLOR_CLASS}-400 transition duration-150`}
          >
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
}
