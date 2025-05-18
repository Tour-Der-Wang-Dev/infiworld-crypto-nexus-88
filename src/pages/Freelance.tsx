
import Layout from '../components/Layout';

const Freelance = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold gold-gradient-text mb-6">Freelance Services</h1>
        <p className="text-gray-300 mb-8 max-w-3xl">
          Hire talented professionals or offer your skills with crypto payments.
        </p>
        
        <div className="infinity-card p-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-infi-gold mb-4">Coming Soon</h2>
            <p className="text-gray-300">
              Our freelance platform is under development. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Freelance;
