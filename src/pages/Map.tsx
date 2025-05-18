
import { useState } from 'react';
import Layout from '../components/Layout';
import MapComponent from '../components/MapComponent';
import StoreDetails from '../components/StoreDetails';

// Types
interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
  acceptedCryptos: string[];
  hours: string;
  description?: string;
}

const Map = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  
  // In a real app, this would be stored securely or fetched from backend
  const mapboxToken = 'YOUR_MAPBOX_TOKEN';

  return (
    <Layout>
      <div className="container mx-auto px-0 md:px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gold-gradient-text">Crypto Payment Locations</h1>
          <p className="text-gray-300">Find stores and services that accept cryptocurrency payments</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[70vh]">
          {/* Map */}
          <div className="lg:col-span-3 glass-card overflow-hidden">
            <MapComponent 
              mapboxToken={mapboxToken} 
              onStoreSelect={setSelectedStore}
            />
          </div>
          
          {/* Sidebar - Store Details or Instructions */}
          <div className="lg:col-span-1">
            {selectedStore ? (
              <StoreDetails 
                store={selectedStore} 
                onClose={() => setSelectedStore(null)} 
              />
            ) : (
              <div className="glass-card p-6 h-full">
                <h2 className="text-xl font-bold gold-gradient-text mb-3">Find Crypto-Friendly Locations</h2>
                <p className="text-gray-300 mb-4">
                  Explore our interactive map to discover businesses that accept cryptocurrency payments.
                </p>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-infi-gold">•</span>
                    <span>Click on any marker to see store details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-infi-gold">•</span>
                    <span>Filter by category using the buttons above the map</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-infi-gold">•</span>
                    <span>Zoom and pan to explore different areas</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Map;
