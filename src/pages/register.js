import { useState ,useEffect} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// A richer, darker blue for primary actions and headings
const PRIMARY_COLOR = "indigo"; // Using Tailwind's indigo color palette

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
      // NOTE: Replace with your actual API endpoint
      const res = await fetch("/api/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background: Darker, more engaging gradient with a subtle texture feel
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      {/* Card Container: Slightly off-white background, larger shadow, rounded corners */}
      <div className="w-full max-w-md bg-white p-10 border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
        
        {/* Header: Stronger title color and slightly larger text */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">
          Welcome to <span className={`text-${PRIMARY_COLOR}-600`}>GlofTracker</span>
        </h1>
        <p className="text-center text-gray-500 mb-8 text-lg">
          Create your new account
        </p>

        {/* Error/Success Messages: Clearer contrast with background */}
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
          {/* Input Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              // Input Styling: Better contrast border, deeper focus ring color
              className={`w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-${PRIMARY_COLOR}-500 focus:border-${PRIMARY_COLOR}-500 outline-none transition duration-150 ease-in-out`}
              placeholder="Enter your full name"
            />
          </div>

          {/* Input Group */}
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
              className={`w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-${PRIMARY_COLOR}-500 focus:border-${PRIMARY_COLOR}-500 outline-none transition duration-150 ease-in-out`}
              placeholder="you@example.com"
            />
          </div>

          {/* Input Group */}
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
              className={`w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-${PRIMARY_COLOR}-500 focus:border-${PRIMARY_COLOR}-500 outline-none transition duration-150 ease-in-out`}
              placeholder="Enter strong password"
            />
          </div>

          {/* Submit Button: Stronger, more appealing color and hover effect */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-${PRIMARY_COLOR}-600 text-black font-bold py-3 rounded-lg shadow-md hover:bg-${PRIMARY_COLOR}-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]`}
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className={`text-${PRIMARY_COLOR}-600 font-semibold hover:text-${PRIMARY_COLOR}-700 transition duration-150`}
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}