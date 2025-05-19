
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = "signin" | "signup" | "forgot-password";

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [view, setView] = useState<AuthView>("signin");

  const handleForgotPassword = () => {
    setView("forgot-password");
  };

  const handleBackToSignIn = () => {
    setView("signin");
  };

  const resetModal = () => {
    // Reset the modal state when it's closed
    setTimeout(() => {
      setView("signin");
      setActiveTab("signin");
    }, 300); // Slight delay to allow dialog close animation
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-[425px] infinity-card">
        {view === "forgot-password" ? (
          <ForgotPasswordForm onBack={handleBackToSignIn} onSuccess={resetModal} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="gold-gradient-text text-2xl">
                {activeTab === "signin" ? "Welcome Back" : "Join InfiWorld"}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                {activeTab === "signin" 
                  ? "Sign in to access your account and continue your crypto journey."
                  : "Create an account to explore the world of cryptocurrency with InfiWorld."
                }
              </DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SignInForm onSuccess={resetModal} />
                <div className="mt-4 text-center">
                  <Button 
                    variant="link" 
                    className="text-infi-gold p-0 h-auto"
                    onClick={handleForgotPassword}
                  >
                    Forgot your password?
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm onSuccess={resetModal} />
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-gray-400 mt-4">
              By continuing, you agree to InfiWorld's Terms of Service and Privacy Policy.
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
