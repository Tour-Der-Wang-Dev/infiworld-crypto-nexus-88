
import Layout from '../components/Layout';

const Reservations = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold gold-gradient-text mb-6">Travel Reservations</h1>
        <p className="text-gray-300 mb-8 max-w-3xl">
          Book flights, hotels, and experiences worldwide using crypto.
        </p>
        
        <div className="infinity-card p-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-infi-gold mb-4">Coming Soon</h2>
            <p className="text-gray-300">
              Our travel booking platform is under development. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reservations;
