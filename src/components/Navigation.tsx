import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import companyLogo from "@/assets/company_logo2.png";

const smoothScroll = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b-2 border-gray-300 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img src={companyLogo} alt="APH Logo" className="h-20 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => smoothScroll('home')}
              className="text-gray-800 hover:text-gray-600 transition-all duration-300 font-bold text-lg"
            >
              Home
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-800 hover:text-gray-600 transition-all duration-300 font-bold text-lg">
                Our Club
                <ChevronDown className="ml-2 h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-2 border-gray-200 shadow-xl">
                <DropdownMenuItem onClick={() => smoothScroll('who-we-are')} className="text-gray-800 hover:bg-gray-50 font-semibold">
                  Mission & Vision
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-gray-800 hover:bg-gray-50 font-semibold">
                  <a href="mailto:business@aph-sports.org">Contact Us</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-800 hover:text-gray-600 transition-all duration-300 font-bold text-lg">
                Programs
                <ChevronDown className="ml-2 h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-2 border-gray-200 shadow-xl">
                <DropdownMenuItem onClick={() => smoothScroll('academies')} className="text-gray-800 hover:bg-gray-50 font-semibold">
                  Futures Under 10
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => smoothScroll('academies')} className="text-gray-800 hover:bg-gray-50 font-semibold">
                  Zone 1: U8 – U12
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => smoothScroll('academies')} className="text-gray-800 hover:bg-gray-50 font-semibold">
                  Zone 2: U13 – U14
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => smoothScroll('academies')} className="text-gray-800 hover:bg-gray-50 font-semibold">
                  Zone 3: U15 – U19
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button 
              onClick={() => smoothScroll('academies')}
              className="text-gray-800 hover:text-gray-600 transition-all duration-300 font-bold text-lg"
            >
              Camps
            </button>
            
            <button 
              onClick={() => smoothScroll('careers')}
              className="text-gray-800 hover:text-gray-600 transition-all duration-300 font-bold text-lg"
            >
              Careers
            </button>
            
            <button 
              onClick={() => smoothScroll('payment')}
              className="text-gray-800 hover:text-gray-600 transition-all duration-300 font-bold text-lg"
            >
              Payment
            </button>
            
            <button 
              onClick={() => smoothScroll('login')}
              className="text-gray-800 hover:text-gray-600 transition-all duration-300 font-bold text-lg"
            >
              Login
            </button>
            
            <button 
              onClick={() => smoothScroll('news')}
              className="text-gray-800 hover:text-gray-600 transition-all duration-300 font-bold text-lg"
            >
              News
            </button>

            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-full shadow-lg">
              <a href="mailto:business@aph-sports.org">Contact Us</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-gray-800 hover:bg-gray-50"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 bg-white border-t-2 border-gray-200">
            <div className="flex flex-col space-y-6">
              <button
                onClick={() => {
                  smoothScroll('home');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-800 hover:text-gray-600 transition-colors font-bold text-lg"
              >
                Home
              </button>
              <div className="px-4">
                <p className="text-sm font-bold text-gray-700 mb-3">Our Club</p>
                <button
                  onClick={() => {
                    smoothScroll('who-we-are');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:text-gray-600 transition-colors font-semibold"
                >
                  Mission & Vision
                </button>
                <a
                  href="mailto:business@aph-sports.org"
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:text-gray-600 transition-colors font-semibold"
                >
                  Contact Us
                </a>
              </div>
              <div className="px-4">
                <p className="text-sm font-bold text-gray-700 mb-3">Programs</p>
                <button
                  onClick={() => {
                    smoothScroll('academies');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:text-gray-600 transition-colors font-semibold"
                >
                  All Programs
                </button>
              </div>
              <button
                onClick={() => {
                  smoothScroll('academies');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-800 hover:text-gray-600 transition-colors font-bold text-lg"
              >
                Camps
              </button>
              <button
                onClick={() => {
                  smoothScroll('careers');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-800 hover:text-gray-600 transition-colors font-bold text-lg"
              >
                Careers
              </button>
              <button
                onClick={() => {
                  smoothScroll('payment');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-800 hover:text-gray-600 transition-colors font-bold text-lg"
              >
                Payment
              </button>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold w-full py-3 rounded-full shadow-lg">
                <a href="mailto:business@aph-sports.org">Contact Us</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
