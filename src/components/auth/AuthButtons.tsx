
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import UserProfile from "./UserProfile";

const AuthButtons = () => {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Button 
        disabled
        className="bg-infi-gold/50 text-black"
      >
        Loading...
      </Button>
    );
  }

  if (isAuthenticated && user) {
    return <UserProfile user={user} onSignOut={signOut} />;
  }

  return (
    <>
      <Button 
        onClick={() => setIsAuthModalOpen(true)}
        className="bg-infi-gold hover:bg-infi-gold-light text-black"
      >
        Sign In
      </Button>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default AuthButtons;
