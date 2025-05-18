
import Layout from '../components/Layout';
import { ArrowRight, CheckCircle, Clock, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Freelance = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold gold-gradient-text mb-6">Freelance Services</h1>
        <p className="text-gray-300 mb-8 max-w-3xl">
          Hire talented professionals or offer your skills with crypto payments. Our marketplace connects clients 
          with skilled freelancers from around the world, all operating on our secure crypto payment system.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="infinity-card p-8">
            <h2 className="text-2xl font-bold text-infi-gold mb-4">Coming Q3 2025</h2>
            <p className="text-gray-300 mb-6">
              Our freelance platform is currently under development. We are building a comprehensive 
              ecosystem where talent and opportunity meet, powered by cryptocurrency.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-infi-gold mr-2"><CheckCircle className="h-5 w-5" /></span>
                <span className="text-gray-200">No platform fees for the first 3 months</span>
              </div>
              <div className="flex items-center">
                <span className="text-infi-gold mr-2"><CheckCircle className="h-5 w-5" /></span>
                <span className="text-gray-200">Escrow protection for all transactions</span>
              </div>
              <div className="flex items-center">
                <span className="text-infi-gold mr-2"><CheckCircle className="h-5 w-5" /></span>
                <span className="text-gray-200">Support for major cryptocurrencies</span>
              </div>
            </div>
            
            <Button className="mt-6 bg-infi-gold hover:bg-infi-gold-light text-black">
              Join Waitlist
            </Button>
          </div>
          
          <div className="infinity-card p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-infi-gold/20 rounded-full filter blur-xl"></div>
            <h2 className="text-2xl font-bold gold-gradient-text mb-4">How It Will Work</h2>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-start">
                <div className="bg-infi-gold/20 p-2 rounded-full mr-4 mt-1">
                  <span className="font-bold text-infi-gold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Post a Project or Browse Jobs</h3>
                  <p className="text-gray-300 text-sm">Clients post projects with detailed requirements and budgets, while freelancers can browse opportunities matching their skills.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-infi-gold/20 p-2 rounded-full mr-4 mt-1">
                  <span className="font-bold text-infi-gold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Fund Escrow with Crypto</h3>
                  <p className="text-gray-300 text-sm">Clients fund secure escrow accounts with their preferred cryptocurrency to protect both parties.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-infi-gold/20 p-2 rounded-full mr-4 mt-1">
                  <span className="font-bold text-infi-gold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Complete Work & Release Payment</h3>
                  <p className="text-gray-300 text-sm">Once work is approved, funds are instantly released to the freelancer's crypto wallet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold gold-gradient-text mb-6">Featured Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="glass-card p-6 hover:bg-infi-deep/50 transition-colors cursor-pointer">
                <div className="text-infi-gold mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Platform Benefits */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold gold-gradient-text mb-6">Platform Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="infinity-card p-6">
              <div className="text-infi-gold mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Payments</h3>
              <p className="text-gray-300">
                No more waiting for bank transfers or payment processors. 
                Get paid instantly in crypto once work is approved.
              </p>
            </div>
            
            <div className="infinity-card p-6">
              <div className="text-infi-gold mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Talent</h3>
              <p className="text-gray-300">
                Access a worldwide network of verified professionals 
                without worrying about international payment issues.
              </p>
            </div>
            
            <div className="infinity-card p-6">
              <div className="text-infi-gold mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-300">
                Our verification system and review platform ensures 
                you're working with reliable, skilled professionals.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="infinity-card p-8 text-center">
          <h2 className="text-2xl font-bold gold-gradient-text mb-4">Be the First to Know</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Join our waitlist to get early access to the platform, exclusive benefits, 
            and updates on our launch progress.
          </p>
          
          <Button className="bg-infi-gold hover:bg-infi-gold-light text-black inline-flex items-center gap-2">
            Join Waitlist <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

// Sample categories with icons
const categories = [
  {
    name: "Web Development",
    icon: <i className="text-xl">💻</i>,
    description: "Website design, frontend and backend development"
  },
  {
    name: "Graphic Design",
    icon: <i className="text-xl">🎨</i>,
    description: "Logos, branding, illustration and visual content"
  },
  {
    name: "Content Writing",
    icon: <i className="text-xl">✍️</i>,
    description: "Blog posts, copywriting, technical writing"
  },
  {
    name: "Marketing",
    icon: <i className="text-xl">📱</i>,
    description: "Social media, SEO, email campaigns"
  },
  {
    name: "Video & Animation",
    icon: <i className="text-xl">🎬</i>,
    description: "Motion graphics, video editing, explainers"
  },
  {
    name: "Blockchain Dev",
    icon: <i className="text-xl">⛓️</i>,
    description: "Smart contracts, dApps, crypto integrations"
  },
  {
    name: "3D Modeling",
    icon: <i className="text-xl">🧊</i>,
    description: "Product visualization, game assets, NFT creation"
  },
  {
    name: "Translation",
    icon: <i className="text-xl">🌐</i>,
    description: "Document translation, localization services"
  }
];

export default Freelance;
