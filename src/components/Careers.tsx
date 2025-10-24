import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Clock, Users, Star } from "lucide-react";

const Careers = () => {
  return (
    <section id="careers" className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-blue-900">
              Careers
            </h2>
            <p className="text-2xl text-blue-800 max-w-4xl mx-auto font-medium">
              Join our team and be part of the future of sports excellence
            </p>
          </div>

          {/* Wait for Opportunities Message */}
          <div className="bg-white rounded-3xl p-12 md:p-16 text-center shadow-2xl border-4 border-blue-100 mb-16">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Clock className="h-12 w-12 text-white" />
              </div>
            </div>
            <h3 className="text-4xl font-black mb-8 text-blue-900">
              Wait for New Opportunities
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              We're currently building our team and will be announcing exciting career opportunities soon. 
              Stay tuned for positions in coaching, administration, and sports development.
            </p>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg">
              Coming Soon
            </Badge>
          </div>

          {/* Future Opportunities Preview */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 border-white bg-white">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Coaching Positions</h3>
                <p className="text-gray-700 text-lg leading-relaxed">Expert coaches for all sports disciplines</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 border-white bg-white">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Briefcase className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Administrative Roles</h3>
                <p className="text-gray-700 text-lg leading-relaxed">Support our growing organization</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 border-white bg-white">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Sports Development</h3>
                <p className="text-gray-700 text-lg leading-relaxed">Shape the future of athletic training</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact for Future Opportunities */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
            <h3 className="text-4xl font-black mb-8">
              Interested in Joining Our Team?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Send us your information and we'll notify you when positions become available
            </p>
            <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-4 text-lg rounded-full shadow-lg">
              <a href="mailto:business@aph-sports.org?subject=Career Interest">
                Express Interest
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;

