import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"
import EmergencyButton from "../components/EmergencyButton"
import Link from "next/link";
import {
  MapPin,
  Thermometer,
  Cloud,
  AlertTriangle,
  Monitor,
  BookOpen,
  BarChart3,
  Users,
  Heart,
  Phone,
  Brain,
  Satellite,
  Activity,
  Globe,
  Zap,
  Bell,
} from "lucide-react";

// --- START: Custom UI Components & Utility Styles ---
const heroImage="./hero-glacier.jpg"
// 1. Custom Button Component
// NOTE: For Next.js modern API, this component should pass down 'className' to its root element
const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Size styles
  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-11 px-6 text-base",
    xl: "h-12 px-8 text-lg",
  };

  // Variant styles - Simplified for this example
  const variantStyles = {
    default: "bg-gray-700 text-white hover:bg-gray-800",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    hero: "bg-blue-600 text-white shadow-lg shadow-blue-500/50 hover:bg-blue-700",
    glass: "bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20",
    emergency: "bg-red-600 text-white shadow-lg shadow-red-500/50 hover:bg-red-700",
  };

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      // {...props} will now correctly pass the 'ref' and other Link-related props if needed
      {...props}
    >
      {children}
    </button>
  );
};

// 2. Custom Card Component
const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// 3. Custom Badge Component
const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const baseStyle = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    default: "border-transparent bg-gray-100 text-gray-800",
    secondary: "border-transparent bg-gray-800 text-white hover:bg-gray-700",
    outline: "text-foreground",
  };

  return (
    <div
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};



// --- END: Custom UI Components & Utility Styles ---


// Dummy location data
const mockLocationData = {
  name: "Kathmandu Valley",
  temperature: "18°C",
  weather: "Partly Cloudy",
  humidity: "65%",
  windSpeed: "12 km/h",
  riskLevel: "moderate",
  lastUpdated: new Date().toLocaleTimeString(),
  glacierLakes: 12,
  monitoringStations: 8,
};

const Home = () => {
  const [locationData, setLocationData] = useState(mockLocationData);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Effect to update the time display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: "Live Dashboard",
      description: "Real-time monitoring of glacier lakes and GLOF risk assessment",
      icon: Monitor,
      href: "/dashboard",
      color: "primary",
    },
    {
      title: "Analytics Center",
      description: "Comprehensive data analysis and trend monitoring",
      icon: BarChart3,
      href: "/analytics",
      color: "secondary",
    },
    {
      title: "Emergency Services",
      description: "Direct access to disaster management and emergency contacts",
      icon: Phone,
      href: "/safety",
      color: "emergency",
    },
    {
      title: "AI Assistant",
      description: "Intelligent chatbot for guidance and emergency support",
      icon: Brain,
      href: "/chatbot",
      color: "default",
    },
    {
      title: "Organizations",
      description: "Connect with NGOs and support organizations",
      icon: Users,
      href: "/organizations",
      color: "default",
    },
    {
      title: "Donations",
      description: "Support communities affected by glacier disasters",
      icon: Heart,
      href: "/donations",
      color: "default",
    },
  ];

  const additionalFeatures = [
    {
      title: "Satellite Monitoring",
      description: "Real-time satellite imagery analysis",
      icon: Satellite,
    },
    {
      title: "Early Warning System",
      description: "Advanced alert mechanisms for communities",
      icon: Bell,
    },
    {
      title: "Risk Assessment",
      description: "AI-powered glacier lake danger evaluation",
      icon: Activity,
    },
    {
      title: "Global Network",
      description: "Connected monitoring across mountain regions",
      icon: Globe,
    },
    {
      title: "Rapid Response",
      description: "Coordinated emergency response protocols",
      icon: Zap,
    },
    {
      title: "Community Alerts",
      description: "Localized warning system for residents",
      icon: AlertTriangle,
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-900/60 to-gray-900" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Badge variant="secondary" className="text-sm px-4 py-2 mb-4">
              <Activity className="h-4 w-4 mr-2" />
              Live Monitoring Active
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            GLOF Early Warning
            <span className="block text-4xl md:text-6xl text-blue-500">
              Protection System
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Advanced glacier lake monitoring and emergency response system protecting communities from outburst floods
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* 1. FIX: Modern Link API - wrap the custom component */}
            <Link href="/dashboard" className="min-w-[200px]">
              <Button variant="hero" size="xl">
                <Monitor className="h-5 w-5 mr-2" />
                Live Dashboard
              </Button>
            </Link>
            {/* 2. FIX: Modern Link API - wrap the custom component */}
            <Link href="/safety" className="min-w-[200px]">
              <Button variant="glass" size="xl">
                <BookOpen className="h-5 w-5 mr-2" />
                Emergency Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* --- */}

      {/* Real-time Status Panel */}
      <section className="py-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="p-6 bg-gray-800/80 border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                Current Location Status
              </h3>
              <Badge
                variant="secondary"
                className={`${
                  locationData.riskLevel === 'safe' 
                    ? 'bg-green-500 text-white' 
                    : locationData.riskLevel === 'high' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-yellow-500 text-gray-900'
                }`}
              >
                {locationData.riskLevel.toUpperCase()} RISK
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <MapPin className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Location</p>
                <p className="font-semibold text-white">{locationData.name}</p>
              </div>
              <div className="text-center">
                <Thermometer className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Temperature</p>
                <p className="font-semibold text-white">{locationData.temperature}</p>
              </div>
              <div className="text-center">
                <Cloud className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Weather</p>
                <p className="font-semibold text-white">{locationData.weather}</p>
              </div>
              <div className="text-center">
                <Activity className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Glacier Lakes</p>
                <p className="font-semibold text-white">{locationData.glacierLakes}</p>
              </div>
              <div className="text-center">
                <Monitor className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Stations</p>
                <p className="font-semibold text-white">{locationData.monitoringStations}</p>
              </div>
              <div className="text-center">
                <Bell className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Last Update</p>
                <p className="font-semibold text-white" suppressHydrationWarning={true} >{locationData.lastUpdated}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* --- */}

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comprehensive GLOF Protection Services
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Advanced monitoring, emergency response, and community support systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* 3. 🔴 CRITICAL FIX: The Link must have ONE child. We wrap the existing two children in a single <div> */}
                  <Link href={service.href} className="block h-full">
                    <div>
                      {/* Original first child (flex div) */}
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg mr-4 group-hover:bg-blue-500/20 transition-colors">
                          <Icon className="h-6 w-6 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-500 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      {/* Original second child (p) */}
                      <p className="text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* --- */}

      {/* Additional Features (No Link changes needed here) */}
      <section className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Advanced Protection Features
            </h2>
            <p className="text-lg text-gray-400">
              Cutting-edge technology for glacier monitoring and disaster prevention
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                    <Icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* --- */}

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Stay Protected?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Join our monitoring network and receive real-time glacier lake alerts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* 4. FIX: Modern Link API - wrap the custom component */}
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="hero" size="lg">
                Start Monitoring
              </Button>
            </Link>
            {/* 5. FIX: Modern Link API - wrap the custom component */}
            <Link href="/safety" className="w-full sm:w-auto">
              <Button variant="emergency" size="lg">
                Emergency Contacts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    <EmergencyButton/>
    </>
  );
};

export default Home;