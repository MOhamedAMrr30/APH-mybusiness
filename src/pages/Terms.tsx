import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <FileText className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-5xl md:text-6xl font-black text-blue-900">
                Terms of Service
              </h1>
            </div>
            <p className="text-2xl text-blue-800 font-medium">
              Last updated: January 2025
            </p>
          </div>

          {/* Terms Content */}
          <Card className="shadow-2xl border-4 border-blue-100 bg-white">
            <CardContent className="p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  By accessing and using Active Performance Hub (APH) services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">2. Services Description</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  APH provides sports training services including but not limited to football, tennis, and kickboxing academies. We offer programs for various age groups from 5-19 years old, including summer camps and specialized training sessions.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">3. Enrollment and Registration</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  All participants must complete proper enrollment procedures including health assessments, emergency contact information, and payment of applicable fees. Enrollment is subject to availability and our approval.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">4. Payment Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Fees are due in advance of each training period. Refunds are subject to our refund policy. Late payments may result in suspension of services. All prices are subject to change with 30 days notice.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">5. Safety and Conduct</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Participants must follow all safety guidelines and conduct themselves appropriately. APH reserves the right to remove participants who pose safety risks or engage in inappropriate behavior. Proper sports attire and equipment are required.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">6. Liability and Insurance</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Participation in sports activities involves inherent risks. APH maintains appropriate insurance coverage. Participants and guardians acknowledge these risks and agree to hold APH harmless for injuries sustained during normal course of activities.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">7. Privacy and Data Protection</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We collect and process personal information in accordance with our Privacy Policy. We may use photos and videos for promotional purposes with appropriate consent. Personal information is protected and not shared with third parties without consent.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">8. Cancellation and Refunds</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Cancellations must be made in writing with 14 days notice for full refund. Partial refunds may apply for medical reasons with proper documentation. No refunds for missed sessions due to participant absence.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">9. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  All training materials, methodologies, and content are proprietary to APH. Participants may not reproduce, distribute, or use our materials for commercial purposes without written permission.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">10. Modifications</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  APH reserves the right to modify these terms at any time. Changes will be communicated to participants and will take effect immediately upon posting. Continued use of services constitutes acceptance of modified terms.
                </p>

                <h2 className="text-3xl font-bold text-blue-900 mb-6">11. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  For questions regarding these terms, please contact us at business@aph-sports.org or visit our facilities at New Cairo - Fifth Settlement.
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

export default Terms;
