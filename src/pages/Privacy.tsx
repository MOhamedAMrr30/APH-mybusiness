import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <Shield className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-5xl md:text-6xl font-black text-blue-900">
                Privacy Policy
              </h1>
            </div>
            <p className="text-2xl text-blue-800 font-medium">
              Last updated: January 2025
            </p>
          </div>

          {/* Privacy Content */}
          <Card className="shadow-2xl border-4 border-blue-100 bg-white">
            <CardContent className="p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">1. Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We collect personal information including names, contact details, emergency contacts, medical information, and payment details. We also collect photos and videos for training analysis and promotional purposes with your consent.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">2. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Your information is used to provide training services, communicate about programs, ensure safety, process payments, and improve our services. We may use photos/videos for promotional materials with your explicit consent.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">3. Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We do not sell, trade, or rent your personal information to third parties. We may share information with medical professionals in case of emergencies, or as required by law. All sharing is done with appropriate safeguards.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">4. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes secure servers, encrypted data transmission, and restricted access to personal information.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">5. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We retain your personal information for as long as necessary to provide services and comply with legal obligations. Medical and safety information may be retained longer for liability and safety purposes.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">6. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  You have the right to access, update, or delete your personal information. You can withdraw consent for photo/video usage at any time. You may also request a copy of your data or object to certain processing activities.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">7. Cookies and Tracking</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Our website may use cookies to improve user experience and analyze website traffic. You can control cookie settings through your browser preferences. We do not use cookies for advertising purposes.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">8. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We take special care with information from participants under 18. Parental consent is required for all data collection from minors. We do not knowingly collect information from children without parental consent.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">9. Third-Party Services</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We may use third-party services for payment processing, email communications, and website analytics. These services have their own privacy policies, and we ensure they meet our privacy standards.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">10. International Transfers</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Your information is primarily processed in Egypt. If we need to transfer data internationally, we ensure appropriate safeguards are in place to protect your privacy rights.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">11. Policy Updates</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We may update this privacy policy from time to time. Changes will be posted on our website and communicated to participants. Continued use of our services constitutes acceptance of updated policies.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">12. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  For privacy-related questions or to exercise your rights, contact us at business@aph-sports.org or visit our facilities at New Cairo - Fifth Settlement. We will respond to all privacy inquiries within 30 days.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center mt-12">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 text-lg rounded-full">
              <Link to="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
