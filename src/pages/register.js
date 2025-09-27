import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Changing to the blue color used in the Home and Login pages
const PRIMARY_COLOR_CLASS = "blue";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // State to manage whether the auth check is complete
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth");
        if (res.ok) {
          // User is already authenticated, redirect
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsCheckingAuth(false);
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
      // NOTE: Replace with your actual API endpoint
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      {/* Card Container */}
      <div className="w-full max-w-md bg-gray-800 p-10 border border-gray-700 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-white mb-2 tracking-tight">
          Welcome to{" "}
          <span className={`text-${PRIMARY_COLOR_CLASS}-500`}>GlofTracker</span>
        </h1>
        <p className="text-center text-gray-400 mb-8 text-lg">
          Create your new account
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
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full border-gray-600 border bg-gray-700 text-white rounded-lg px-4 py-2.5 placeholder-gray-400 focus:ring-2 focus:ring-${PRIMARY_COLOR_CLASS}-500 focus:border-${PRIMARY_COLOR_CLASS}-500 outline-none transition duration-150 ease-in-out`}
              placeholder="Enter your full name"
            />
          </div>

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
              placeholder="Enter strong password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-${PRIMARY_COLOR_CLASS}-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-${PRIMARY_COLOR_CLASS}-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]`}
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className={`text-${PRIMARY_COLOR_CLASS}-500 font-semibold hover:text-${PRIMARY_COLOR_CLASS}-400 transition duration-150`}
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
