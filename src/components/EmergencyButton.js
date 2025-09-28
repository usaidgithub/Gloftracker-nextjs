import React, { useState } from 'react';
import { Phone, Shield, Truck, Heart, X, Bot, AlertTriangle } from "lucide-react";

// --- Manually Integrated Components (Keep simplified Card/Button components here) ---

const Card = ({ className = "", children }) => (
  <div className={`rounded-xl border shadow-sm ${className}`}>
    {children}
  </div>
);

// Simplified Button Component
const Button = ({ variant = "default", size = "default", className = "", onClick, children }) => {
    let baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    // ... (Keep your existing variant/size logic here) ...
    
    // Variant Classes
    if (variant === "default") {
        baseClasses += " bg-primary text-primary-foreground shadow hover:bg-primary/90";
    } else if (variant === "outline") {
        baseClasses += " border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
    } else if (variant === "emergency") {
        baseClasses += " bg-red-600 text-white shadow-lg hover:bg-red-500 ring-4 ring-red-300/50";
    } else if (variant === "hero") {
        baseClasses += " bg-blue-600 text-white shadow-md hover:bg-blue-500";
    }

    // Size Classes
    if (size === "default") {
        baseClasses += " h-10 px-4 py-2";
    } else if (size === "icon-lg") {
        baseClasses += " h-16 w-16 p-4";
    }

    return (
        <button className={`${baseClasses} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

// --- Main EmergencyButton Component ---

const EmergencyButton = () => {
  const [isEmergencyPanelOpen, setIsEmergencyPanelOpen] = useState(false);

  const emergencyContacts = [
    { name: "Disaster Management", number: "1077", icon: Shield },
    { name: "Police Emergency", number: "100", icon: Shield },
    { name: "Ambulance", number: "102", icon: Heart },
    { name: "Fire Brigade", number: "101", icon: Truck },
    { name: "GLOF Alert Center", number: "1234", icon: AlertTriangle }
  ];

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleChatbot = () => {
    console.log("Opening AI Chatbot...");
    setIsEmergencyPanelOpen(false);
  };

  return (
    <>
      {/* Emergency Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="emergency"
          size="icon-lg"
          onClick={() => setIsEmergencyPanelOpen(!isEmergencyPanelOpen)}
          className="rounded-full shadow-emergency animate-pulse"
        >
          {isEmergencyPanelOpen ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
        </Button>
      </div>

      {/* Emergency Panel */}
      {isEmergencyPanelOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80">
          <Card className="bg-card/95 backdrop-blur-md border-border shadow-xl">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                Emergency Services
              </h3>
              
              <div className="space-y-2 mb-4">
                {emergencyContacts.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start hover:bg-red-500/10 hover:text-red-500"
                      onClick={() => handleCall(contact.number)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm opacity-70">{contact.number}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
              
              <div className="border-t border-border pt-4">
                <Button variant="hero" className="w-full" onClick={handleChatbot}>
                  <Bot className="h-4 w-4 mr-2" />
                  AI Emergency Assistant
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Get instant guidance and support
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default EmergencyButton;