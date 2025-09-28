// pages/map.js
import dynamic from 'next/dynamic';

// 1. Use dynamic() to import the component.
// 2. Set ssr: false to prevent it from running on the Node.js server.
const GLOFMonitorPro = dynamic(
  () => import('../components/GlofMonitorPro'), // Adjust path as needed
  { 
    ssr: false,
    loading: () => (
        // Optional: Provide a simple loader while the client-side component loads.
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: '#0f172a',
          color: '#e2e8f0'
        }}>
          Loading Map... 🛰️
        </div>
      ),
  }
);

export default GLOFMonitorPro;