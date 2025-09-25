import { useState,useEffect } from "react";
import { useRouter } from "next/router";

// Matching the primary color used in the enhanced registration page
const PRIMARY_COLOR = "indigo"; 

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Success state is often less needed for login, but kept for consistency if needed for messages
  const [success, setSuccess] = useState(""); 
 useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth');
        if (res.ok) {
          router.push('/dashboard');
        }
      } catch (error) {
        router.push('/login');
        console.error('Error checking authentication:', error);
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
        // Use the error message from the backend, or a generic one
        throw new Error(data.message || "Login failed. Please check your credentials.");
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

  return (
    // Background: Matching the subtle gray background
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      {/* Card Container: Matching elevated card styling */}
      <div className="w-full max-w-md bg-white p-10 border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
        
        {/* Header: Strong, consistent branding */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">
          Welcome Back to <span className={`text-${PRIMARY_COLOR}-600`}>GlofTracker</span>
        </h1>
        <p className="text-center text-gray-500 mb-8 text-lg">
          Sign in to your account
        </p>

        {/* Error/Success Messages: Matching the enhanced message blocks */}
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-200" role="alert">
            🚨 {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 p-3 rounded-lg text-sm mb-4 border border-green-200" role="alert">
            ✅ {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email Input Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              // Input Styling: Matching enhanced input fields
              className={`w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-${PRIMARY_COLOR}-500 focus:border-${PRIMARY_COLOR}-500 outline-none transition duration-150 ease-in-out`}
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              // Input Styling: Matching enhanced input fields
              className={`w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-${PRIMARY_COLOR}-500 focus:border-${PRIMARY_COLOR}-500 outline-none transition duration-150 ease-in-out`}
              placeholder="Your secure password"
            />
            
            {/* Optional: Forgot Password Link */}
            <div className="text-right mt-2">
              <a href="/forgot-password" 
                 className={`text-xs font-medium text-${PRIMARY_COLOR}-600 hover:text-${PRIMARY_COLOR}-700 transition`}>
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Submit Button: Matching enhanced button styling */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-${PRIMARY_COLOR}-600 text-black font-bold py-3 rounded-lg shadow-md hover:bg-${PRIMARY_COLOR}-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* Footer Link: Matching registration link style */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don&apos;t have an account yet?{" "}
          <a
            href="/register"
            className={`text-${PRIMARY_COLOR}-600 font-semibold hover:text-${PRIMARY_COLOR}-700 transition duration-150`}
          >
            Create one here
          </a>
        </p>
      </div>
    </div>
  );
}