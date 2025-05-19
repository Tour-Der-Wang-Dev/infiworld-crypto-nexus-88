
import { useState } from "react";
import { User, Settings, CreditCard, ShieldCheck } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    verificationStatus?: "unverified" | "pending" | "verified";
  };
  onSignOut: () => void;
}

const UserProfile = ({ user, onSignOut }: UserProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    // In a real app, you would integrate with Supabase auth here
    // await supabase.auth.signOut();
    onSignOut();
    setIsOpen(false);
    toast.success("You have been signed out successfully");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 border border-infi-gold/50">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-infi-blue text-white">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 infinity-card border-white/10">
        <div className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-infi-gold/50">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-infi-blue text-white">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          
          {/* Verification status */}
          <div className="mt-3 py-1.5 px-2 bg-white/5 rounded-md flex items-center justify-between">
            <span className="text-xs text-gray-300">Verification Status</span>
            {user.verificationStatus === "verified" ? (
              <span className="text-xs flex items-center text-green-400">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Verified
              </span>
            ) : user.verificationStatus === "pending" ? (
              <span className="text-xs text-infi-gold">Pending Review</span>
            ) : (
              <span className="text-xs text-gray-400">Unverified</span>
            )}
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div className="p-2">
          <Button variant="ghost" className="w-full justify-start text-sm" asChild>
            <a href="/profile">
              <User className="h-4 w-4 mr-2" />
              My Profile
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm" asChild>
            <a href="/transactions">
              <CreditCard className="h-4 w-4 mr-2" />
              Transactions
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm" asChild>
            <a href="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </a>
          </Button>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div className="p-2">
          <Button 
            variant="ghost" 
            className="w-full justify-center text-sm hover:text-red-400" 
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
