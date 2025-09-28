import { useState } from "react";
import NavBar from "@/components/Navbar";
import EmergencyButton from "@/components/EmergencyButton";
import {
  Users,
  Globe,
  Phone,
  Mail,
  MapPin,
  Search,
  ExternalLink,
  Heart,
  Shield,
  Truck,
  Building,
} from "lucide-react";

// --- Manually Integrated Components ---

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
  <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
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
  if (variant === "default" || variant === "hero") { // Added hero variant styling
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

// --- Organizations Component (with Responsiveness) ---

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const organizations = [
    {
      name: "Himalayan Disaster Relief Fund",
      type: "NGO",
      description: "Specialized in mountain disaster response and community preparedness training",
      location: "Kathmandu, Nepal",
      contact: "+977-1-4567890",
      email: "contact@hdrf.org",
      website: "www.hdrf.org",
      services: ["Emergency Response", "Community Training", "Equipment Supply"],
      verified: true,
      category: "disaster",
    },
    {
      name: "Mountain Communities Alliance",
      type: "International NGO",
      description: "Supporting vulnerable mountain communities with disaster preparedness and climate adaptation",
      location: "Multiple Locations",
      contact: "+1-555-123456",
      email: "help@mountainalliance.org",
      website: "www.mountainalliance.org",
      services: ["Capacity Building", "Early Warning", "Infrastructure"],
      verified: true,
      category: "community",
    },
    {
      name: "Glacier Research Institute",
      type: "Research Organization",
      description: "Leading research on glacier dynamics and GLOF risk assessment in the Himalayas",
      location: "Pokhara, Nepal",
      contact: "+977-61-123456",
      email: "research@gri.edu.np",
      website: "www.gri.edu.np",
      services: ["Research", "Risk Assessment", "Technical Consultation"],
      verified: true,
      category: "research",
    },
    {
      name: "Emergency Response Nepal",
      type: "Emergency Service",
      description: "24/7 emergency response coordination for natural disasters including GLOFs",
      location: "Nationwide Coverage",
      contact: "1077",
      email: "emergency@ern.gov.np",
      website: "www.ern.gov.np",
      services: ["Emergency Response", "Rescue Operations", "Medical Aid"],
      verified: true,
      category: "emergency",
    },
    {
      name: "Climate Adaptation Fund",
      type: "Funding Organization",
      description: "Providing financial support for climate adaptation and disaster risk reduction projects",
      location: "International",
      contact: "+44-20-12345678",
      email: "grants@caf.org",
      website: "www.caf.org",
      services: ["Funding", "Grant Management", "Technical Support"],
      verified: true,
      category: "funding",
    },
    {
      name: "Local Community Networks",
      type: "Community Group",
      description: "Grassroots organizations working directly with at-risk communities",
      location: "Rural Mountain Areas",
      contact: "+977-9841234567",
      email: "connect@lcn.org.np",
      website: "www.lcn.org.np",
      services: ["Community Mobilization", "Local Response", "Awareness"],
      verified: true,
      category: "community",
    },
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "disaster":
        return Shield;
      case "emergency":
        return Truck;
      case "research":
        return Building;
      case "community":
        return Users;
      case "funding":
        return Heart;
      default:
        return Building;
    }
  };

  // Filtering Logic
  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || org.category === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Users className="h-7 w-7 sm:h-8 sm:w-8 text-primary mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Partner Organizations</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Connect with NGOs, government agencies, and community organizations working on glacier disaster prevention
          </p>

          {/* Search */}
          <div className="relative max-w-lg w-full"> {/* Increased max-width for better appearance */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations by name, description, or service..."
              className="pl-10 bg-input/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Emergency", "Research", "Community", "Funding", "Disaster"].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Organizations Grid */}
        {filteredOrganizations.length > 0 ? (
          // Adjusted grid for responsiveness: 1 column on small, 2 on medium, 3 on large
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((org, index) => {
              const CategoryIcon = getCategoryIcon(org.category);
              return (
                <Card key={index} className="bg-gradient-card hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-foreground">{org.name}</CardTitle>
                          <div className="flex flex-wrap items-center gap-2 mt-1"> {/* Flex-wrap for small screens */}
                            <Badge variant="secondary" className="text-xs">
                              {org.type}
                            </Badge>
                            {org.verified && (
                              <Badge variant="secondary" className="text-xs bg-green-500 text-white hover:bg-green-600">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground mt-2">
                      {org.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Contact Information */}
                    <div className="space-y-2">
                      <div className="flex items-start text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-start text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{org.contact}</span>
                      </div>
                      <div className="flex items-start text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{org.email}</span>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Focus Areas:</h4>
                      <div className="flex flex-wrap gap-1">
                        {org.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {/* Made buttons occupy full width on small screens and use flex-col on small, flex-row on medium */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button variant="default" size="sm" className="w-full sm:w-auto flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto sm:flex-none">
                        <ExternalLink className="h-4 w-4 mr-2 sm:mr-0" />
                        <span className="sm:hidden">Visit Website</span> {/* Hidden on small screens to make button smaller */}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-xl text-muted-foreground py-12">
            No organizations match your search or filter criteria.
          </p>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-card max-w-4xl mx-auto"> {/* Increased max-width */}
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                Register Your Organization
              </h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Join our network of organizations working to prevent glacier disaster impacts.
                Get listed and connect with other stakeholders in the GLOF prevention ecosystem.
              </p>
              {/* Buttons stack on small, side-by-side on medium+ */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90">
                  <Building className="h-5 w-5 mr-2" />
                  Register Organization
                </Button>
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                  <Users className="h-5 w-5 mr-2" />
                  Join Network
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

export default Organizations;