
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Check, X, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerificationStatus = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<"unverified" | "pending" | "verified">(
    user?.verificationStatus || "unverified"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.verificationStatus) {
      setStatus(user.verificationStatus);
    }
  }, [user]);

  const getStatusBadge = () => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-600 text-white">
            <Check className="mr-1 h-3 w-3" /> Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-infi-gold text-black">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500 text-white">
            <AlertTriangle className="mr-1 h-3 w-3" /> Unverified
          </Badge>
        );
    }
  };

  const renderStatusContent = () => {
    switch (status) {
      case "verified":
        return (
          <div className="text-center py-4">
            <div className="mb-4 bg-green-600/20 p-4 rounded-full inline-flex">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Verification Complete</h3>
            <p className="text-gray-300 mb-4">
              Your identity has been verified. You now have full access to all features of InfiWorld.
            </p>
          </div>
        );
      case "pending":
        return (
          <div className="text-center py-4">
            <div className="mb-4 bg-infi-gold/20 p-4 rounded-full inline-flex">
              <Clock className="h-8 w-8 text-infi-gold" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Verification In Progress</h3>
            <p className="text-gray-300 mb-4">
              Your verification documents are being reviewed by our team.
              This typically takes 1-3 business days.
            </p>
          </div>
        );
      default:
        return (
          <div className="text-center py-4">
            <div className="mb-4 bg-gray-600/20 p-4 rounded-full inline-flex">
              <AlertTriangle className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Verification Required</h3>
            <p className="text-gray-300 mb-4">
              Verify your identity to unlock all features of InfiWorld.
              This process typically takes less than 5 minutes to complete.
            </p>
            <Button 
              onClick={() => navigate("/verification")}
              className="bg-infi-gold hover:bg-infi-gold-light text-black"
            >
              Start Verification
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className="infinity-card border-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div>
          <CardTitle className="text-white">Verification Status</CardTitle>
          <CardDescription>Your current identity verification status</CardDescription>
        </div>
        {getStatusBadge()}
      </CardHeader>
      <CardContent>
        {renderStatusContent()}
      </CardContent>
    </Card>
  );
};

export default VerificationStatus;
