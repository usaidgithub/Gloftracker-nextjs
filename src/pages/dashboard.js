import { useRouter } from "next/router";
import { useEffect } from "react";
// Matching the primary color for consistency
const PRIMARY_COLOR = "indigo"; 

export default function Dashboard() {
  const router = useRouter();

  //Check user is logged in or not 
   useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth');
        if (res.ok) {
          //   router.push('/chatbot');
          console.log('Authenticated');
        }
      } catch (error) {
        router.push('/login');
        console.error('Error checking authentication:', error);
      }
    };
    checkAuth();
  }, [router]);
  return (
    // Background: Matching the subtle gray background
    <div className="min-h-screen bg-gray-50">
      
      {/* Header/Navigation Bar */}
      <nav className={`bg-white shadow-md border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">
                GlofTracker <span className={`text-${PRIMARY_COLOR}-600`}>Dashboard</span>
              </h1>
            </div>

            {/* Logout Button */}
            <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500 hidden sm:block">
                    Welcome, User!
                </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Dashboard Overview
          </h2>
          
          {/* Welcome Card - Highlighting the core message */}
          <div className={`bg-white rounded-xl shadow-xl p-10 border-t-4 border-${PRIMARY_COLOR}-500`}>
            <h3 className={`text-4xl font-bold text-gray-800 mb-3`}>
                🎉 Welcome to the GlofTracker Dashboard!
            </h3>
            <p className="text-xl text-gray-600">
                You have successfully logged in and are now viewing your temporary home page. 
                This area will soon contain your data, settings, and application features.
            </p>
            <div className="mt-6">
                 {/* A simple call to action */}
                <button
                    className={`inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${PRIMARY_COLOR}-500`}
                >
                    Start Tracking
                </button>
            </div>
          </div>
          
          {/* Placeholder Content Area */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-500 h-32 flex items-center justify-center border border-gray-100">
                Data Widget Placeholder
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-500 h-32 flex items-center justify-center border border-gray-100">
                Stats Card Placeholder
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-500 h-32 flex items-center justify-center border border-gray-100">
                Actions Placeholder
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}