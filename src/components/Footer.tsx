
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto glass-card border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 flex justify-center items-center">
                  <img 
                    src="/lovable-uploads/fa2ca62f-a8b9-4103-a00b-25b4cb4ea24b.png" 
                    alt="InfiWorld Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold gold-gradient-text">InfiWorld</h2>
            </Link>
            <p className="text-sm text-gray-400">
              Connecting the world through cryptocurrency services.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-infi-gold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/map" className="hover:text-infi-gold-light transition-colors">Crypto Map</Link></li>
              <li><Link to="/marketplace" className="hover:text-infi-gold-light transition-colors">Marketplace</Link></li>
              <li><Link to="/freelance" className="hover:text-infi-gold-light transition-colors">Freelance</Link></li>
              <li><Link to="/reservations" className="hover:text-infi-gold-light transition-colors">Reservations</Link></li>
              <li><Link to="/verification" className="hover:text-infi-gold-light transition-colors">Verification</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-infi-gold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-infi-gold-light transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-infi-gold-light transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-infi-gold-light transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-infi-gold">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-infi-gold-light transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-infi-gold-light transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-infi-gold-light transition-colors">Telegram</a></li>
              <li><a href="#" className="hover:text-infi-gold-light transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} InfiWorld Crypto Hub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Link to="#" className="text-sm text-gray-400 hover:text-infi-gold-light">Contact</Link>
            <Link to="#" className="text-sm text-gray-400 hover:text-infi-gold-light">FAQ</Link>
            <Link to="#" className="text-sm text-gray-400 hover:text-infi-gold-light">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
