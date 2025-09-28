import { useState } from "react";
import {
  Heart,
  Target,
  Users,
  DollarSign,
  Clock,
  MapPin,
  Zap,
  Shield,
  Home,
  Utensils,
  Building,
} from "lucide-react";
import NavBar from "@/components/Navbar";
import EmergencyButton from "@/components/EmergencyButton";

// --- Manually Integrated Components ---

// Simplified Card Component
const Card = ({ className = "", children }) => (
  <div className={`rounded-xl border shadow-sm ${className}`}>{children}</div>
);

// Simplified CardHeader Component
const CardHeader = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 p-4 sm:p-6 ${className}`}>{children}</div>
);

// Simplified CardTitle Component
const CardTitle = ({ className = "", children }) => (
  <h3 className={`text-lg font-semibold leading-snug tracking-tight ${className}`}>
    {children}
  </h3>
);

// Simplified CardDescription Component
const CardDescription = ({ className = "", children }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

// Simplified CardContent Component
const CardContent = ({ className = "", children }) => (
  <div className={`p-4 pt-0 sm:p-6 sm:pt-0 ${className}`}>{children}</div>
);

// Simplified Button Component
const Button = ({ variant = "default", size = "default", className = "", onClick, children }) => {
  let baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50";

  // Variant Classes
  if (variant === "default" || variant === "hero") {
    baseClasses += " bg-primary text-primary-foreground shadow hover:bg-primary/90";
  } else if (variant === "outline") {
    baseClasses += " border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
  } else if (variant === "ghost") {
    baseClasses += " hover:bg-accent hover:text-accent-foreground";
  }
  // Custom color classes must be defined in your actual Tailwind config
  // For demonstration, we'll use strong base colors for "destructive", etc.

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
    variantClasses = "text-foreground border border-input";
  }
  // Custom color classes are simplified for manual integration
  if (className.includes("bg-destructive")) {
    variantClasses = "bg-red-600 text-white";
  }
  if (className.includes("bg-risk-moderate")) {
    variantClasses = "bg-yellow-500 text-white";
  }
  if (className.includes("bg-risk-safe")) {
    variantClasses = "bg-green-600 text-white";
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClasses} ${className}`}
    >
      {children}
    </div>
  );
};

// Simplified Input Component
const Input = ({ type = "text", placeholder, className, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

// Simplified Progress Component
const Progress = ({ value, className = "" }) => {
  const progressClasses = value >= 100 ? "bg-green-500" : "bg-primary";
  return (
    <div className={`relative overflow-hidden h-2 rounded-full bg-secondary ${className}`}>
      <div
        style={{ width: `${value}%` }}
        className={`h-full transition-all duration-500 ${progressClasses}`}
      />
    </div>
  );
};

// --- Donations Component (with Responsiveness) ---

const Donations = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);

  const campaigns = [
    {
      title: "Emergency Shelter for Displaced Families",
      description: "Providing immediate shelter and basic necessities for families displaced by recent GLOF events in Langtang region",
      location: "Langtang Valley, Nepal",
      target: 75000,
      raised: 62500,
      donors: 324,
      daysLeft: 12,
      urgency: "high",
      category: "Emergency Relief",
      image: "🏠",
      beneficiaries: 150,
    },
    {
      title: "Early Warning System Installation",
      description: "Installing advanced monitoring equipment and alert systems in vulnerable mountain communities",
      location: "Everest Region, Nepal",
      target: 120000,
      raised: 89000,
      donors: 156,
      daysLeft: 28,
      urgency: "medium",
      category: "Prevention",
      image: "📡",
      beneficiaries: 500,
    },
    {
      title: "Community Preparedness Training",
      description: "Training local communities in disaster preparedness, evacuation procedures, and emergency response",
      location: "Annapurna Region, Nepal",
      target: 35000,
      raised: 28000,
      donors: 89,
      daysLeft: 45,
      urgency: "low",
      category: "Education",
      image: "🎓",
      beneficiaries: 200,
    },
    {
      title: "Medical Aid & Supplies",
      description: "Emergency medical supplies and healthcare support for communities at high risk of glacier disasters",
      location: "Multiple Locations",
      target: 50000,
      raised: 31000,
      donors: 178,
      daysLeft: 20,
      urgency: "high",
      category: "Healthcare",
      image: "🏥",
      beneficiaries: 300,
    },
    {
      title: "Safe Water Infrastructure",
      description: "Building resilient water systems and safe drinking water facilities in disaster-prone areas",
      location: "Manaslu Region, Nepal",
      target: 95000,
      raised: 42000,
      donors: 67,
      daysLeft: 60,
      urgency: "medium",
      category: "Infrastructure",
      image: "💧",
      beneficiaries: 400,
    },
    {
      title: "Food Security Program",
      description: "Ensuring food security and nutrition support for vulnerable communities in glacier risk zones",
      location: "Himalayan Regions",
      target: 65000,
      raised: 58000,
      donors: 203,
      daysLeft: 8,
      urgency: "high",
      category: "Food Security",
      image: "🍎",
      beneficiaries: 250,
    },
  ];

  const quickDonationAmounts = [25, 50, 100, 250, 500, 1000];

  const getUrgencyColorClass = (urgency) => {
    switch (urgency) {
      // Note: These classes are placeholders and require actual color definition in your Tailwind config.
      case "high":
        return "bg-destructive text-white";
      case "medium":
        return "bg-risk-moderate text-white";
      case "low":
        return "bg-risk-safe text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Emergency Relief":
        return Home;
      case "Prevention":
        return Shield;
      case "Education":
        return Users;
      case "Healthcare":
        return Heart;
      case "Infrastructure":
        return Building;
      case "Food Security":
        return Utensils;
      default:
        return Heart;
    }
  };

  const handleDonate = (campaignTitle, amount) => {
    console.log(`Donating $${amount} to: ${campaignTitle}`);
    // Placeholder for payment integration
  };

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-primary mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Support & Donations</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Help communities at risk of glacier disasters. Your support saves lives and builds resilience.
          </p>
        </div>

        {/* Impact Statistics */}
        {/* Responsive grid: 2 columns on mobile, 4 columns on medium+ screens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-foreground">$1.2M</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Raised</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-foreground">2,847</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Donors</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-foreground">1,650</div>
              <div className="text-xs sm:text-sm text-muted-foreground">People Helped</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="text-xl sm:text-2xl font-bold text-foreground">24</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Categories (Flex-wrap for responsiveness) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Emergency Relief", "Prevention", "Education", "Healthcare", "Infrastructure"].map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              // onClick={() => filterCampaigns(category)} // Add actual filter logic
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Active Campaigns */}
        {/* Responsive grid: 1 column on mobile, 2 on medium, 3 on large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => {
            const CategoryIcon = getCategoryIcon(campaign.category);
            const progressPercentage = (campaign.raised / campaign.target) * 100;
            const urgencyClass = getUrgencyColorClass(campaign.urgency);

            return (
              <Card key={index} className="bg-gradient-card hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-3xl sm:text-4xl">{campaign.image}</div>
                    <Badge variant="secondary" className={`text-xs uppercase ${urgencyClass} flex-shrink-0`}>
                      {campaign.urgency}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl text-foreground">{campaign.title}</CardTitle>
                  <CardDescription className="text-muted-foreground min-h-[40px] md:min-h-[50px]">
                    {campaign.description}
                  </CardDescription>

                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{campaign.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-foreground">
                        ${campaign.raised.toLocaleString()} raised
                      </span>
                      <span className="text-muted-foreground">
                        ${campaign.target.toLocaleString()} goal
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {progressPercentage >= 100 ? "100.0%" : `${progressPercentage.toFixed(1)}%`} complete
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center border-t border-b py-3 border-input/50">
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-foreground">{campaign.donors}</div>
                      <div className="text-xs text-muted-foreground">Donors</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-foreground">{campaign.daysLeft}</div>
                      <div className="text-xs text-muted-foreground">Days Left</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-foreground">{campaign.beneficiaries}</div>
                      <div className="text-xs text-muted-foreground">People</div>
                    </div>
                  </div>

                  {/* Quick Donation & Custom Input */}
                  <div className="space-y-3">
                    {/* Quick amount buttons. Using grid-cols-3 is clean on all sizes */}
                    <div className="grid grid-cols-3 gap-2">
                      {quickDonationAmounts.slice(0, 3).map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedAmount(amount)}
                          className="text-xs"
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>

                    {/* Input and main donate button. They take up space nicely */}
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Custom amount"
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(Number(e.target.value))}
                        className="flex-1"
                      />
                      <Button
                        variant="default"
                        onClick={() => handleDonate(campaign.title, selectedAmount)}
                        className="flex-none"
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Donate
                      </Button>
                    </div>
                  </div>

                  {/* Category Badge & Learn More */}
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <CategoryIcon className="h-3 w-3" />
                      <span className="text-xs">{campaign.category}</span>
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Start Your Own Campaign - Call to Action */}
        <div className="mt-12">
          <Card className="bg-gradient-card max-w-4xl mx-auto">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="mb-6">
                <Target className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Start Your Own Campaign
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                  Have a project or initiative that needs funding? Create your own fundraising campaign and connect with donors who care about glacier disaster prevention.
                </p>
              </div>

              {/* Buttons stack on small, side-by-side on medium+ */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  <Zap className="h-5 w-5 mr-2" />
                  Start Campaign
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn How It Works
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

export default Donations;