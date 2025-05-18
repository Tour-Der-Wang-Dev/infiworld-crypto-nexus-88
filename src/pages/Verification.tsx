
import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, AlertCircle, Upload, Check, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Layout from '../components/Layout';

// Form schema with validation
const verificationFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Country is required"),
  idType: z.string().min(1, "ID type is required"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type VerificationFormValues = z.infer<typeof verificationFormSchema>;

const Verification = () => {
  const [step, setStep] = useState<'info' | 'documents' | 'review'>('info');
  const [idFrontUploaded, setIdFrontUploaded] = useState(false);
  const [idBackUploaded, setIdBackUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  // Form setup with validation
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      country: "",
      idType: "",
      acceptTerms: false,
    },
  });

  // Handle form submission
  function onSubmit(values: VerificationFormValues) {
    if (step === 'info') {
      setStep('documents');
    } else if (step === 'documents' && idFrontUploaded && idBackUploaded && selfieUploaded) {
      setStep('review');
    } else if (step === 'review') {
      // In a real app, you would submit the form data to your backend here
      toast.success("Verification submitted successfully! We'll review your information and get back to you shortly.");
      setStep('info');
      form.reset();
      setIdFrontUploaded(false);
      setIdBackUploaded(false);
      setSelfieUploaded(false);
    }
  }

  // Simulate file upload
  const handleFileUpload = (type: 'front' | 'back' | 'selfie') => {
    toast.info("Processing your document...");
    
    // Simulate processing delay
    setTimeout(() => {
      if (type === 'front') setIdFrontUploaded(true);
      if (type === 'back') setIdBackUploaded(true);
      if (type === 'selfie') setSelfieUploaded(true);
      
      toast.success("Document uploaded successfully!");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gold-gradient-text mb-4">Identity Verification</h1>
          <p className="text-gray-300 max-w-3xl">
            Complete our secure KYC verification to unlock premium features, higher transaction limits,
            and access to all InfiWorld services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar with steps */}
          <div className="lg:col-span-1">
            <Card className="infinity-card border-white/10">
              <CardHeader>
                <CardTitle className="gold-gradient-text">Verification Steps</CardTitle>
                <CardDescription className="text-gray-300">3 steps to complete verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${step === 'info' ? 'bg-infi-gold text-black' : 'bg-muted'}`}>
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className={`font-medium ${step === 'info' ? 'text-infi-gold' : 'text-gray-300'}`}>Personal Information</p>
                    <p className="text-xs text-gray-400">Basic details about you</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${step === 'documents' ? 'bg-infi-gold text-black' : 'bg-muted'}`}>
                    <Upload size={16} />
                  </div>
                  <div>
                    <p className={`font-medium ${step === 'documents' ? 'text-infi-gold' : 'text-gray-300'}`}>Upload Documents</p>
                    <p className="text-xs text-gray-400">Provide ID verification</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${step === 'review' ? 'bg-infi-gold text-black' : 'bg-muted'}`}>
                    <Check size={16} />
                  </div>
                  <div>
                    <p className={`font-medium ${step === 'review' ? 'text-infi-gold' : 'text-gray-300'}`}>Review & Submit</p>
                    <p className="text-xs text-gray-400">Final confirmation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="infinity-card border-white/10 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Why Verify?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-infi-gold">
                    <Check size={16} />
                  </div>
                  <p className="text-sm text-gray-300">Increased transaction limits</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-infi-gold">
                    <Check size={16} />
                  </div>
                  <p className="text-sm text-gray-300">Access to premium services</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-infi-gold">
                    <Check size={16} />
                  </div>
                  <p className="text-sm text-gray-300">Enhanced security features</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-infi-gold">
                    <Check size={16} />
                  </div>
                  <p className="text-sm text-gray-300">Lower transaction fees</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right side with form */}
          <div className="lg:col-span-2">
            <Card className="infinity-card border-white/10">
              <CardHeader>
                <CardTitle className="gold-gradient-text">
                  {step === 'info' && "Personal Information"}
                  {step === 'documents' && "Document Verification"}
                  {step === 'review' && "Review & Submit"}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {step === 'info' && "Please provide your basic personal information"}
                  {step === 'documents' && "Upload the required documents for verification"}
                  {step === 'review' && "Review your information before final submission"}
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent>
                    {/* Personal Information Step */}
                    {step === 'info' && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full legal name"
                                  className="bg-infi-deep text-white border-white/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your email address"
                                  className="bg-infi-deep text-white border-white/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Date of Birth</FormLabel>
                                <FormControl>
                                  <Input
                                    type="date"
                                    className="bg-infi-deep text-white border-white/20"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-300">Country of Residence</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your country"
                                    className="bg-infi-deep text-white border-white/20"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="idType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">ID Document Type</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Passport, Driver's License, ID Card"
                                  className="bg-infi-deep text-white border-white/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="acceptTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-infi-gold data-[state=checked]:text-black"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-gray-300">
                                  I agree to the terms of service and privacy policy
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Document Upload Step */}
                    {step === 'documents' && (
                      <div className="space-y-6">
                        <div className="bg-infi-blue/30 rounded-lg p-4 text-sm text-gray-300 flex items-start gap-3">
                          <AlertCircle className="text-infi-gold shrink-0 mt-0.5" size={18} />
                          <div>
                            Make sure your documents are clearly visible, uncropped, and include all four corners. 
                            Supported formats: JPG, PNG, PDF (max 5MB).
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-300">ID Document (Front)</h3>
                            <div 
                              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-infi-deep/50 transition-colors
                                ${idFrontUploaded ? 'border-green-500/50' : 'border-white/10'}`}
                              onClick={() => handleFileUpload('front')}
                            >
                              {idFrontUploaded ? (
                                <div className="flex flex-col items-center text-green-500">
                                  <Check size={24} />
                                  <p className="mt-2 text-sm">Document uploaded successfully</p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                  <Upload size={24} />
                                  <p className="mt-2 text-sm">Click to upload front of ID</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-300">ID Document (Back)</h3>
                            <div 
                              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-infi-deep/50 transition-colors
                                ${idBackUploaded ? 'border-green-500/50' : 'border-white/10'}`}
                              onClick={() => handleFileUpload('back')}
                            >
                              {idBackUploaded ? (
                                <div className="flex flex-col items-center text-green-500">
                                  <Check size={24} />
                                  <p className="mt-2 text-sm">Document uploaded successfully</p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                  <Upload size={24} />
                                  <p className="mt-2 text-sm">Click to upload back of ID</p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-300">Selfie with ID</h3>
                            <div 
                              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-infi-deep/50 transition-colors
                                ${selfieUploaded ? 'border-green-500/50' : 'border-white/10'}`}
                              onClick={() => handleFileUpload('selfie')}
                            >
                              {selfieUploaded ? (
                                <div className="flex flex-col items-center text-green-500">
                                  <Check size={24} />
                                  <p className="mt-2 text-sm">Selfie uploaded successfully</p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                  <Upload size={24} />
                                  <p className="mt-2 text-sm">Click to upload selfie with ID</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Review Step */}
                    {step === 'review' && (
                      <div className="space-y-6">
                        <div className="bg-infi-gold/10 rounded-lg p-4 text-sm text-infi-gold-light">
                          <p>Please review your information carefully before submitting. Once submitted, you cannot make changes until after our review.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-infi-gold mb-1">Personal Information</h3>
                            <div className="bg-infi-deep/50 rounded-lg p-4 space-y-2">
                              <div className="grid grid-cols-2 gap-1">
                                <p className="text-sm text-gray-400">Full Name:</p>
                                <p className="text-sm text-gray-300">{form.getValues().fullName}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <p className="text-sm text-gray-400">Email:</p>
                                <p className="text-sm text-gray-300">{form.getValues().email}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <p className="text-sm text-gray-400">Date of Birth:</p>
                                <p className="text-sm text-gray-300">{form.getValues().dateOfBirth}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <p className="text-sm text-gray-400">Country:</p>
                                <p className="text-sm text-gray-300">{form.getValues().country}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <p className="text-sm text-gray-400">ID Type:</p>
                                <p className="text-sm text-gray-300">{form.getValues().idType}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-infi-gold mb-1">Documents Uploaded</h3>
                            <div className="bg-infi-deep/50 rounded-lg p-4 space-y-2">
                              <div className="flex items-center gap-2">
                                <Check className="text-green-500" size={16} />
                                <p className="text-sm text-gray-300">ID Document (Front)</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Check className="text-green-500" size={16} />
                                <p className="text-sm text-gray-300">ID Document (Back)</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Check className="text-green-500" size={16} />
                                <p className="text-sm text-gray-300">Selfie with ID</p>
                              </div>
                            </div>
                          </div>
                          
                          <Separator className="bg-white/10" />
                          
                          <div className="space-y-2">
                            <p className="text-sm text-gray-300">By submitting, you confirm that:</p>
                            <ul className="space-y-1">
                              <li className="text-xs text-gray-400 flex items-start gap-2">
                                <ChevronRight className="shrink-0 mt-0.5" size={12} />
                                <span>All information provided is accurate and complete</span>
                              </li>
                              <li className="text-xs text-gray-400 flex items-start gap-2">
                                <ChevronRight className="shrink-0 mt-0.5" size={12} />
                                <span>You are the person in the provided documents</span>
                              </li>
                              <li className="text-xs text-gray-400 flex items-start gap-2">
                                <ChevronRight className="shrink-0 mt-0.5" size={12} />
                                <span>You consent to our processing of your personal data</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-white/10 pt-6">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        if (step === 'documents') setStep('info');
                        if (step === 'review') setStep('documents');
                      }}
                      disabled={step === 'info'}
                      className="border-white/20 text-white hover:bg-infi-deep"
                    >
                      Back
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="bg-infi-gold hover:bg-infi-gold-light text-black"
                      disabled={step === 'documents' && (!idFrontUploaded || !idBackUploaded || !selfieUploaded)}
                    >
                      {step === 'info' && "Continue"}
                      {step === 'documents' && "Review"}
                      {step === 'review' && "Submit Verification"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-12 glass-card p-8">
          <h2 className="text-2xl font-bold gold-gradient-text mb-6">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg text-infi-gold-light">How long does verification take?</h3>
              <p className="text-gray-300 text-sm">Most verifications are completed within 1-3 business days, though some may take longer depending on volume.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg text-infi-gold-light">What if my verification is rejected?</h3>
              <p className="text-gray-300 text-sm">You'll receive an email with the reason and instructions on how to resubmit with corrected information.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg text-infi-gold-light">Is my data secure?</h3>
              <p className="text-gray-300 text-sm">Yes, we use bank-level encryption and security measures to protect your personal information and documents.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg text-infi-gold-light">Do I need to verify my identity to use basic features?</h3>
              <p className="text-gray-300 text-sm">No, basic features are available without verification, but you'll need to complete KYC for premium services and higher limits.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Verification;
