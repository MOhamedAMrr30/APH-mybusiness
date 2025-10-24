import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User, CheckCircle } from "lucide-react";

const SubscribeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For now, we'll simulate a successful subscription
      // In production, this would connect to your actual database
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      console.log("Subscription data:", formData);
      
      // Store in localStorage for now (in production, this would go to your database)
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      subscriptions.push({
        ...formData,
        subscribed_at: new Date().toISOString()
      });
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-4 border-green-200 shadow-2xl">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-4">Successfully Subscribed!</h3>
          <p className="text-lg">
            Thank you for subscribing! You'll receive updates about our latest programs and achievements.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-4 border-blue-200 shadow-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-3xl font-black text-blue-900">
          Subscribe to Updates
        </CardTitle>
        <p className="text-blue-700 font-medium">
          Stay informed about our latest programs and achievements
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-semibold text-blue-900">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="pl-12 h-12 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-full"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-semibold text-blue-900">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="pl-12 h-12 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-full"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-lg font-semibold text-blue-900">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-600" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="pl-12 h-12 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-full"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 text-xl rounded-full shadow-lg transition-all duration-300"
          >
            {isLoading ? "Subscribing..." : "Subscribe to Updates"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubscribeForm;
