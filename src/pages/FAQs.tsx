import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FAQs = () => {
  const faqs = [
    {
      question: "What age groups do you accept?",
      answer: "We accept students from ages 5-19, organized into different programs: Futures Under 10 (ages 5-9), Zone 1: U8-U12 (ages 8-12), Zone 2: U13-U14 (ages 13-14), and Zone 3: U15-U19 (ages 15-19)."
    },
    {
      question: "What sports academies do you offer?",
      answer: "We currently offer three main academies: Northline Football Academy, Strike Tennis Academy, and Überkraft Kickboxing Akademie. Each academy provides specialized training with professional coaches."
    },
    {
      question: "What are your training schedules?",
      answer: "Training schedules vary by academy and age group. We offer flexible scheduling including weekday evenings and weekend sessions. Specific schedules are provided upon enrollment."
    },
    {
      question: "Do you offer summer camps?",
      answer: "Yes! We offer comprehensive summer camps including intensive training programs, school break camps, and specialized swim camps. These camps provide focused development opportunities during vacation periods."
    },
    {
      question: "What is the enrollment process?",
      answer: "To enroll, you can contact us through our website, email business@aph-sports.org, or visit our facilities. We'll schedule an assessment and provide you with all necessary enrollment information."
    },
    {
      question: "What facilities do you have?",
      answer: "Our facilities include modern training courts, professional-grade equipment, changing rooms, and dedicated spaces for each sport. We're located in New Cairo - Fifth Settlement with easy access and parking."
    },
    {
      question: "Do you provide equipment?",
      answer: "Basic equipment is provided for training sessions, but students are encouraged to bring their own gear for optimal performance. We can provide guidance on recommended equipment for each sport."
    },
    {
      question: "What makes APH different from other sports academies?",
      answer: "APH focuses on holistic development, combining technical skills with mental health support, leadership training, and character building. We're not just teaching sports - we're developing champions for life."
    },
    {
      question: "How do I contact you for more information?",
      answer: "You can reach us at business@aph-sports.org, visit our website, or come to our facilities in New Cairo - Fifth Settlement. We're always happy to answer questions and provide detailed information about our programs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <HelpCircle className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-5xl md:text-6xl font-black text-blue-900">
                FAQs
              </h1>
            </div>
            <p className="text-2xl text-blue-800 font-medium">
              Frequently Asked Questions
            </p>
          </div>

          {/* FAQs */}
          <Card className="shadow-2xl border-4 border-blue-100 bg-white">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left text-lg font-bold text-blue-900 hover:text-blue-700 py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-lg leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl border-4 border-blue-200">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-6">Still Have Questions?</h3>
                <p className="text-xl mb-8 leading-relaxed">
                  Can't find the answer you're looking for? We're here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-full">
                    Contact Us
                  </Button>
                  <Button asChild className="bg-transparent border-3 border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 text-lg rounded-full">
                    <a href="mailto:business@aph-sports.org">Email Us</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

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

export default FAQs;
