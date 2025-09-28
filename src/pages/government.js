import { useState } from "react";
import NavBar from "@/components/Navbar";
import EmergencyButton from "@/components/EmergencyButton";
import {
  FileText,
  Building,
  Calendar,
  Download,
  ExternalLink,
  Search,
  Bell,
  Shield,
  Users,
  TrendingUp,
  Award,
  DollarSign,
} from "lucide-react";

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
  <h3 className={`font-semibold leading-snug tracking-tight ${className}`}>
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
  } else if (variant === "destructive") {
    baseClasses += " bg-red-600 text-white shadow-sm hover:bg-red-500";
  } // Added custom colors for demonstration (e.g., bg-risk-safe is just an example class)

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
  // Custom color classes must be defined in your actual Tailwind config
  // For demonstration, we'll use a strong base color for "risk-safe"
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

// --- Government Component (with Responsiveness) ---

const Government = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResourceCategory, setSelectedResourceCategory] = useState("All");

  const resources = [
    {
      title: "National GLOF Risk Assessment Report 2024",
      description: "Comprehensive analysis of glacier lake outburst flood risks across all major mountain regions",
      type: "Report",
      date: "2024-03-15",
      agency: "Department of Hydrology and Meteorology",
      status: "Published",
      downloads: 2847,
      category: "research",
    },
    {
      title: "Emergency Response Protocol Guidelines",
      description: "Standard operating procedures for GLOF emergency response and evacuation planning",
      type: "Guidelines",
      date: "2024-02-28",
      agency: "National Disaster Risk Reduction Authority",
      status: "Updated",
      downloads: 1523,
      category: "emergency",
    },
    {
      title: "Community Preparedness Grant Program",
      description: "Funding opportunities for local communities to implement GLOF prevention measures",
      type: "Funding",
      date: "2024-04-01",
      agency: "Ministry of Home Affairs",
      status: "Active",
      downloads: 956,
      category: "funding",
    },
    {
      title: "Glacier Monitoring Network Expansion Plan",
      description: "Strategic plan for expanding real-time glacier monitoring infrastructure nationwide",
      type: "Policy",
      date: "2024-01-10",
      agency: "Department of Environment",
      status: "Approved",
      downloads: 734,
      category: "policy",
    },
    {
      title: "Building Codes for High-Risk Areas",
      description: "Updated construction standards and building codes for glacier disaster-prone regions",
      type: "Regulation",
      date: "2024-03-20",
      agency: "Ministry of Urban Development",
      status: "Enforced",
      downloads: 1856,
      category: "regulation",
    },
    {
      title: "Climate Adaptation Budget Allocation 2024",
      description: "Government budget allocation for climate adaptation and disaster risk reduction programs",
      type: "Budget",
      date: "2024-04-15",
      agency: "Ministry of Finance",
      status: "Approved",
      downloads: 623,
      category: "budget",
    },
  ];

  const news = [
    {
      title: "Government Launches Advanced GLOF Early Warning System",
      date: "2024-04-18",
      summary: "New state-of-the-art monitoring system deployed across 50 high-risk glacier lakes",
      agency: "Prime Minister's Office",
      urgent: true,
    },
    {
      title: "International Climate Fund Approves $50M for Nepal GLOF Prevention",
      date: "2024-04-16",
      summary: "Major funding secured for community resilience and infrastructure projects",
      agency: "Ministry of Finance",
      urgent: false,
    },
    {
      title: "New Emergency Response Training Centers Inaugurated",
      date: "2024-04-14",
      summary: "Five regional training facilities now operational for disaster preparedness education",
      agency: "National Emergency Management",
      urgent: false,
    },
    {
      title: "Updated GLOF Risk Maps Released for Public Access",
      date: "2024-04-12",
      summary: "High-resolution risk mapping data now available for all stakeholders",
      agency: "Survey Department",
      urgent: false,
    },
  ];

  const schemes = [
    {
      title: "Mountain Community Resilience Scheme",
      description: "Financial assistance for disaster-resistant infrastructure development",
      eligibility: "Mountain communities in high-risk zones",
      amount: "Up to NPR 2,000,000",
      deadline: "2024-06-30",
      status: "Open",
    },
    {
      title: "GLOF Insurance Subsidy Program",
      description: "Government subsidy for disaster insurance premiums",
      eligibility: "Households in glacier risk areas",
      amount: "70% premium subsidy",
      deadline: "2024-05-15",
      status: "Open",
    },
    {
      title: "Emergency Shelter Construction Grant",
      description: "Funding for community emergency shelter facilities",
      eligibility: "Local government bodies",
      amount: "NPR 5,000,000 - 20,000,000",
      deadline: "2024-07-31",
      status: "Open",
    },
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case "research":
        return FileText;
      case "emergency":
        return Shield;
      case "funding":
        return DollarSign;
      case "policy":
        return Building;
      case "regulation":
        return Shield;
      case "budget":
        return TrendingUp;
      default:
        return FileText;
    }
  };

  // Note: Tailwind utility classes like 'bg-risk-safe' and 'text-risk-safe-foreground'
  // need to be configured in your tailwind.config.js for actual functionality.
  // For this manual integration, we'll map to standard/demonstration colors.
  const getCategoryColorClass = (category) => {
    switch (category) {
      case "research":
        return "bg-blue-100 text-blue-800"; // Primary
      case "emergency":
        return "bg-red-100 text-red-800"; // Destructive
      case "funding":
        return "bg-yellow-100 text-yellow-800"; // Risk-moderate
      case "policy":
        return "bg-gray-100 text-gray-800"; // Secondary
      case "regulation":
        return "bg-green-100 text-green-800"; // Risk-safe
      case "budget":
        return "bg-purple-100 text-purple-800"; // Accent
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedResourceCategory === "All" || resource.type === selectedResourceCategory;

    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.agency.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
    <NavBar/>
    <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Building className="h-7 w-7 sm:h-8 sm:w-8 text-primary mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Government Resources</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Access official documents, policies, news updates, and government schemes related to glacier disaster
            management
          </p>

          {/* Search */}
          <div className="relative max-w-lg w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search government resources..."
              className="pl-10 bg-input/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Latest News & Announcements */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center">
            <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2" />
            Latest News & Announcements
          </h2>
          {/* Responsive grid: 1 column on mobile, 2 columns on medium+ screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.map((item, index) => (
              <Card
                key={index}
                className={`bg-gradient-card ${item.urgent ? "border-2 border-destructive shadow-lg" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg sm:text-xl text-foreground pr-4">{item.title}</CardTitle>
                    {item.urgent && (
                      <Badge variant="secondary" className="bg-destructive text-white flex-shrink-0">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground pt-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    <span>{item.date}</span>
                    <span className="mx-2 hidden sm:inline">•</span>
                    <span className="mt-1 sm:mt-0">{item.agency}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{item.summary}</p>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Government Schemes & Benefits */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center">
            <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2" />
            Active Schemes & Benefits
          </h2>
          {/* Responsive grid: 1 column on mobile, 3 columns on medium+ screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schemes.map((scheme, index) => (
              <Card key={index} className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">{scheme.title}</CardTitle>
                  <CardDescription>{scheme.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">Eligibility:</div>
                    <div className="text-sm text-muted-foreground">{scheme.eligibility}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Financial Support:</div>
                    <div className="text-sm text-muted-foreground">{scheme.amount}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Application Deadline:</div>
                    <div className="text-sm text-muted-foreground">{scheme.deadline}</div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    {/* Placeholder for 'risk-safe' color */}
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      {scheme.status}
                    </Badge>
                    <Button variant="default" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Official Documents & Resources */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2" />
            Official Documents & Resources
          </h2>

          {/* Category Filters (Flex-wrap for responsiveness) */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Report", "Guidelines", "Policy", "Regulation", "Funding", "Budget"].map((category) => (
              <Button
                key={category}
                variant={selectedResourceCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedResourceCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Responsive grid: 1 column on mobile, 2 on medium, 3 on large */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => {
                const CategoryIcon = getCategoryIcon(resource.category);
                const colorClass = getCategoryColorClass(resource.category);

                return (
                  <Card key={index} className="bg-gradient-card hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                            <CategoryIcon className="h-4 w-4 text-primary" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${colorClass} flex-shrink-0`}
                        >
                          {resource.status}
                        </Badge>
                      </div>

                      <CardTitle className="text-lg text-foreground">{resource.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{resource.agency}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{resource.date}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Download className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{resource.downloads.toLocaleString()} downloads</span>
                        </div>
                      </div>

                      {/* Action buttons (flex-col on small screens, flex-row on larger) */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button variant="default" size="sm" className="w-full sm:flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto sm:flex-none">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="md:col-span-2 lg:col-span-3 text-center py-8">
                <p className="text-muted-foreground">No resources found matching your search and filters.</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Government - Call to Action */}
        <div className="mt-12">
          <Card className="bg-gradient-card max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8 text-center">
              <Building className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Contact Government Agencies</h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Need to reach out to specific government departments for GLOF-related inquiries or support?
              </p>
              {/* Buttons stack on small, side-by-side on medium+ */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  <Users className="h-5 w-5 mr-2" />
                  Agency Directory
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Submit Query
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

export default Government;