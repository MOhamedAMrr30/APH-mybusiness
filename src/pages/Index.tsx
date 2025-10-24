import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import Academies from "@/components/Academies";
import Careers from "@/components/Careers";
import Payment from "@/components/Payment";
import LoginForm from "@/components/LoginForm";
import AdminDashboard from "@/components/AdminDashboard";
import News from "@/components/News";
import Footer from "@/components/Footer";
import VideoIntro from "@/components/VideoIntro";
import TunnelBackground from "@/components/TunnelBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <TunnelBackground />
      <VideoIntro />
      <Navigation />
      <main>
        <Hero />
        <WhoWeAre />
        <Academies />
        <Careers />
        <Payment />
        <LoginForm />
        <AdminDashboard />
        <News />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
