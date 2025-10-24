import { Mail, MapPin, Instagram, Facebook, ArrowRight } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import companyLogo from "@/assets/company_logo2.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
              <div className="md:col-span-1">
                <img src={companyLogo} alt="APH Logo" className="h-32 w-auto mb-8" />
                <p className="text-blue-100 text-lg leading-relaxed mb-8 font-medium">
              Elevating athletic excellence through world-class sports academies and innovative training programs.
            </p>
            <div className="flex gap-6">
              <a 
                href="https://www.instagram.com/activeperformancehub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors p-3 bg-blue-800/50 rounded-full hover:bg-blue-700"
                aria-label="Instagram"
              >
                <Instagram className="h-7 w-7" />
              </a>
              <a 
                href="https://www.tiktok.com/@activeperformancehub_aph" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors p-3 bg-blue-800/50 rounded-full hover:bg-blue-700"
                aria-label="TikTok"
              >
                <FaTiktok className="h-7 w-7" />
              </a>
              <a 
                href="https://www.facebook.com/share/17Rmrcasx8/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors p-3 bg-blue-800/50 rounded-full hover:bg-blue-700"
                aria-label="Facebook"
              >
                <Facebook className="h-7 w-7" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-2xl font-black mb-8 text-white">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="#academies">Futures Under 10</a>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="#academies">Zone 1: U8 – U12</a>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="#academies">Zone 2: U13 – U14</a>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="#academies">Zone 3: U15 – U19</a>
                </Button>
              </li>
            </ul>
          </div>

          {/* Our Club */}
          <div>
            <h3 className="text-2xl font-black mb-8 text-white">Our Club</h3>
            <ul className="space-y-3">
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="#who-we-are">Mission & Vision</a>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="mailto:business@aph-sports.org">Contact Us</a>
                </Button>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-2xl font-black mb-8 text-white">Information</h3>
            <ul className="space-y-3">
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="#academies">Camps</a>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="#careers">Careers</a>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="#payment">Payment</a>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  asChild
                  className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-800/50 text-lg font-semibold p-3 rounded-lg transition-all duration-300"
                >
                  <a href="#news">News</a>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-16 border-2 border-white/20">
          <div className="text-center">
            <h3 className="text-4xl font-black mb-8 text-white">come to play</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-8">
              <div className="flex items-center text-blue-100">
                <Mail className="h-8 w-8 mr-4 text-blue-300" />
                <a href="mailto:business@aph-sports.org" className="hover:text-white transition-colors text-xl font-semibold">
                  business@aph-sports.org
                </a>
              </div>
              <div className="flex items-center text-blue-100">
                <MapPin className="h-8 w-8 mr-4 text-blue-300" />
                <span className="text-xl font-semibold">New Cairo – Fifth Settlement</span>
              </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-4 text-lg rounded-full shadow-lg">
              <a href="mailto:business@aph-sports.org">
                Contact Us
                <ArrowRight className="ml-3 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t-2 border-white/20 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-lg mb-6 md:mb-0 font-semibold">
              © 2025 Active Performance Hub. All Rights Reserved
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="ghost" 
                asChild
                className="text-blue-200 hover:text-white hover:bg-blue-800/50 text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300"
              >
                <a href="/privacy">Privacy</a>
              </Button>
              <Button 
                variant="ghost" 
                asChild
                className="text-blue-200 hover:text-white hover:bg-blue-800/50 text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300"
              >
                <a href="/terms">Terms</a>
              </Button>
              <Button 
                variant="ghost" 
                asChild
                className="text-blue-200 hover:text-white hover:bg-blue-800/50 text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300"
              >
                <a href="/faqs">FAQs</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
