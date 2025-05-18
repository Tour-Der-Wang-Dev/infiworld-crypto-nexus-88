
import { X } from 'lucide-react';

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

interface StoreDetailsProps {
  store: Store;
  onClose: () => void;
}

const StoreDetails = ({ store, onClose }: StoreDetailsProps) => {
  return (
    <div className="glass-card p-6 relative overflow-y-auto max-h-full">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <X className="w-5 h-5" />
      </button>
      
      <h2 className="text-2xl font-bold gold-gradient-text mb-2">{store.name}</h2>
      <div className="text-sm text-infi-gold-light mb-4">{store.category}</div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400">Address</h3>
          <p className="text-white">{store.address}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400">Hours</h3>
          <p className="text-white">{store.hours}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-400">Accepted Cryptocurrencies</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {store.acceptedCryptos.map(crypto => (
              <span 
                key={crypto} 
                className="px-2 py-1 bg-infi-blue text-xs rounded-full text-infi-gold-light"
              >
                {crypto}
              </span>
            ))}
          </div>
        </div>
        
        {store.description && (
          <div>
            <h3 className="text-sm font-medium text-gray-400">Description</h3>
            <p className="text-white">{store.description}</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <button className="w-full bg-infi-gold hover:bg-infi-gold-light text-black font-medium py-2 rounded-lg transition-colors">
          Get Directions
        </button>
      </div>
    </div>
  );
};

export default StoreDetails;
