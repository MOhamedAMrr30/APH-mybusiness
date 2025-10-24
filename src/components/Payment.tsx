import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Lock, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import db from "@/lib/database";
import auth from "@/lib/auth";
import { Program } from "@/lib/database-schema";

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    phone: '',
    amount: '',
    program: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Load programs from database
  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const programsData = await db.getAllPrograms();
        setPrograms(programsData.filter(program => program.isActive));
      } catch (error) {
        console.error('Error loading programs:', error);
      }
    };

    const loadCurrentUser = async () => {
      try {
        const user = await auth.getCurrentUser();
        setCurrentUser(user);
        if (user) {
          setFormData(prev => ({
            ...prev,
            email: user.email,
            cardholderName: user.name
          }));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };

    loadPrograms();
    loadCurrentUser();
  }, []);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.expiryDate || formData.expiryDate.length < 5) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.program) {
      newErrors.program = 'Please select a program';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    } else if (field === 'phone') {
      formattedValue = value.replace(/\D/g, '').substring(0, 15);
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create or get user
      let userId = currentUser?.id;
      if (!userId) {
        // Create new user if not logged in
        const newUser = await db.createUser({
          email: formData.email,
          name: formData.cardholderName,
          phone: formData.phone,
          role: 'user',
          isActive: true
        });
        userId = newUser.id;
      }

      // Create payment record
      const selectedProgram = programs.find(p => p.id === formData.program);
      if (!selectedProgram) {
        throw new Error('Selected program not found');
      }

      const payment = await db.createPayment({
        userId: userId,
        programId: formData.program,
        amount: parseFloat(formData.amount),
        currency: 'USD',
        paymentMethod: getCardType(formData.cardNumber).toLowerCase().replace(' ', '_') as any,
        cardLastFour: formData.cardNumber.slice(-4),
        status: 'completed',
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paymentDate: new Date()
      });

      // Create enrollment
      await db.createEnrollment({
        userId: userId,
        programId: formData.program,
        paymentId: payment.id,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
      });

      // Log activity
      await db.logActivity({
        userId: userId,
        action: 'payment_completed',
        entityType: 'payment',
        entityId: payment.id,
        details: {
          amount: payment.amount,
          program: selectedProgram.name,
          paymentMethod: payment.paymentMethod
        },
        ipAddress: 'unknown',
        userAgent: navigator.userAgent
      });

      setIsProcessing(false);
      setPaymentSuccess(true);
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsProcessing(false);
      setErrors({ submit: 'Payment processing failed. Please try again.' });
    }
  };

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Credit Card';
  };

  if (paymentSuccess) {
    return (
      <section id="payment" className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center shadow-2xl border-4 border-green-200 bg-white">
              <CardContent className="p-12">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl font-black mb-6 text-green-900">
                  Payment Successful!
                </h2>
                <p className="text-xl text-gray-700 mb-8">
                  Thank you for your payment. You will receive a confirmation email shortly.
                </p>
                <Button 
                  onClick={() => {
                    setPaymentSuccess(false);
                    setFormData({
                      cardNumber: '',
                      expiryDate: '',
                      cvv: '',
                      cardholderName: '',
                      email: '',
                      phone: '',
                      amount: '',
                      program: ''
                    });
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-12 py-4 text-lg rounded-full shadow-lg"
                >
                  Make Another Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="payment" className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-blue-900">
              Payment
            </h2>
            <p className="text-2xl text-blue-800 max-w-3xl mx-auto font-medium">
              Secure payment processing for all our programs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Payment Form */}
            <Card className="shadow-2xl border-4 border-blue-100 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <CreditCard className="h-8 w-8 mr-3" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Program Selection */}
                  <div>
                    <Label htmlFor="program" className="text-lg font-semibold text-gray-800">
                      Select Program *
                    </Label>
                    <Select 
                      value={formData.program} 
                      onValueChange={(value) => {
                        const selectedProgram = programs.find(p => p.id === value);
                        handleInputChange('program', value);
                        handleInputChange('amount', selectedProgram?.price.toString() || '');
                      }}
                    >
                      <SelectTrigger className="mt-2 h-14 text-lg border-2 border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Choose your program" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name} - ${program.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.program && (
                      <Alert className="mt-2 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-600">
                          {errors.program}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Card Number */}
                  <div>
                    <Label htmlFor="cardNumber" className="text-lg font-semibold text-gray-800">
                      Card Number *
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        maxLength={19}
                        className="h-14 text-lg border-2 border-gray-300 focus:border-blue-500 pr-20"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Badge variant="secondary" className="text-xs">
                          {formData.cardNumber ? getCardType(formData.cardNumber) : 'Card'}
                        </Badge>
                      </div>
                    </div>
                    {errors.cardNumber && (
                      <Alert className="mt-2 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-600">
                          {errors.cardNumber}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <Label htmlFor="cardholderName" className="text-lg font-semibold text-gray-800">
                      Cardholder Name *
                    </Label>
                    <Input
                      id="cardholderName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      className="mt-2 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                    />
                    {errors.cardholderName && (
                      <Alert className="mt-2 border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-600">
                          {errors.cardholderName}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-lg font-semibold text-gray-800">
                        Expiry Date *
                      </Label>
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        maxLength={5}
                        className="mt-2 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                      />
                      {errors.expiryDate && (
                        <Alert className="mt-2 border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-600">
                            {errors.expiryDate}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-lg font-semibold text-gray-800">
                        CVV *
                      </Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        maxLength={4}
                        className="mt-2 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                      />
                      {errors.cvv && (
                        <Alert className="mt-2 border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-600">
                            {errors.cvv}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border-t-2 border-gray-200 pt-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-lg font-semibold text-gray-800">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-2 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                        />
                        {errors.email && (
                          <Alert className="mt-2 border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-600">
                              {errors.email}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-lg font-semibold text-gray-800">
                          Phone *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="mt-2 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                        />
                        {errors.phone && (
                          <Alert className="mt-2 border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-600">
                              {errors.phone}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Lock className="h-6 w-6 mr-3" />
                        Pay ${formData.amount || '0'}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <div className="space-y-6">
              <Card className="shadow-2xl border-4 border-green-100 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Shield className="h-8 w-8 mr-3" />
                    Security Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                      <span className="text-lg font-semibold">SSL Encryption</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                      <span className="text-lg font-semibold">PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                      <span className="text-lg font-semibold">Secure Payment Gateway</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                      <span className="text-lg font-semibold">Fraud Protection</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-4 border-blue-100 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {formData.program ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          {programs.find(p => p.id === formData.program)?.name}
                        </span>
                        <span className="text-xl font-bold text-blue-600">
                          ${formData.amount}
                        </span>
                      </div>
                      <div className="border-t-2 border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold">Total</span>
                          <span className="text-2xl font-black text-blue-600">
                            ${formData.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center">
                      Select a program to see payment details
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-2xl border-4 border-purple-100 bg-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-purple-900">Accepted Payment Methods</h3>
                  <div className="flex flex-wrap gap-4">
                    <Badge className="bg-blue-600 text-white px-4 py-2 text-lg">Visa</Badge>
                    <Badge className="bg-red-600 text-white px-4 py-2 text-lg">Mastercard</Badge>
                    <Badge className="bg-green-600 text-white px-4 py-2 text-lg">American Express</Badge>
                    <Badge className="bg-purple-600 text-white px-4 py-2 text-lg">Discover</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
