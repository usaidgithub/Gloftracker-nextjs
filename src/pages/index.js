import React from 'react';
import Link from 'next/link';
import { LogIn, UserPlus, Mountain, AlertTriangle, Shield, Zap, DollarSign, Target, Satellite, MessageSquare } from 'lucide-react';

// --- Manually Integrated/Themed UI Components ---

// NOTE: These components maintain the professional look established in previous pages.
const Card = ({ className = "", children }) => (
  <div className={`rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm shadow-xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children }) => (
  <h3 className={`text-xl font-semibold leading-tight text-white ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-4 sm:p-6 ${className}`}>{children}</div>
);

const Button = ({ variant = "default", size = "default", className = "", onClick, children }) => {
  let baseClasses =
    "inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50 shadow-md";

  // Variant Classes
  if (variant === "default" || variant === "hero") {
    // Primary Blue Action Button
    baseClasses += " bg-primary text-white hover:bg-primary/90 hover:shadow-primary/50";
  } else if (variant === "outline") {
    // Secondary White/Outline Button
    baseClasses += " border border-gray-600 text-white bg-transparent hover:bg-gray-800/70";
  } else if (variant === "danger") {
    // High-Urgency Red Button
    baseClasses += " bg-red-600 text-white hover:bg-red-700 hover:shadow-red-500/50";
  }

  // Size Classes
  if (size === "default") {
    baseClasses += " h-10 px-4 py-2";
  } else if (size === "lg") {
    baseClasses += " h-12 px-8 py-3";
  }

  return (
    <button className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};


// --- GLOF Tracker Landing Component ---

const GLOFTrackerLanding = () => {
  const handleLoginClick = () => console.log('Navigate to login page');
  const handleRegisterClick = () => console.log('Navigate to register page');

  const features = [
    { icon: Zap, title: 'Instant Alerts', description: 'Immediate, zone-based danger notifications to your device.', color: 'text-yellow-400' },
    { icon: Shield, title: 'Safety Protocols', description: 'Comprehensive evacuation plans and safety guidelines.', color: 'text-green-500' },
    { icon: Satellite, title: 'Live Monitoring', description: 'Real-time glacial lake surveillance using high-res satellite data.', color: 'text-blue-400' },
    { icon: DollarSign, title: 'Donation Portal', description: 'Secure channel to support affected communities (matches your existing page).', color: 'text-primary' },
    { icon: Target, title: 'Govt. Schemes', description: 'Direct access to disaster relief and rehabilitation programs.', color: 'text-indigo-400' },
    { icon: MessageSquare, title: 'Emergency Comms', description: 'Instant access to emergency services and rescue teams.', color: 'text-red-500' }
  ];

  return (
    // Main Container with Professional Dark Theme
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* Background Gradient Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 to-black/50"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative z-10 pt-20 pb-12">
        {/* === 1. HERO SECTION === */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">

            {/* Logo and Title */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <Mountain className="w-10 h-10 text-primary mr-2 sm:mr-3" /> {/* Reduced right margin on mobile */}
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent leading-none">
                {/* ADDED leading-none to remove vertical text gap on small screens */}
                GLOF Tracker
              </h1>
            </div>

            {/* Main Tagline */}
            <h2 className="text-2xl sm:text-3xl font-light text-gray-300 mb-6">
              <span className="font-bold">Predict. Protect. Survive.</span> Your essential{" "}
              <span className="font-bold">Early Warning System</span> for Glacier Lake Outburst Floods.
            </h2>

            {/* Description Card - Highlighting Core Value */}
            <Card className="p-8 sm:p-10 mb-12 border-primary/40">
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                We transform complex remote sensing and hydrological data into{" "}
                <span className="font-bold">actionable safety notifications</span> on your location.
                Know instantly whether you are in a{" "}
                <span className="text-green-400 font-semibold">Safe Zone</span> or{" "}
                <span className="text-red-400 font-semibold">Danger Zone</span>.
              </p>


              {/* Action Buttons - Login/Register */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleLoginClick}
                    className="min-w-[220px]"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Login to Dashboard
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleRegisterClick}
                    className="min-w-[220px]"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleRegisterClick}
                    className="min-w-[220px]"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Continue as Guest
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* === 2. RISK ZONE CLASSIFICATION === */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center text-white mb-10">Instant Risk Status</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-green-500/50 hover:bg-green-900/20">
              <CardContent className="flex items-start">
                <div className="p-3 rounded-full bg-green-500/20 text-green-400 mr-4 flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-green-400 mb-2">Safe Zone Status</CardTitle>
                  <p className="text-gray-400">
                    Your location is currently outside the projected inundation area. Continuous monitoring is active.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-500/50 hover:bg-red-900/20">
              <CardContent className="flex items-start">
                <div className="p-3 rounded-full bg-red-500/20 text-red-400 mr-4 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-red-400 mb-2">Danger Zone Alert</CardTitle>
                  <p className="text-gray-400">
                    High risk detected. Immediate action/evacuation required based on local protocols.Check the app now.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* === 3. CORE FEATURES & FACILITIES === */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Comprehensive Safety Ecosystem</h2>
          <p className="text-center text-gray-400 mb-12 text-lg">Tools for prediction, preparedness, and post-disaster response</p>

          {/* Responsive Features Grid: 2 cols on tablet, 3 on desktop */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:border-blue-500/70">
                  <CardContent>
                    <div className={`p-4 rounded-xl w-fit mb-4 bg-primary/10 ${feature.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="mb-2">{feature.title}</CardTitle>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* === 4. TECHNOLOGY & PARTNERS SECTION === */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Powered by Geospatial Intelligence</h2>

            <Card className="p-8 border-blue-500/30">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-between text-left">

                {/* Tech Item 1: Satellite Data */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/20 text-blue-400">
                    <Satellite className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Advanced Remote Sensing</h3>
                    <p className="text-gray-400 text-sm">Real-time data feeds from multiple satellite sources.</p>
                  </div>
                </div>

                {/* Tech Item 2: AI/ML */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/20 text-blue-400">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">AI/ML Prediction Models</h3>
                    <p className="text-gray-400 text-sm">Proprietary algorithms for GLOF initiation forecasting.</p>
                  </div>
                </div>

                {/* Tech Item 3: Alert System */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/20 text-blue-400">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Hyper-Localized GIS</h3>
                    <p className="text-gray-400 text-sm">Pinpoint risk assessment down to street level.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* === 5. EMERGENCY CALL TO ACTION === */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Card className="p-8 sm:p-10 border-red-500/50 bg-red-900/10">
              <h2 className="text-3xl font-bold text-red-300 mb-4">Immediate Emergency Access</h2>
              <p className="text-red-100 mb-6 text-lg">
                During an <span className="font-bold">active GLOF alert</span>, you can bypass registration
                to instantly access emergency dialpads and evacuation maps.
              </p>

              <Button
                variant="danger"
                size="lg"
                onClick={() => console.log('Initiate Emergency Bypass')}
                className="w-full sm:w-auto"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                SOS Emergency Access
              </Button>
            </Card>
          </div>
        </section>

        {/* === FOOTER === */}
        <footer className="mt-12 container mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-gray-800 pt-8">
          <h3 className="text-xl font-bold text-white mb-2">GLOF Tracker: Predictive Safety for Mountain Communities</h3>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GLOF Tracker. All rights reserved. | <span className="text-primary">Life Protection through Innovation.</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default GLOFTrackerLanding;