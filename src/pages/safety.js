import { useState } from "react";
import NavBar from "@/components/Navbar";
import EmergencyButton from "@/components/EmergencyButton";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Phone,
  Users,
  CheckCircle,
  XCircle,
  Zap,
  Home,
  Heart,
  Navigation,
} from "lucide-react";

// --- Manually Integrated Components (Unchanged) ---

// Simplified Card Component
const Card = ({ className = "", children }) => (
  <div className={`rounded-xl border shadow-sm ${className}`}>{children}</div>
);

// Simplified CardHeader Component
const CardHeader = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

// Simplified CardTitle Component
const CardTitle = ({ className = "", children }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

// Simplified CardDescription Component
const CardDescription = ({ className = "", children }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

// Simplified CardContent Component
const CardContent = ({ className = "", children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Simplified Button Component
const Button = ({ variant = "default", size = "default", className = "", onClick, children }) => {
  let baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50";

  // Variant Classes
  if (variant === "default") {
    baseClasses += " bg-primary text-primary-foreground shadow hover:bg-primary/90";
  } else if (variant === "outline") {
    baseClasses += " border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
  } else if (variant === "destructive") {
    baseClasses += " bg-red-600 text-white shadow-sm hover:bg-red-500";
  } else if (variant === "secondary") {
    baseClasses += " bg-secondary text-secondary-foreground hover:bg-secondary/80";
  }

  // Size Classes
  if (size === "default") {
    baseClasses += " h-10 px-4 py-2";
  } else if (size === "sm") {
    baseClasses += " h-9 rounded-md px-3";
  } else if (size === "lg") {
    baseClasses += " h-11 rounded-md px-8";
  }

  return (
    <button className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Simplified Badge Component
const Badge = ({ variant = "default", className = "", children }) => {
  let variantClasses = "bg-primary hover:bg-primary/80 text-primary-foreground";
  if (variant === "secondary") {
    variantClasses = "bg-muted text-muted-foreground hover:bg-muted/80";
  }
  if (variant === "outline") {
    variantClasses = "text-foreground border";
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClasses} ${className}`}
    >
      {children}
    </div>
  );
};

// Simplified Tabs Components
const Tabs = ({ className, children }) => <div className={className}>{children}</div>;

const TabsList = ({ className, children }) => (
  <div className={`inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className}`}>
    {children}
  </div>
);

const TabsTrigger = ({ value, onClick, className, children }) => (
  <button
    data-state="inactive"
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium " +
    "ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
    "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
    onClick={onClick ? () => onClick(value) : undefined}
  >
    {children}
  </button>
);

const TabsContent = ({ className, children }) => (
  <div
    data-state="active"
    className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
  >
    {children}
  </div>
);

// --- Updated Safety Component ---
const Safety = () => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("high");
  const [activeTab, setActiveTab] = useState("emergency");

  const emergencySteps = [
    {
      step: 1,
      title: "Immediate Alert Recognition",
      description: "Recognize GLOF warning signals: unusual sounds, ground vibrations, water level changes",
      icon: AlertTriangle,
      timeframe: "0-2 minutes",
    },
    {
      step: 2,
      title: "Alert Community",
      description: "Immediately warn family, neighbors, and community members using all available means",
      icon: Users,
      timeframe: "2-5 minutes",
    },
    {
      step: 3,
      title: "Evacuate to High Ground",
      description: "Move perpendicular to the flow direction, reach elevation at least 30m above river level",
      icon: Navigation,
      timeframe: "5-15 minutes",
    },
    {
      step: 4,
      title: "Call Emergency Services",
      description: "Contact disaster management authorities and emergency services once in safe location",
      icon: Phone,
      timeframe: "Immediately after safety",
    },
  ];

  const preparednessChecklist = [
    {
      category: "Emergency Kit",
      items: [
        "72-hour supply of water (1 gallon per person per day)",
        "Non-perishable food for 3 days",
        "Battery-powered or hand-crank radio",
        "Flashlight and extra batteries",
        "First aid kit and medications",
        "Emergency blankets and warm clothing",
        "Important documents in waterproof container",
        "Cash and emergency contact list",
      ],
    },
    {
      category: "Communication Plan",
      items: [
        "Establish meeting points for family members",
        "Identify out-of-area contact person",
        "Program emergency numbers in all phones",
        "Learn local warning signals and evacuation routes",
        "Register for community alert systems",
        "Share plan with neighbors and local community",
        "Practice evacuation routes regularly",
        "Keep battery-powered radio for updates",
      ],
    },
    {
      category: "Home Preparation",
      items: [
        "Identify and clear evacuation routes from home",
        "Secure heavy furniture and objects",
        "Know location of gas, water, and electrical shutoffs",
        "Install battery backup for essential equipment",
        "Keep vehicles fueled and in good condition",
        "Waterproof important documents",
        "Create digital copies of important papers",
        "Install emergency lighting systems",
      ],
    },
  ];

  const riskLevels = {
    low: {
      description: "Normal monitoring conditions",
      actions: [
        "Stay informed through official channels",
        "Maintain emergency preparedness",
        "Participate in community drills",
      ],
      restrictions: [],
    },
    moderate: {
      description: "Increased monitoring and caution advised",
      actions: [
        "Check emergency kit supplies",
        "Review evacuation routes",
        "Stay alert to warnings",
        "Avoid unnecessary travel to risk areas",
      ],
      restrictions: ["Limited access to high-risk zones", "Enhanced monitoring required"],
    },
    high: {
      description: "Immediate danger - evacuation recommended",
      actions: [
        "Evacuate immediately if instructed",
        "Move to designated safe areas",
        "Follow emergency services guidance",
        "Help vulnerable community members",
      ],
      restrictions: ["No access to danger zones", "Mandatory evacuation may be ordered", "Emergency services priority access only"],
    },
  };

  const warningSigns = [
    {
      title: "Unusual Water Conditions",
      description: "Sudden water level changes, muddy water, or debris in streams",
      severity: "high",
      action: "Evacuate immediately",
    },
    {
      title: "Ground Movement",
      description: "Earthquakes, landslides, or ground vibrations",
      severity: "high",
      action: "Move to safe location",
    },
    {
      title: "Strange Sounds",
      description: "Loud rumbling, roaring, or rushing water sounds",
      severity: "high",
      action: "Alert others and evacuate",
    },
    {
      title: "Animal Behavior",
      description: "Unusual animal behavior or mass animal movement",
      severity: "medium",
      action: "Stay alert and monitor",
    },
    {
      title: "Temperature Changes",
      description: "Sudden temperature increases in water sources",
      severity: "medium",
      action: "Report to authorities",
    },
    {
      title: "Infrastructure Damage",
      description: "Cracks in dams, unusual seepage, or structural damage",
      severity: "high",
      action: "Report immediately and evacuate",
    },
  ];

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-background pt-8 pb-8 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Added responsive padding */}
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Emergency Safety Guide</h1> {/* Adjusted text size */}
          </div>
          <p className="text-base sm:text-lg text-muted-foreground"> {/* Adjusted text size */}
            Comprehensive safety protocols and emergency preparedness for glacier lake outburst floods
          </p>
        </div>

        {/* Tabs */}
        <Tabs className="w-full">
          {/* Made TabsList stack on small screens and use fewer columns */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-0 sm:p-1 gap-1">
            <TabsTrigger value="emergency" onClick={() => setActiveTab("emergency")} data-state={activeTab === "emergency" ? "active" : "inactive"} className="text-center">
              Emergency
            </TabsTrigger>
            <TabsTrigger value="preparedness" onClick={() => setActiveTab("preparedness")} data-state={activeTab === "preparedness" ? "active" : "inactive"} className="text-center">
              Preparedness
            </TabsTrigger>
            <TabsTrigger value="warnings" onClick={() => setActiveTab("warnings")} data-state={activeTab === "warnings" ? "active" : "inactive"} className="text-center">
              Warnings
            </TabsTrigger>
            <TabsTrigger value="risk" onClick={() => setActiveTab("risk")} data-state={activeTab === "risk" ? "active" : "inactive"} className="text-center">
              Risk Levels
            </TabsTrigger>
          </TabsList>

          {/* Emergency Tab */}
          {activeTab === "emergency" && (
            <TabsContent>
              <Card className="bg-gradient-card mb-6"> {/* Added margin bottom */}
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-6 w-6 text-destructive mr-2" />
                    Emergency Response Protocol
                  </CardTitle>
                  <CardDescription>
                    Critical steps to follow when GLOF warning is issued or signs are detected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Changed to 1 column on small screens, 2 on medium+ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {emergencySteps.map((step) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.step} className="flex items-start space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/10 rounded-full flex items-center justify-center flex-shrink-0"> {/* Flex-shrink-0 for icon */}
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                          </div>
                          <div>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2"> {/* Responsive badge stacking */}
                              <Badge variant="secondary" className="bg-red-600 text-white w-max">
                                Step {step.step}
                              </Badge>
                              <Badge variant="outline" className="text-xs w-max">
                                {step.timeframe}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-6 w-6 text-primary mr-2" />
                    Emergency Contact Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Changed to 1 column on small, 2 on medium, 3 on large */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Disaster Management", number: "1077", priority: "high" },
                      { name: "Police Emergency", number: "100", priority: "high" },
                      { name: "Ambulance", number: "102", priority: "high" },
                      { name: "Fire Brigade", number: "101", priority: "medium" },
                      { name: "GLOF Alert Center", number: "1234", priority: "high" },
                      { name: "Local Emergency", number: "1144", priority: "medium" },
                    ].map((contact, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{contact.name}</span>
                          <Badge
                            variant="secondary"
                            className={contact.priority === "high" ? "bg-red-600 text-white" : ""}
                          >
                            {contact.priority === "high" ? "Priority" : "Standard"}
                          </Badge>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-primary">{contact.number}</div> {/* Adjusted text size */}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Preparedness Tab */}
          {activeTab === "preparedness" && (
            <TabsContent className="space-y-6"> {/* Added space between cards */}
              {preparednessChecklist.map((category, index) => (
                <Card key={index} className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {category.category === "Emergency Kit" && <Heart className="h-6 w-6 text-primary mr-2" />}
                      {category.category === "Communication Plan" && <Users className="h-6 w-6 text-primary mr-2" />}
                      {category.category === "Home Preparation" && <Home className="h-6 w-6 text-primary mr-2" />}
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Changed to 1 column on small, 2 on medium+ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /> {/* Flex-shrink-0 for icon */}
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          )}

          {/* Warnings Tab */}
          {activeTab === "warnings" && (
            <TabsContent>
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                    GLOF Warning Signs
                  </CardTitle>
                  <CardDescription>
                    Learn to recognize these critical warning signs that may indicate an impending GLOF
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Changed to 1 column on small, 2 on medium+ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {warningSigns.map((warning, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3"> {/* Responsive stacking */}
                          <h3 className="text-lg font-semibold mb-2 sm:mb-0">{warning.title}</h3>
                          <Badge
                            variant="secondary"
                            className={
                              warning.severity === "high"
                                ? "bg-red-600 text-white"
                                : "bg-orange-400 text-white"
                            }
                          >
                            {warning.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 text-sm">{warning.description}</p>
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{warning.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Risk Tab */}
          {activeTab === "risk" && (
            <TabsContent>
              {/* Removed space-x-2, replaced with a flex-wrap for buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(riskLevels).map(([level]) => (
                  <Button
                    key={level}
                    variant={selectedRiskLevel === level ? "default" : "outline"}
                    className={
                      selectedRiskLevel === level
                        ? level === "high"
                          ? "bg-red-600 text-white hover:bg-red-500"
                          : level === "moderate"
                          ? "bg-orange-500 text-white hover:bg-orange-400"
                          : "bg-green-600 text-white hover:bg-green-500"
                        : ""
                    }
                    onClick={() => setSelectedRiskLevel(level)}
                  >
                    {level.toUpperCase()} RISK
                  </Button>
                ))}
              </div>

              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        selectedRiskLevel === "high"
                          ? "bg-red-600"
                          : selectedRiskLevel === "moderate"
                          ? "bg-orange-500"
                          : "bg-green-600"
                      } mr-3 flex-shrink-0`}
                    ></div>
                    {selectedRiskLevel.toUpperCase()} Risk Level
                  </CardTitle>
                  <CardDescription>{riskLevels[selectedRiskLevel].description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Recommended Actions:</h3>
                    {/* Changed to 1 column on small, 2 on medium+ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {riskLevels[selectedRiskLevel].actions.map((action, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {riskLevels[selectedRiskLevel].restrictions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Current Restrictions:</h3>
                      <div className="space-y-2">
                        {riskLevels[selectedRiskLevel].restrictions.map((restriction, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{restriction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Quick Action */}
        <div className="mt-8">
          <Card className="bg-red-600 border-red-700">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-white mx-auto mb-4" /> {/* Adjusted icon size */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Emergency Situation?</h3>
              <p className="text-white/90 mb-6 text-sm sm:text-base">
                If you are experiencing a GLOF emergency, take immediate action
              </p>
              {/* Buttons stack on small screens, side-by-side on medium+ */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="destructive" size="lg" className="bg-black text-red-600">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Emergency: 1077
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Find Safe Location
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <EmergencyButton/>
    </>
  );
};

export default Safety;