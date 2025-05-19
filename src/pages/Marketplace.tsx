
import { useState } from "react";
import { Filter, Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from '../components/Layout';
import ListingCard from "../components/marketplace/ListingCard";

// Types
interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  category: "property" | "vehicle" | "collectible" | "electronics" | "other";
  images: string[];
  acceptedCryptos: string[];
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  featured?: boolean;
  createdAt: string;
}

// Mock data
const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Luxury Beachfront Villa",
    description: "Modern 4-bedroom villa with private pool and ocean views",
    price: 850000,
    currency: "USD",
    location: "Phuket, Thailand",
    category: "property",
    images: ["/lovable-uploads/fa2ca62f-a8b9-4103-a00b-25b4cb4ea24b.png"],
    acceptedCryptos: ["Bitcoin", "Ethereum"],
    seller: {
      name: "Premium Realty",
      rating: 4.8,
      verified: true
    },
    featured: true,
    createdAt: "2025-02-15T09:30:00Z"
  },
  {
    id: "2",
    title: "Tesla Model S Plaid",
    description: "2025 Tesla Model S Plaid, 0-60 in 1.99s, 350 mile range",
    price: 115000,
    currency: "USD",
    location: "Bangkok, Thailand",
    category: "vehicle",
    images: ["/lovable-uploads/fa2ca62f-a8b9-4103-a00b-25b4cb4ea24b.png"],
    acceptedCryptos: ["Bitcoin", "Ethereum", "Dogecoin"],
    seller: {
      name: "ElectricWheels",
      rating: 4.5,
      verified: true
    },
    createdAt: "2025-04-20T10:15:00Z"
  },
  {
    id: "3",
    title: "Rare Bitcoin Gold Coin",
    description: "Limited edition physical Bitcoin gold coin from 2013",
    price: 1500,
    currency: "USD",
    location: "Singapore",
    category: "collectible",
    images: ["/lovable-uploads/fa2ca62f-a8b9-4103-a00b-25b4cb4ea24b.png"],
    acceptedCryptos: ["Bitcoin", "Litecoin"],
    seller: {
      name: "CryptoCollectibles",
      rating: 4.9,
      verified: true
    },
    createdAt: "2025-05-01T14:45:00Z"
  },
  {
    id: "4",
    title: "MacBook Pro M4",
    description: "Latest MacBook Pro with M4 chip, 32GB RAM, 2TB SSD",
    price: 3200,
    currency: "USD",
    location: "Chiang Mai, Thailand",
    category: "electronics",
    images: ["/lovable-uploads/fa2ca62f-a8b9-4103-a00b-25b4cb4ea24b.png"],
    acceptedCryptos: ["Bitcoin", "Ethereum", "Solana"],
    seller: {
      name: "TechTreasures",
      rating: 4.7,
      verified: false
    },
    createdAt: "2025-05-10T08:20:00Z"
  }
];

// Filter types
type FilterOptions = {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  acceptedCryptos: string[];
};

const Marketplace = () => {
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 1000000,
    acceptedCryptos: [],
  });
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  
  // Available cryptocurrencies for filtering
  const cryptoOptions = ["Bitcoin", "Ethereum", "Litecoin", "Solana", "Dogecoin"];
  
  // Filter listings based on active filters
  const filteredListings = MOCK_LISTINGS.filter(listing => {
    // Search filter
    const matchesSearch = activeFilters.search === "" || 
      listing.title.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      listing.description.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
      listing.location.toLowerCase().includes(activeFilters.search.toLowerCase());
    
    // Category filter
    const matchesCategory = activeFilters.category === "all" || 
      listing.category === activeFilters.category;
    
    // Price filter
    const matchesPrice = listing.price >= activeFilters.minPrice && 
      listing.price <= activeFilters.maxPrice;
    
    // Crypto filter
    const matchesCrypto = activeFilters.acceptedCryptos.length === 0 || 
      activeFilters.acceptedCryptos.some(crypto => 
        listing.acceptedCryptos.includes(crypto)
      );
    
    return matchesSearch && matchesCategory && matchesPrice && matchesCrypto;
  });

  // Update filter handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setActiveFilters(prev => ({ ...prev, category: value }));
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    setActiveFilters(prev => ({ 
      ...prev, 
      minPrice: value[0], 
      maxPrice: value[1] 
    }));
  };
  
  const handleCryptoToggle = (crypto: string) => {
    setActiveFilters(prev => {
      const cryptos = [...prev.acceptedCryptos];
      if (cryptos.includes(crypto)) {
        return { ...prev, acceptedCryptos: cryptos.filter(c => c !== crypto) };
      } else {
        return { ...prev, acceptedCryptos: [...cryptos, crypto] };
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gold-gradient-text mb-4">Crypto Marketplace</h1>
          <p className="text-gray-300 max-w-3xl">
            Buy and sell properties, vehicles, and luxury goods using your favorite cryptocurrencies.
            All transactions are secure and verified on the blockchain.
          </p>
        </div>
        
        {/* Search and filter buttons (top) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search listings..."
              className="pl-10 bg-infi-deep text-white border-white/20"
              value={activeFilters.search}
              onChange={handleSearchChange}
            />
          </div>
          <Button
            variant="outline"
            className="sm:w-auto flex items-center gap-2 border-white/20"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter size={18} />
            Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
            <div className="infinity-card p-5 space-y-6 sticky top-20">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                <Tabs value={activeFilters.category} onValueChange={handleCategoryChange}>
                  <TabsList className="grid grid-cols-2 h-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="property">Property</TabsTrigger>
                    <TabsTrigger value="vehicle">Vehicles</TabsTrigger>
                    <TabsTrigger value="collectible">Collectibles</TabsTrigger>
                    <TabsTrigger value="electronics">Electronics</TabsTrigger>
                    <TabsTrigger value="other">Other</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1000000]}
                    max={1000000}
                    step={1000}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>to</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Accepted Cryptocurrencies</h3>
                <div className="space-y-3">
                  {cryptoOptions.map(crypto => (
                    <div key={crypto} className="flex items-center space-x-2">
                      <Checkbox
                        id={`crypto-${crypto}`}
                        checked={activeFilters.acceptedCryptos.includes(crypto)}
                        onCheckedChange={() => handleCryptoToggle(crypto)}
                        className="data-[state=checked]:bg-infi-gold data-[state=checked]:text-black"
                      />
                      <label htmlFor={`crypto-${crypto}`} className="text-sm text-gray-300 cursor-pointer">
                        {crypto}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile-only: Close filters button */}
              <div className="lg:hidden pt-4">
                <Button 
                  className="w-full bg-infi-gold hover:bg-infi-gold-light text-black"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Listings grid */}
          <div className="lg:col-span-3">
            {/* Featured listings */}
            {filteredListings.some(listing => listing.featured) && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Check className="text-infi-gold mr-2" size={18} />
                  Featured Listings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredListings
                    .filter(listing => listing.featured)
                    .map(listing => (
                      <ListingCard key={listing.id} listing={listing} featured />
                    ))}
                </div>
              </div>
            )}
            
            {/* All listings */}
            <h2 className="text-xl font-bold text-white mb-4">All Listings</h2>
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="bg-infi-deep/50 rounded-lg p-12 text-center">
                <p className="text-gray-300">No listings found matching your filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-white/20"
                  onClick={() => setActiveFilters({
                    search: "",
                    category: "all",
                    minPrice: 0,
                    maxPrice: 1000000,
                    acceptedCryptos: [],
                  })}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;
