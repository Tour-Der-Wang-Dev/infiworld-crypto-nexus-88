
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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
  },
  {
    id: '4',
    name: 'Crypto Gear',
    category: 'Electronics',
    address: '101 Bitcoin Ave, Austin, TX',
    coordinates: [-97.7431, 30.2672],
    acceptedCryptos: ['Bitcoin', 'Ethereum', 'Dogecoin'],
    hours: 'Mon-Sat: 9am-8pm, Sun: 11am-6pm'
  },
  {
    id: '5',
    name: 'Blockchain Books',
    category: 'Retail',
    address: '202 Satoshi St, Chicago, IL',
    coordinates: [-87.6298, 41.8781],
    acceptedCryptos: ['Bitcoin', 'Ethereum'],
    hours: 'Mon-Fri: 10am-9pm, Sat-Sun: 10am-7pm'
  }
];

const MapComponent = ({ mapboxToken, onStoreSelect }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stores, setStores] = useState<Store[]>(mockStores);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize mapbox
    mapboxgl.accessToken = mapboxToken || 'YOUR_MAPBOX_TOKEN';
    
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
      // In a real app, this is where we'd fetch stores from Supabase
      // fetchStores().then(storeData => {
      //   setStores(storeData);
      // });
      
      addStoreMarkers();
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Filter stores by category
  useEffect(() => {
    if (!map.current) return;
    
    // Remove existing markers
    clearMarkers();
    
    // Add filtered markers
    addStoreMarkers();
    
  }, [activeCategory, stores]);

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  const addStoreMarkers = () => {
    if (!map.current) return;
    
    // Get filtered stores
    const filteredStores = activeCategory 
      ? stores.filter(store => store.category === activeCategory)
      : stores;
    
    if (filteredStores.length === 0) return;
    
    // Create a bounds object to fit all markers
    const bounds = new mapboxgl.LngLatBounds();
    
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
      
      // Add to ref for cleanup
      markersRef.current.push(marker);
      
      // Extend bounds to include this point
      bounds.extend(store.coordinates);
      
      // Add click event to marker
      markerEl.addEventListener('click', () => {
        if (onStoreSelect) {
          onStoreSelect(store);
        }
      });
    });
    
    // Fit map to all markers
    if (filteredStores.length > 1) {
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 13
      });
    }
  };
  
  const handleSearch = () => {
    setIsLoading(true);
    
    // In a real app, this would search Supabase for stores matching the query
    setTimeout(() => {
      const filteredStores = mockStores.filter(store => 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setStores(filteredStores);
      
      if (filteredStores.length === 0) {
        toast.info("No stores found matching your search.");
      } else {
        toast.success(`Found ${filteredStores.length} stores!`);
      }
      
      setIsLoading(false);
    }, 800); // Simulate API call delay
  };
  
  const resetSearch = () => {
    setSearchQuery('');
    setStores(mockStores);
    toast.success("Search has been reset.");
  };

  const categories = Array.from(new Set(mockStores.map(store => store.category)));

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-infi-deep glass-card border-b border-white/10">
        <div className="mb-3 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search for stores..."
              className="pl-10 bg-infi-deep text-white border-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSearch}
              className="bg-infi-gold hover:bg-infi-gold-light text-black"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
            <Button
              onClick={resetSearch}
              variant="outline"
              className="border-white/20"
              disabled={isLoading}
            >
              Reset
            </Button>
          </div>
        </div>
        
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
        
        {stores.length === 0 && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-infi-deep p-6 rounded-lg text-center max-w-sm">
              <p className="text-white mb-4">No locations found matching your criteria.</p>
              <Button onClick={resetSearch}>Show All Locations</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
