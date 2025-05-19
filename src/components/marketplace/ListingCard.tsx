
import { Eye, MapPin, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    location: string;
    category: string;
    images: string[];
    acceptedCryptos: string[];
    seller: {
      name: string;
      rating: number;
      verified: boolean;
    };
    featured?: boolean;
    createdAt: string;
  };
  featured?: boolean;
}

const ListingCard = ({ listing, featured = false }: ListingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Calculate time ago
  const timeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <Card 
      className={`overflow-hidden hover:border-infi-gold/50 transition-all duration-200 ${
        featured ? 'border-infi-gold' : 'border-white/10'
      } infinity-card`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with overlay */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={listing.images[0] || '/placeholder.svg'}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-infi-gold text-black">Featured</Badge>
          </div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="border-white/50 bg-black/30 backdrop-blur-sm">
            {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
          </Badge>
        </div>
        
        {/* Price */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
          <span className="text-white font-bold">{listing.currency} {listing.price.toLocaleString()}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        {/* Title and location */}
        <div className="mb-2">
          <h3 className="font-bold text-lg text-white mb-1 line-clamp-1">{listing.title}</h3>
          <div className="flex items-center text-sm text-gray-300">
            <MapPin size={14} className="mr-1" />
            <span>{listing.location}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 mb-3">{listing.description}</p>
        
        {/* Seller info and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {listing.seller.verified && (
              <Shield size={14} className="text-infi-gold mr-1" />
            )}
            <span className="text-xs text-gray-300">{listing.seller.name}</span>
            <span className="mx-1.5 text-gray-500">•</span>
            <span className="text-xs text-gray-400">{timeAgo(listing.createdAt)}</span>
          </div>
          
          <Button variant="ghost" size="sm" className="h-8 px-2.5">
            <Eye size={16} className="mr-1" />
            View
          </Button>
        </div>
        
        {/* Accepted cryptocurrencies */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {listing.acceptedCryptos.map((crypto) => (
              <Badge key={crypto} variant="secondary" className="bg-infi-deep/80 text-xs">
                {crypto}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
