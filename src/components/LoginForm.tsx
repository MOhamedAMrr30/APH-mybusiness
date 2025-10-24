import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  LogIn, 
  UserPlus, 
  Shield, 
  Mail, 
  Lock, 
  User, 
  Phone,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import auth from "@/lib/auth";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'coach' | 'student'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await auth.signIn(loginData.email, loginData.password);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        // Redirect to admin dashboard or main page
        setTimeout(() => {
          window.location.href = result.user?.role === 'admin' ? '#admin-dashboard' : '#home';
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.error || 'Login failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      setLoading(false);
      return;
    }

    try {
      const result = await auth.signUp(
        signupData.email,
        signupData.password,
        signupData.name,
        signupData.phone,
        signupData.role
      );
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Account created successfully! Please check your email to verify your account.' });
        setSignupData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          role: 'user'
        });
      } else {
        setMessage({ type: 'error', text: result.error || 'Signup failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (activeTab === 'login') {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setSignupData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <section id="login" className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-4 border-blue-100 bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold flex items-center justify-center">
                <Shield className="h-8 w-8 mr-3" />
                APH Access Portal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {message && (
                <Alert className={`mb-6 ${message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login" className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <Label htmlFor="login-email" className="text-lg font-semibold text-gray-800">
                        Email Address *
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          value={loginData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="login-password" className="text-lg font-semibold text-gray-800">
                        Password *
                      </Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="pl-10 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Signing In...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <LogIn className="h-6 w-6 mr-3" />
                          Sign In
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Signup Tab */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                      <Label htmlFor="signup-name" className="text-lg font-semibold text-gray-800">
                        Full Name *
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signupData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-email" className="text-lg font-semibold text-gray-800">
                        Email Address *
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          value={signupData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-phone" className="text-lg font-semibold text-gray-800">
                        Phone Number *
                      </Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="signup-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={signupData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-role" className="text-lg font-semibold text-gray-800">
                        Account Type *
                      </Label>
                      <Select value={signupData.role} onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger className="mt-2 h-14 text-lg border-2 border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              Student/Parent
                            </div>
                          </SelectItem>
                          <SelectItem value="coach">
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 mr-2" />
                              Coach
                            </div>
                          </SelectItem>
                          <SelectItem value="student">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              Student
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="signup-password" className="text-lg font-semibold text-gray-800">
                        Password *
                      </Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          value={signupData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="pl-10 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-confirm-password" className="text-lg font-semibold text-gray-800">
                        Confirm Password *
                      </Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="signup-confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={signupData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="pl-10 h-14 text-lg border-2 border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full shadow-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Creating Account...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <UserPlus className="h-6 w-6 mr-3" />
                          Create Account
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Role Information */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Account Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Badge className="bg-blue-600 text-white mr-3">Student/Parent</Badge>
                    <span className="text-sm text-gray-700">Access programs and payments</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-green-600 text-white mr-3">Coach</Badge>
                    <span className="text-sm text-gray-700">View student data and programs</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-purple-600 text-white mr-3">Admin</Badge>
                    <span className="text-sm text-gray-700">Full system access and management</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

