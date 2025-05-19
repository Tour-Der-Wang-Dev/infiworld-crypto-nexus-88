
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import UserProfile from "./UserProfile";

const AuthButtons = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
