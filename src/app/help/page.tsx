'use client';

import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  Book,
  Video,
  FileText,
  Users,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  Shield,
  CreditCard
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer: "Browse our course catalog, click on any course that interests you, and click the 'Enroll Now' button. You'll be automatically enrolled and can start learning immediately."
  },
  {
    question: "Can I access courses on mobile devices?",
    answer: "Yes! Our platform is fully responsive and works great on smartphones and tablets. You can also download our mobile app for the best experience."
  },
  {
    question: "How do I track my progress?",
    answer: "Visit your Progress page to see detailed analytics about your learning journey, including completed courses, study hours, and upcoming goals."
  },
  {
    question: "What if I need to reset my password?",
    answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a secure link to reset your password."
  },
  {
    question: "Can I get a certificate upon completion?",
    answer: "Yes! After completing all required assignments and lectures in a course, you'll automatically receive a certificate that you can download and share."
  },
  {
    question: "How do I contact my instructor?",
    answer: "Use the discussion forums within each course, or send a direct message through the course interface. Instructors typically respond within 24 hours."
  },
  {
    question: "Is there a refund policy?",
    answer: "We offer a 30-day money-back guarantee for all courses. If you're not satisfied, contact our support team for a full refund."
  },
  {
    question: "How do I update my profile information?",
    answer: "Go to Settings > Profile Information to update your name, email, bio, and other personal details."
  }
];

const quickGuides = [
  {
    title: "Getting Started",
    description: "Learn the basics of using our platform",
    icon: Book,
    articles: ["Creating your account", "Navigating the dashboard", "Enrolling in courses"]
  },
  {
    title: "Course Management",
    description: "How to manage your enrolled courses",
    icon: Video,
    articles: ["Watching lectures", "Submitting assignments", "Tracking progress"]
  },
  {
    title: "Account & Settings",
    description: "Manage your account preferences",
    icon: Shield,
    articles: ["Updating profile", "Notification settings", "Privacy controls"]
  }
];

const supportChannels = [
  {
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    availability: "Available 24/7",
    action: "Start Chat"
  },
  {
    title: "Email Support",
    description: "Send us a detailed message",
    icon: Mail,
    availability: "Response within 24 hours",
    action: "Send Email"
  },
  {
    title: "Phone Support",
    description: "Speak directly with our team",
    icon: Phone,
    availability: "Mon-Fri, 9AM-6PM PST",
    action: "Call Now"
  },
  {
    title: "Community Forum",
    description: "Get help from other learners",
    icon: Users,
    availability: "Always available",
    action: "Visit Forum"
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions, access our knowledge base, and get in touch with our support team.
          </p>
        </div>

        {/* Search */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredFaqs.length === 0 && searchQuery && (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No results found for &quot;{searchQuery}&quot;. Try different keywords or contact support.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Guides */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Start Guides</CardTitle>
                <CardDescription>
                  Step-by-step tutorials to help you get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickGuides.map((guide, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <guide.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{guide.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {guide.description}
                            </p>
                            <div className="space-y-1">
                              {guide.articles.map((article, articleIndex) => (
                                <div key={articleIndex} className="flex items-center text-sm text-muted-foreground hover:text-primary cursor-pointer">
                                  <ChevronRight className="h-3 w-3 mr-1" />
                                  {article}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportChannels.map((channel, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <channel.icon className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{channel.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {channel.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {channel.availability}
                      </Badge>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                      {channel.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm hover:text-primary cursor-pointer">
                    <FileText className="h-4 w-4" />
                    <span>Course Enrollment Guide</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm hover:text-primary cursor-pointer">
                    <Video className="h-4 w-4" />
                    <span>Video Playback Issues</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm hover:text-primary cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment & Billing</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm hover:text-primary cursor-pointer">
                    <Shield className="h-4 w-4" />
                    <span>Account Security</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm hover:text-primary cursor-pointer">
                    <Lightbulb className="h-4 w-4" />
                    <span>Troubleshooting Tips</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Platform</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Video Streaming</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Assignments</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Certificates</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Live Chat
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
