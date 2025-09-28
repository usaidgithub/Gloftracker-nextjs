import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Circle } from "react-leaflet";
import L from "leaflet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'; 

// Fix Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const GLACIAL_LAKES_INDIA = {
  type: "FeatureCollection",
  features: [
    // Sikkim Region
    {
      type: "Feature",
      properties: { 
        id: "IGL001", 
        name: "Gurudongmar Lake", 
        region: "Sikkim", 
        country: "India", 
        last_observed: "2025-09-20", 
        area_ha: 118, 
        risk_score: 58, 
        risk_level: "moderate",
        elevation: 5183,
        temperature: -2.5,
        depth: 45,
        volume: 5.3,
        monitoring_status: "active",
        formation_type: "glacial",
        basin: "Teesta"
      },
      geometry: { type: "Point", coordinates: [88.710731, 28.023617] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL002", 
        name: "Tso Lhamo Lake", 
        region: "Sikkim", 
        country: "India", 
        last_observed: "2025-09-18", 
        area_ha: 45, 
        risk_score: 36, 
        risk_level: "safe",
        elevation: 5330,
        temperature: -1.8,
        depth: 32,
        volume: 1.44,
        monitoring_status: "active",
        formation_type: "glacial",
        basin: "Teesta"
      },
      geometry: { type: "Point", coordinates: [88.75614, 28.01319] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL003", 
        name: "South Lhonak Lake", 
        region: "Sikkim", 
        country: "India", 
        last_observed: "2025-09-17", 
        area_ha: 126, 
        risk_score: 85, 
        risk_level: "high",
        elevation: 5050,
        temperature: -0.5,
        depth: 67,
        volume: 8.4,
        monitoring_status: "critical",
        formation_type: "glacial",
        basin: "Teesta"
      },
      geometry: { type: "Point", coordinates: [88.33154, 27.94748] }
    },
    
    // Kashmir & Jammu Region
    {
      type: "Feature",
      properties: { 
        id: "IGL004", 
        name: "Gangabal Lake", 
        region: "Kashmir", 
        country: "India", 
        last_observed: "2025-09-15", 
        area_ha: 85, 
        risk_score: 42, 
        risk_level: "moderate",
        elevation: 3570,
        temperature: 4.2,
        depth: 130,
        volume: 11.0,
        monitoring_status: "active",
        formation_type: "glacial",
        basin: "Jhelum"
      },
      geometry: { type: "Point", coordinates: [74.8167, 34.2167] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL005", 
        name: "Vishansar Lake", 
        region: "Kashmir", 
        country: "India", 
        last_observed: "2025-09-14", 
        area_ha: 60, 
        risk_score: 38, 
        risk_level: "safe",
        elevation: 3710,
        temperature: 3.8,
        depth: 45,
        volume: 2.7,
        monitoring_status: "routine",
        formation_type: "glacial",
        basin: "Jhelum"
      },
      geometry: { type: "Point", coordinates: [75.2833, 34.2833] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL006", 
        name: "Kishansar Lake", 
        region: "Kashmir", 
        country: "India", 
        last_observed: "2025-09-14", 
        area_ha: 45, 
        risk_score: 35, 
        risk_level: "safe",
        elevation: 3800,
        temperature: 3.2,
        depth: 38,
        volume: 1.8,
        monitoring_status: "routine",
        formation_type: "glacial",
        basin: "Jhelum"
      },
      geometry: { type: "Point", coordinates: [75.2900, 34.2700] }
    },
    
    // Ladakh Region
    {
      type: "Feature",
      properties: { 
        id: "IGL007", 
        name: "Tso Moriri", 
        region: "Ladakh", 
        country: "India", 
        last_observed: "2025-09-10", 
        area_ha: 12000, 
        risk_score: 28, 
        risk_level: "safe",
        elevation: 4522,
        temperature: 8.5,
        depth: 15,
        volume: 180,
        monitoring_status: "routine",
        formation_type: "tectonic",
        basin: "Indus"
      },
      geometry: { type: "Point", coordinates: [78.3000, 32.9000] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL008", 
        name: "Pangong Tso", 
        region: "Ladakh", 
        country: "India/China", 
        last_observed: "2025-09-01", 
        area_ha: 40000, 
        risk_score: 25, 
        risk_level: "safe",
        elevation: 4350,
        temperature: 12.3,
        depth: 100,
        volume: 4000,
        monitoring_status: "routine",
        formation_type: "tectonic",
        basin: "Indus"
      },
      geometry: { type: "Point", coordinates: [78.995, 33.825] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL009", 
        name: "Tso Kar", 
        region: "Ladakh", 
        country: "India", 
        last_observed: "2025-09-05", 
        area_ha: 1800, 
        risk_score: 32, 
        risk_level: "safe",
        elevation: 4530,
        temperature: 6.8,
        depth: 8,
        volume: 14.4,
        monitoring_status: "routine",
        formation_type: "tectonic",
        basin: "Indus"
      },
      geometry: { type: "Point", coordinates: [78.2000, 33.2500] }
    },
    
    // Uttarakhand Region
    {
      type: "Feature",
      properties: { 
        id: "IGL010", 
        name: "Satopanth Tal", 
        region: "Uttarakhand", 
        country: "India", 
        last_observed: "2025-09-12", 
        area_ha: 95, 
        risk_score: 62, 
        risk_level: "moderate",
        elevation: 4600,
        temperature: 1.5,
        depth: 55,
        volume: 5.2,
        monitoring_status: "active",
        formation_type: "glacial",
        basin: "Ganga"
      },
      geometry: { type: "Point", coordinates: [79.3167, 30.7333] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL011", 
        name: "Vasudhara Tal", 
        region: "Uttarakhand", 
        country: "India", 
        last_observed: "2025-09-11", 
        area_ha: 42, 
        risk_score: 48, 
        risk_level: "moderate",
        elevation: 4135,
        temperature: 2.8,
        depth: 35,
        volume: 1.5,
        monitoring_status: "active",
        formation_type: "glacial",
        basin: "Ganga"
      },
      geometry: { type: "Point", coordinates: [79.3500, 30.7167] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL012", 
        name: "Roopkund Lake", 
        region: "Uttarakhand", 
        country: "India", 
        last_observed: "2025-09-08", 
        area_ha: 8, 
        risk_score: 25, 
        risk_level: "safe",
        elevation: 5029,
        temperature: -1.2,
        depth: 3,
        volume: 0.024,
        monitoring_status: "routine",
        formation_type: "glacial",
        basin: "Ganga"
      },
      geometry: { type: "Point", coordinates: [79.7300, 30.2700] }
    },
    
    // Himachal Pradesh
    {
      type: "Feature",
      properties: { 
        id: "IGL013", 
        name: "Suraj Tal", 
        region: "Himachal Pradesh", 
        country: "India", 
        last_observed: "2025-09-07", 
        area_ha: 65, 
        risk_score: 44, 
        risk_level: "moderate",
        elevation: 4890,
        temperature: 0.8,
        depth: 25,
        volume: 1.6,
        monitoring_status: "active",
        formation_type: "glacial",
        basin: "Indus"
      },
      geometry: { type: "Point", coordinates: [77.5500, 32.4500] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL014", 
        name: "Chandra Tal", 
        region: "Himachal Pradesh", 
        country: "India", 
        last_observed: "2025-09-06", 
        area_ha: 80, 
        risk_score: 38, 
        risk_level: "safe",
        elevation: 4300,
        temperature: 2.5,
        depth: 30,
        volume: 2.4,
        monitoring_status: "routine",
        formation_type: "glacial",
        basin: "Indus"
      },
      geometry: { type: "Point", coordinates: [77.6167, 32.4833] }
    },
    
    // Arunachal Pradesh
    {
      type: "Feature",
      properties: { 
        id: "IGL015", 
        name: "Sela Lake", 
        region: "Arunachal Pradesh", 
        country: "India", 
        last_observed: "2025-09-03", 
        area_ha: 120, 
        risk_score: 52, 
        risk_level: "moderate",
        elevation: 4170,
        temperature: 3.2,
        depth: 68,
        volume: 8.2,
        monitoring_status: "active",
        formation_type: "glacial",
        basin: "Brahmaputra"
      },
      geometry: { type: "Point", coordinates: [91.8833, 27.3500] }
    },
    
    // Nepal Border (for reference)
    {
      type: "Feature",
      properties: { 
        id: "IGL016", 
        name: "Imja Tsho", 
        region: "Nepal Border", 
        country: "Nepal", 
        last_observed: "2025-09-19", 
        area_ha: 130, 
        risk_score: 72, 
        risk_level: "high",
        elevation: 5010,
        temperature: 1.2,
        depth: 90,
        volume: 11.7,
        monitoring_status: "critical",
        formation_type: "glacial",
        basin: "Dudh Koshi"
      },
      geometry: { type: "Point", coordinates: [86.92222, 27.89861] }
    },
    {
      type: "Feature",
      properties: { 
        id: "IGL017", 
        name: "Tsho Rolpa", 
        region: "Nepal Border", 
        country: "Nepal", 
        last_observed: "2025-09-15", 
        area_ha: 153.7, 
        risk_score: 49, 
        risk_level: "moderate",
        elevation: 4580,
        temperature: 2.1,
        depth: 132,
        volume: 20.3,
        monitoring_status: "active",
        formation_type: "glacial",
        basin: "Tamakosi"
      },
      geometry: { type: "Point", coordinates: [86.4764, 27.8602] }
    }
  ]
};

const makeIcon = (color = "#6366f1", size = 28, pulseEffect = false) => {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="grad${color.replace('#', '')}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
        </linearGradient>
        <filter id="shadow${color.replace('#', '')}" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#grad${color.replace('#', '')})" 
              stroke="rgba(255,255,255,0.9)" stroke-width="2" filter="url(#shadow${color.replace('#', '')})"/>
      <circle cx="12" cy="12" r="4" fill="rgba(255,255,255,0.95)" />
      <circle cx="12" cy="12" r="2" fill="${color}" />
    </svg>
  `);
  
  return L.divIcon({
    className: pulseEffect ? "pulse-marker" : "custom-marker",
    html: `<div style="width:${size}px;height:${size}px;"><img src="data:image/svg+xml;utf8,${svg}" style="width:100%;height:100%;" /></div>`,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2]
  });
};

const riskToColor = (level) => {
  if (level === "high") return "#dc2626";
  if (level === "moderate") return "#d97706";
  return "#059669";
};

export default function GLOFMonitorPro() {
  const [lakes, setLakes] = useState(null);
  const [filteredLakes, setFilteredLakes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRiskFilter, setSelectedRiskFilter] = useState("all");
  const [selectedRegionFilter, setSelectedRegionFilter] = useState("all");
  const [userLocation, setUserLocation] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedLake, setSelectedLake] = useState(null);
  const [mapStyle, setMapStyle] = useState("satellite");
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const mapRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
    useEffect(() => {
        toast.info("📱 Access this page on a desktop site for a better experience.", {
          position: "top-center", // Display at the bottom of the screen
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "white", // Using dark theme to match your component's dark style
        });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lakes) {
        const updatedFeatures = lakes.features.map(feature => ({
          ...feature,
          properties: {
            ...feature.properties,
            temperature: feature.properties.temperature + (Math.random() - 0.5) * 0.1
          }
        }));
        setLakes({ ...lakes, features: updatedFeatures });
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [lakes]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.log("Location access denied")
      );
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLakes(GLACIAL_LAKES_INDIA);
      setFilteredLakes(GLACIAL_LAKES_INDIA);
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    if (!lakes) return;
    
    let filtered = lakes.features.filter(feature => {
      const matchesSearch = feature.properties.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feature.properties.region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = selectedRiskFilter === "all" || feature.properties.risk_level === selectedRiskFilter;
      const matchesRegion = selectedRegionFilter === "all" || feature.properties.region === selectedRegionFilter;
      return matchesSearch && matchesRisk && matchesRegion;
    });
    
    setFilteredLakes({ ...lakes, features: filtered });
  }, [searchTerm, selectedRiskFilter, selectedRegionFilter, lakes]);

  const handleLakeClick = (lake) => {
    setSelectedLake(lake);
    const [lon, lat] = lake.geometry.coordinates;
    if (mapRef.current) {
      mapRef.current.setView([lat, lon], 12);
    }
  };

  const getTileUrl = () => {
    switch (mapStyle) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "terrain":
        return "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
      case "light":
        return "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      case "osm":
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      default:
        return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    }
  };

  const getAttribution = () => {
    switch (mapStyle) {
      case "satellite":
        return '&copy; <a href="https://www.esri.com/">Esri</a>';
      case "terrain":
        return '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>';
      default:
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '4px solid rgba(99, 102, 241, 0.3)',
              borderTop: '4px solid #6366f1',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '80px',
              border: '4px solid transparent',
              borderTop: '4px solid #06b6d4',
              borderRadius: '50%',
              animation: 'spin 2s linear infinite reverse'
            }}></div>
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>GLOF Risk Monitor</h2>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>Access this website on desktop site for better experience</h1>
          <p style={{ color: '#94a3b8', fontWeight: '500', fontSize: '16px' }}>Initializing glacial lake surveillance system...</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#6366f1', borderRadius: '50%', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#6366f1', borderRadius: '50%', animation: 'pulse 1.5s ease-in-out 0.2s infinite' }}></div>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#6366f1', borderRadius: '50%', animation: 'pulse 1.5s ease-in-out 0.4s infinite' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const riskStats = {
    high: filteredLakes?.features.filter(f => f.properties.risk_level === "high").length || 0,
    moderate: filteredLakes?.features.filter(f => f.properties.risk_level === "moderate").length || 0,
    safe: filteredLakes?.features.filter(f => f.properties.risk_level === "safe").length || 0
  };

  const regions = [...new Set(lakes?.features.map(f => f.properties.region) || [])];

  return (
    <>
    <ToastContainer 
    style={{ zIndex: 99999 }}
/>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <style>{`
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        
        @keyframes spin { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
        
        @keyframes pulse { 
          0%, 100% { opacity: 1; } 
          50% { opacity: 0.5; } 
        }
        
        .pulse-marker { 
          animation: riskPulse 2.5s ease-in-out infinite; 
        }
        @keyframes riskPulse { 
          0%, 100% { transform: scale(1); opacity: 1; } 
          50% { transform: scale(1.4); opacity: 0.6; } 
        }
        
        .custom-marker {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
        .custom-marker:hover {
          transform: scale(1.15);
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));
        }
        
        .leaflet-container {
          background: #0f172a;
          font-family: 'Inter', sans-serif;
        }
        
        .leaflet-popup-content-wrapper {
          background: rgba(15, 23, 42, 0.95);
          color: white;
          border-radius: 12px;
          border: 1px solid rgba(51, 65, 85, 0.8);
          backdrop-filter: blur(12px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        
        .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.95);
        }
        
        .leaflet-control {
          border: none !important;
          background: rgba(15, 23, 42, 0.9) !important;
          backdrop-filter: blur(8px);
        }
        
        .leaflet-control a {
          background: rgba(15, 23, 42, 0.9) !important;
          color: white !important;
          border: 1px solid rgba(51, 65, 85, 0.5) !important;
        }
        
        .leaflet-control a:hover {
          background: rgba(30, 41, 59, 0.9) !important;
        }
        
        .glass-effect {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(51, 65, 85, 0.3);
        }

        .input-field {
          width: 100%;
          padding: 12px;
          background: rgba(51, 65, 85, 0.5);
          border: 1px solid rgba(71, 85, 105, 0.5);
          border-radius: 8px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .input-field:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .input-field::placeholder {
          color: #94a3b8;
        }
        
        .select-field {
          width: 100%;
          padding: 12px;
          background: rgba(51, 65, 85, 0.5);
          border: 1px solid rgba(71, 85, 105, 0.5);
          border-radius: 8px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }
        
        .select-field:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }
        
        .btn-secondary {
          background: rgba(51, 65, 85, 0.5);
          color: #94a3b8;
          border: 1px solid rgba(71, 85, 105, 0.5);
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: rgba(71, 85, 105, 0.5);
          color: white;
        }
        
        .lake-card {
          padding: 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(51, 65, 85, 0.3);
          background: rgba(51, 65, 85, 0.3);
          margin-bottom: 12px;
        }
        
        .lake-card:hover {
          background: rgba(71, 85, 105, 0.5);
          border-color: rgba(71, 85, 105, 0.5);
          transform: translateY(-1px);
        }
        
        .lake-card.selected {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.2);
        }
        
        .risk-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .risk-high {
          background: rgba(220, 38, 38, 0.2);
          color: #f87171;
          border: 1px solid rgba(220, 38, 38, 0.3);
        }
        
        .risk-moderate {
          background: rgba(217, 119, 6, 0.2);
          color: #fbbf24;
          border: 1px solid rgba(217, 119, 6, 0.3);
        }
        
        .risk-safe {
          background: rgba(5, 150, 105, 0.2);
          color: #10b981;
          border: 1px solid rgba(5, 150, 105, 0.3);
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
        }
      `}</style>

      <div style={{ 
        display: 'flex', 
        height: '100vh', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', 
        color: 'white',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        {showSidebar && (
          <div style={{ 
            width: '320px', 
            background: 'rgba(15, 23, 42, 0.9)', 
            borderRight: '1px solid rgba(51, 65, 85, 0.5)', 
            backdropFilter: 'blur(12px)',
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #312e81 0%, #7c3aed 50%, #312e81 100%)', 
              padding: '24px', 
              borderBottom: '1px solid rgba(51, 65, 85, 0.3)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0, marginBottom: '4px' }}>GLOF Monitor</h1>
                  
                  <p style={{ color: 'rgba(199, 210, 254, 0.8)', fontSize: '14px', fontWeight: '500', margin: 0 }}>Indian Himalayan Region</p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: 'rgba(199, 210, 254, 0.7)', fontFamily: 'monospace' }}>
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px' }}>
                <div style={{ background: 'rgba(220, 38, 38, 0.2)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f87171', marginBottom: '4px' }}>{riskStats.high}</div>
                  <div style={{ color: '#fca5a5', fontWeight: '500' }}>Critical</div>
                </div>
                <div style={{ background: 'rgba(217, 119, 6, 0.2)', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fbbf24', marginBottom: '4px' }}>{riskStats.moderate}</div>
                  <div style={{ color: '#fcd34d', fontWeight: '500' }}>Moderate</div>
                </div>
                <div style={{ background: 'rgba(5, 150, 105, 0.2)', border: '1px solid rgba(5, 150, 105, 0.3)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>{riskStats.safe}</div>
                  <div style={{ color: '#34d399', fontWeight: '500' }}>Safe</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', borderBottom: '1px solid rgba(51, 65, 85, 0.3)' }}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Search lakes or regions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <select
                  value={selectedRiskFilter}
                  onChange={(e) => setSelectedRiskFilter(e.target.value)}
                  className="select-field"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="high">Critical Risk</option>
                  <option value="moderate">Moderate Risk</option>
                  <option value="safe">Safe</option>
                </select>

                <select
                  value={selectedRegionFilter}
                  onChange={(e) => setSelectedRegionFilter(e.target.value)}
                  className="select-field"
                >
                  <option value="all">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={showHeatmap ? "btn-primary" : "btn-secondary"}
                style={{ width: '100%' }}
              >
                Risk Heatmap {showHeatmap ? '✓' : ''}
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>
                  Monitoring Sites
                </h3>
                <span style={{ 
                  fontSize: '14px', 
                  color: '#94a3b8', 
                  background: 'rgba(51, 65, 85, 0.5)', 
                  padding: '4px 12px', 
                  borderRadius: '20px',
                  fontWeight: '500'
                }}>
                  {filteredLakes?.features.length}
                </span>
              </div>
              
              {filteredLakes?.features.map(feature => {
                const props = feature.properties;
                const isSelected = selectedLake?.properties.id === props.id;
                
                return (
                  <div
                    key={props.id}
                    onClick={() => handleLakeClick(feature)}
                    className={`lake-card ${isSelected ? 'selected' : ''}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0, marginBottom: '4px', lineHeight: '1.3' }}>
                          {props.name}
                        </h4>
                        <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, marginBottom: '8px' }}>{props.region}, {props.country}</p>
                        <div className={`risk-badge risk-${props.risk_level}`}>
                          <div className={`status-dot`} style={{ 
                            backgroundColor: props.risk_level === "high" ? '#dc2626' :
                                           props.risk_level === "moderate" ? '#d97706' : '#059669'
                          }}></div>
                          {props.risk_level}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', marginLeft: '16px' }}>
                        <div style={{ color: 'white', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                          {props.temperature.toFixed(1)}°C
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                          {props.elevation}m
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                      <span>Risk Score: {props.risk_score}/100</span>
                      <span style={{ textTransform: 'capitalize' }}>{props.monitoring_status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="glass-effect"
                style={{ 
                  padding: '12px', 
                  borderRadius: '12px', 
                  color: 'white', 
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(30, 41, 59, 0.5)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(15, 23, 42, 0.8)'}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showSidebar ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  )}
                </svg>
              </button>
              
              <select
                value={mapStyle}
                onChange={(e) => setMapStyle(e.target.value)}
                className="glass-effect"
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="satellite" style={{ background: '#1e293b', color: 'white' }}>Satellite</option>
                <option value="terrain" style={{ background: '#1e293b', color: 'white' }}>Terrain</option>
                <option value="dark" style={{ background: '#1e293b', color: 'white' }}>Dark</option>
                <option value="light" style={{ background: '#1e293b', color: 'white' }}>Light</option>
                <option value="osm" style={{ background: '#1e293b', color: 'white' }}>Street Map</option>
              </select>
            </div>

            <div className="glass-effect" style={{
              padding: '12px 16px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Live Monitoring</span>
              </div>
            </div>
          </div>

          <MapContainer
            center={[30.0, 79.0]}
            zoom={6}
            zoomControl={false}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              url={getTileUrl()}
              attribution={getAttribution()}
              maxZoom={18}
              crossOrigin="anonymous"
            />
            
            {userLocation && (
              <Marker position={userLocation} icon={makeIcon("#3b82f6", 24)}>
                <Popup>
                  <div style={{ minWidth: '200px', textAlign: 'center', color: 'white' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>Your Location</h3>
                    <p style={{ color: '#94a3b8', margin: 0 }}>Position detected via GPS</p>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {filteredLakes?.features.map((feature) => {
              const [lon, lat] = feature.geometry.coordinates;
              const props = feature.properties;
              const color = riskToColor(props.risk_level);
              const isPulse = props.risk_level === "high" || props.monitoring_status === "critical";
              const icon = makeIcon(color, 32, isPulse);
              
              return (
                <React.Fragment key={props.id}>
                  <Marker position={[lat, lon]} icon={icon}>
                    <Popup>
                      <div style={{ minWidth: '320px', color: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>{props.name}</h3>
                          <div className={`risk-badge risk-${props.risk_level}`} style={{ fontSize: '11px' }}>
                            {props.risk_level}
                          </div>
                        </div>
                        
                        <p style={{ color: '#94a3b8', margin: '0 0 16px 0', fontSize: '14px' }}>{props.region}, {props.country}</p>
                        
                        <div style={{ 
                          padding: '16px', 
                          borderRadius: '8px', 
                          marginBottom: '16px',
                          background: props.risk_level === "high" ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' :
                                     props.risk_level === "moderate" ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' :
                                     'linear-gradient(135deg, #059669 0%, #047857 100%)'
                        }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{props.risk_score}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Risk Score</div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '14px', marginBottom: '16px' }}>
                          <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '12px', borderRadius: '8px' }}>
                            <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Temperature</div>
                            <div style={{ fontWeight: '600', color: 'white' }}>{props.temperature.toFixed(1)}°C</div>
                          </div>
                          <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '12px', borderRadius: '8px' }}>
                            <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Elevation</div>
                            <div style={{ fontWeight: '600', color: 'white' }}>{props.elevation}m</div>
                          </div>
                          <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '12px', borderRadius: '8px' }}>
                            <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Area</div>
                            <div style={{ fontWeight: '600', color: 'white' }}>{props.area_ha} ha</div>
                          </div>
                          <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '12px', borderRadius: '8px' }}>
                            <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Volume</div>
                            <div style={{ fontWeight: '600', color: 'white' }}>{props.volume} M m³</div>
                          </div>
                          <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '12px', borderRadius: '8px' }}>
                            <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Max Depth</div>
                            <div style={{ fontWeight: '600', color: 'white' }}>{props.depth}m</div>
                          </div>
                          <div style={{ background: 'rgba(51, 65, 85, 0.5)', padding: '12px', borderRadius: '8px' }}>
                            <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Basin</div>
                            <div style={{ fontWeight: '600', color: 'white' }}>{props.basin}</div>
                          </div>
                        </div>
                        
                        <div style={{ 
                          paddingTop: '16px', 
                          borderTop: '1px solid rgba(51, 65, 85, 0.5)',
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          fontSize: '12px', 
                          color: '#94a3b8' 
                        }}>
                          <span>Last observed: {props.last_observed}</span>
                          <span style={{ textTransform: 'capitalize' }}>Status: {props.monitoring_status}</span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                  
                  {(props.risk_level === "high" && showHeatmap) && (
                    <Circle
                      center={[lat, lon]}
                      radius={props.risk_score * 300}
                      pathOptions={{
                        fillColor: color,
                        fillOpacity: 0.1,
                        color: color,
                        weight: 1,
                        opacity: 0.4
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </MapContainer>

          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            zIndex: 1000
          }}>
            <div className="glass-effect" style={{
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg style={{ width: '16px', height: '16px', color: '#6366f1' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span style={{ fontWeight: '500' }}>{filteredLakes?.features.length} sites monitored</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                  <span style={{ fontWeight: '500' }}>Real-time data</span>
                </div>
              </div>
              
              <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>
                Updated: {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ); }