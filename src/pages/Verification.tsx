
import { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const verificationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  documentType: z.enum(['passport', 'idCard', 'driverLicense'], {
    required_error: 'Please select a document type',
  }),
  documentNumber: z.string().min(5, 'Document number must be at least 5 characters'),
  address: z.string().min(10, 'Please enter your full address'),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms to proceed' }),
  }),
});

type VerificationValues = z.infer<typeof verificationSchema>;

const Verification = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const form = useForm<VerificationValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      documentType: 'passport',
      documentNumber: '',
      address: '',
      // Fix: Initialize with undefined instead of false to avoid the type error
      termsAccepted: undefined as unknown as true,
    },
  });
  
  const onSubmit = async (values: VerificationValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Verification submitted:', values);
      
      // Show success state
      setShowSuccess(true);
      toast.success('Verification submitted successfully!');
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (showSuccess) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto glass-card p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold gold-gradient-text mb-4">Verification Submitted!</h2>
              <p className="text-gray-300 mb-6">
                Your verification documents have been submitted successfully. Our team will review your information and notify you once the verification process is complete.
              </p>
              <p className="text-gray-300 mb-8">
                This typically takes 1-3 business days.
              </p>
              <Button className="bg-infi-gold hover:bg-infi-gold-light text-black">
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold gold-gradient-text mb-6">Identity Verification</h1>
        <p className="text-gray-300 mb-8 max-w-3xl">
          Complete the verification process to unlock all features of InfiWorld. Your information is encrypted and securely stored.
        </p>
        
        <div className="max-w-3xl glass-card p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John" 
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Doe" 
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        className="bg-infi-deep text-white border-white/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Document Type</FormLabel>
                      <FormControl>
                        <select
                          className="w-full p-2 rounded-md bg-infi-deep text-white border-white/20"
                          {...field}
                        >
                          <option value="passport">Passport</option>
                          <option value="idCard">ID Card</option>
                          <option value="driverLicense">Driver's License</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Document Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="AB123456789" 
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Residential Address</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your full residential address" 
                        className="bg-infi-deep text-white border-white/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-infi-gold">Document Upload</h3>
                
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-300 mb-2">Drag and drop your document image here,</p>
                  <p className="text-gray-300 mb-4">or click to browse files</p>
                  <Button variant="outline" type="button">
                    Choose File
                  </Button>
                  <p className="text-gray-400 text-sm mt-4">
                    Supported formats: JPG, PNG, PDF (max size: 5MB)
                  </p>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true);
                        }}
                        className="data-[state=checked]:bg-infi-gold data-[state=checked]:text-black"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-gray-300">
                        I confirm that all information provided is accurate and I consent to the processing of my personal data for verification purposes.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-infi-gold hover:bg-infi-gold-light text-black"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Verification'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Verification;
