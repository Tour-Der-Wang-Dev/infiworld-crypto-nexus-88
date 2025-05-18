
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import FeatureCard from '../components/FeatureCard';
import { Map, ShoppingBag, Users, Plane, Shield, ArrowRight, Infinity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <div className="w-32 h-32 mb-6 animate-float">
            <img 
              src="/lovable-uploads/fa2ca62f-a8b9-4103-a00b-25b4cb4ea24b.png" 
              alt="InfiWorld Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gold-gradient-text">
            InfiWorld Crypto Hub
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
            Connecting the world through cryptocurrency services.
            Discover stores, book travel, hire talent, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-infi-gold hover:bg-infi-gold-light text-black text-lg px-6 py-6">
              Get Started
            </Button>
            <Button variant="outline" className="border-infi-gold text-infi-gold hover:bg-infi-gold/10 text-lg px-6 py-6">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-infi-blue rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-infi-blue rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-infi-deep/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-gradient-text">
              Explore Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              InfiWorld offers a comprehensive suite of cryptocurrency-powered services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Crypto Store Map"
              description="Find stores, restaurants, and services that accept cryptocurrencies near you."
              icon={<Map className="w-10 h-10" />}
            />
            <FeatureCard
              title="Crypto Marketplace"
              description="Buy and sell properties, vehicles, and luxury goods using your favorite cryptocurrencies."
              icon={<ShoppingBag className="w-10 h-10" />}
            />
            <FeatureCard
              title="Freelance Services"
              description="Hire talented professionals or offer your skills with crypto payments."
              icon={<Users className="w-10 h-10" />}
            />
            <FeatureCard
              title="Travel Reservations"
              description="Book flights, hotels, and experiences worldwide using crypto."
              icon={<Plane className="w-10 h-10" />}
            />
            <FeatureCard
              title="Identity Verification"
              description="Secure KYC verification to unlock premium features and higher limits."
              icon={<Shield className="w-10 h-10" />}
            />
          </div>
        </div>
      </section>
      
      {/* Map Section Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-gradient-text">
                Find Crypto-Friendly Locations Near You
              </h2>
              <p className="text-gray-300 mb-6">
                Our interactive map shows you restaurants, stores, and services that accept 
                cryptocurrency payments. Filter by location, business type, or accepted currencies.
              </p>
              <Link to="/map">
                <Button className="bg-infi-gold hover:bg-infi-gold-light text-black flex items-center gap-2">
                  Explore the Map <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="infinity-card overflow-hidden rounded-xl h-80 animate-glow">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 backdrop-blur-sm bg-infi-dark/30 flex items-center justify-center">
                  <div className="text-center">
                    <Infinity className="w-16 h-16 text-infi-gold mx-auto mb-4" />
                    <span className="text-infi-gold">Interactive Map</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-infi-deep/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-gradient-text">
            Ready to Join the Crypto Revolution?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create your account today and start exploring the world of cryptocurrency services.
          </p>
          <Button className="bg-infi-gold hover:bg-infi-gold-light text-black text-lg px-8 py-6">
            Join InfiWorld
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
