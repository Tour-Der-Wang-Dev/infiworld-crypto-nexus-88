
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';

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

interface MapComponentProps {
  mapboxToken: string;
  onStoreSelect?: (store: Store | null) => void;
}

// Mock data for demo
const mockStores: Store[] = [
  {
    id: '1',
    name: 'Crypto Cafe',
    category: 'Food & Drink',
    address: '123 Blockchain St, New York, NY',
    coordinates: [-74.006, 40.7128],
    acceptedCryptos: ['Bitcoin', 'Ethereum', 'Litecoin'],
    hours: 'Mon-Fri: 8am-6pm, Sat-Sun: 9am-5pm'
  },
  {
    id: '2',
    name: 'Digital Threads',
    category: 'Clothing',
    address: '456 Token Ave, San Francisco, CA',
    coordinates: [-122.4194, 37.7749],
    acceptedCryptos: ['Bitcoin', 'Dogecoin'],
    hours: 'Mon-Sat: 10am-9pm, Sun: 11am-6pm'
  },
  {
    id: '3',
    name: 'NFT Gallery',
    category: 'Art',
    address: '789 Crypto Blvd, Miami, FL',
    coordinates: [-80.1918, 25.7617],
    acceptedCryptos: ['Ethereum', 'Solana'],
    hours: 'Tue-Sun: 11am-7pm, Closed Mondays'
  }
];

const MapComponent = ({ mapboxToken, onStoreSelect }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize mapbox
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 3,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add stores markers when map loads
    map.current.on('load', () => {
      addStoreMarkers();
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Filter stores by category
  useEffect(() => {
    if (!map.current) return;
    
    // Remove existing markers and add filtered ones
    document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());
    addStoreMarkers();
    
  }, [activeCategory]);

  const addStoreMarkers = () => {
    if (!map.current) return;
    
    const filteredStores = activeCategory 
      ? mockStores.filter(store => store.category === activeCategory)
      : mockStores;
    
    filteredStores.forEach(store => {
      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'flex justify-center items-center w-8 h-8 rounded-full bg-infi-gold text-black font-bold cursor-pointer shadow-lg hover:bg-infi-gold-light transition-colors';
      markerEl.textContent = store.name.charAt(0);
      markerEl.title = store.name;
      
      // Add marker to map
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(store.coordinates)
        .addTo(map.current!);
      
      // Add click event to marker
      markerEl.addEventListener('click', () => {
        if (onStoreSelect) {
          onStoreSelect(store);
        }
      });
    });
  };

  const categories = Array.from(new Set(mockStores.map(store => store.category)));

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-infi-deep glass-card border-b border-white/10">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            className={activeCategory === null ? "bg-infi-gold text-black" : ""}
            onClick={() => setActiveCategory(null)}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={activeCategory === category ? "bg-infi-gold text-black" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative flex-grow">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Map loading or error states could go here */}
      </div>
    </div>
  );
};

export default MapComponent;
