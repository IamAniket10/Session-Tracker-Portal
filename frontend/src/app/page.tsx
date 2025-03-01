'use client'

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useInView, useAnimation } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  Brain,
  Heart,
  Users,
  Shield,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  //const { theme } = useTheme();

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const testimonialsInView = useInView(testimonialsRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  useEffect(() => {
    if (featuresInView) {
      controls.start('visible');
    }
  }, [controls, featuresInView]);

  const features = [
    {
      title: 'Session Management',
      description: 'Track therapy sessions, manage schedules, and monitor progress over time.',
      icon: <Calendar className="h-10 w-10 text-brand-600 dark:text-brand-500" />
    },
    {
      title: 'Homework Tracking',
      description: 'Assign and monitor homework tasks with due dates, reminders, and completion status.',
      icon: <BookOpen className="h-10 w-10 text-brand-600 dark:text-brand-500" />
    },
    {
      title: 'Progress Analytics',
      description: 'Visualize client progress with detailed analytics and reports.',
      icon: <CheckCircle className="h-10 w-10 text-brand-600 dark:text-brand-500" />
    },
    {
      title: 'Time Management',
      description: 'Efficiently manage time with scheduling tools and reminders.',
      icon: <Clock className="h-10 w-10 text-brand-600 dark:text-brand-500" />
    }
  ];

  const testimonials = [
    {
      quote: "This platform has transformed how I manage my therapy practice. The session tracking and homework features save me hours every week.",
      author: "Dr. Sarah Johnson",
      role: "Clinical Psychologist"
    },
    {
      quote: "The interactive dashboard gives me a clear overview of my progress. It keeps me accountable between sessions.",
      author: "Michael Thompson",
      role: "Client"
    },
    {
      quote: "As a practice manager, this system makes tracking multiple therapists and clients seamless. The reporting features are exceptional.",
      author: "Rebecca Martinez",
      role: "Practice Manager"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Animated progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-600 dark:bg-brand-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-brand-600 dark:text-brand-500" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">Mental Health Matters Inc.</span>
            </a>

            {/* Mobile menu button and theme toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                className="focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-900 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-900 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Testimonials</a>
              <a href="#about" className="text-gray-900 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">About Us</a>
              <ThemeToggle />
              <a href="/login">
                <Button variant="outline" className="border-brand-600 dark:border-brand-500 text-brand-600 dark:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/50">
                  Log in
                </Button>
              </a>
              <a href="/signup">
                <Button className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white">
                  Sign up
                </Button>
              </a>
            </nav>
          </div>

          {/* Mobile navigation */}
          {isOpen && (
            <motion.nav
              className="md:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="px-2 py-1 text-gray-900 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Features</a>
                <a href="#testimonials" className="px-2 py-1 text-gray-900 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">Testimonials</a>
                <a href="#about" className="px-2 py-1 text-gray-900 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors">About Us</a>
                <a href="/login">
                  <Button variant="outline" className="w-full border-brand-600 dark:border-brand-500 text-brand-600 dark:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/50">
                    Log in
                  </Button>
                </a>
                <a href="/signup">
                  <Button className="w-full bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white">
                    Sign up
                  </Button>
                </a>
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800/80 -z-10 transition-all duration-300"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div
                className="w-full md:w-1/2 mb-10 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Empowering Mental Health Professionals and Clients
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Streamline your practice with our comprehensive platform for session management,
                  homework tracking, and progress monitoring.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/signup">
                    <Button size="lg" className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a href="#features">
                    <Button size="lg" variant="outline" className="border-gray-300 dark:border-gray-700 dark:text-gray-300">
                      Learn More <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative">
                  <motion.div 
                    className="relative rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="dashboard.jpg"
                      alt="Platform Dashboard"
                      className="w-full rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-medium">Interactive Dashboard</p>
                      <p className="text-sm opacity-75">Track progress at a glance</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-100 dark:border-gray-700"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="font-medium text-sm dark:text-white">Tasks Completed</p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Today: 5/8</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold text-brand-600 dark:text-brand-500">500+</p>
                <p className="text-gray-600 dark:text-gray-400">Providers</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold text-brand-600 dark:text-brand-500">15,000+</p>
                <p className="text-gray-600 dark:text-gray-400">Clients</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold text-brand-600 dark:text-brand-500">98%</p>
                <p className="text-gray-600 dark:text-gray-400">Satisfaction</p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold text-brand-600 dark:text-brand-500">30%</p>
                <p className="text-gray-600 dark:text-gray-400">Time Saved</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title">
                Powerful Features for Mental Health Professionals
              </h2>
              <p className="section-subtitle">
                Our comprehensive platform is designed to streamline your practice and enhance client outcomes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="feature-icon-bg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Preview Section */}
        <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Interactive Session Management
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Our intuitive interface makes it easy to track sessions, monitor client progress,
                  and manage homework assignments all in one place.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="dark:text-gray-300">Create and manage custom session templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="dark:text-gray-300">Track progress with interactive dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="dark:text-gray-300">Assign and monitor homework completion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="dark:text-gray-300">Set reminders and due dates for tasks</span>
                  </li>
                </ul>
                <a href="/sessions">
                  <Button className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white">
                    Explore Sessions <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </motion.div>

              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
                  <img
                    src="/Session.png"
                    alt="Session Management Interface"
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <p className="font-semibold text-lg">Session Management</p>
                      <p className="text-sm opacity-90">Interactive accordion interface for easy navigation</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-24 flex flex-col-reverse lg:flex-row items-center gap-12">
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
                  <img
                    src="/Homework.png"
                    alt="Homework Tracking Interface"
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <p className="font-semibold text-lg">Homework Management</p>
                      <p className="text-sm opacity-90">Task tracking with status indicators</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Comprehensive Homework Tracking
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Assign, track, and manage homework tasks with due dates, status updates, and reminders.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="dark:text-gray-300">Create tasks linked to specific sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="dark:text-gray-300">Track status (To-Do, In Progress, Done)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="dark:text-gray-300">Receive notifications for upcoming deadlines</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="dark:text-gray-300">Monitor completion rates and progress</span>
                  </li>
                </ul>
                <a href="/homework">
                  <Button className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white">
                    Explore Homework <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" ref={testimonialsRef} className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title">
                What Our Users Say
              </h2>
              <p className="section-subtitle">
                Hear from mental health professionals and clients who have transformed their practice with our platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 ">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  className="testimonial-card dark:bg-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mb-4 text-brand-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-2xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="bg-brand-100 dark:bg-brand-900 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-brand-600 dark:text-brand-400 font-bold">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold dark:text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  About Mental Health Matters Inc.
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  We are dedicated to providing innovative tools that support mental health professionals
                  and improve client outcomes. Our platform is built by a team who understands the unique
                  challenges of mental health practice.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Our mission is to make mental healthcare more accessible, efficient, and effective through
                  thoughtfully designed technology solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 dark:text-gray-300">
                  <div className="flex items-center">
                    <Users className="h-6 w-6 text-brand-600 dark:text-brand-500 mr-2" />
                    <span>Team of Experts</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-6 w-6 text-brand-600 dark:text-brand-500 mr-2" />
                    <span>Client-Centered</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-brand-600 dark:text-brand-500 mr-2" />
                    <span>HIPAA Compliant</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img
                    src="/team.jpg"
                    alt="Our Team"
                    className="w-full rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-lg">Our Team</p>
                    <p className="text-sm">Committed to make people lives Better</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-16 bg-gradient-to-r from-brand-600 to-brand-700 dark:from-brand-400 dark:to-brand-600 text-white transition-all duration-300">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of mental health professionals who have enhanced their practice and client outcomes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/signup">
                  <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100 dark:hover:bg-gray-200">
                    Get Started Free
                  </Button>
                </a>
                <a href="/contact">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    Contact Sales
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-brand-500" />
                <span className="font-bold text-lg">Mental Health Matters Inc.</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering mental health professionals with innovative tools for better practice management.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.093 4.093 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-brand-500 transition-colors">Features</a></li>
                <li><a href="/sessions" className="text-gray-400 hover:text-brand-500 transition-colors">Sessions</a></li>
                <li><a href="/homework" className="text-gray-400 hover:text-brand-500 transition-colors">Homework</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-brand-500 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">Data Processing</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Mental Health Matters Inc. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-brand-500 text-sm transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-brand-500 text-sm transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-brand-500 text-sm transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-brand-600 dark:bg-brand-500 text-white p-3 rounded-full shadow-lg z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: scrollYProgress.get() > 0.2 ? 1 : 0, y: scrollYProgress.get() > 0.2 ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </motion.button>
    </div>
  );
};