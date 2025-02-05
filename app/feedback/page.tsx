'use client';

import { Box, Menu, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "This is exactly what I needed! No more installing sketchy ZIP programs. It's fast, simple, and works perfectly every time.",
    name: "Alex Thompson"
  },
  {
    id: 2,
    rating: 5,
    text: "As a web developer, I love how I can quickly peek inside ZIP files before extracting them. The interface is clean and intuitive.",
    name: "Sarah Chen"
  },
  {
    id: 3,
    rating: 4,
    text: "Super convenient for checking ZIP contents on the go. Works great on my phone and tablet too!",
    name: "Michael Rodriguez"
  },
  {
    id: 4,
    rating: 5,
    text: "Finally, a ZIP viewer that doesn't require installation! The preview feature is a game-changer for security-conscious users.",
    name: "Emma Wilson"
  },
  {
    id: 5,
    rating: 5,
    text: "Incredibly fast and reliable. I use it daily for my work, and it hasn't failed me once. The UI is beautiful too!",
    name: "David Park"
  },
  {
    id: 6,
    rating: 5,
    text: "The best online ZIP file viewer I've found. Clean interface, fast processing, and secure. What more could you ask for?",
    name: "Lisa Anderson"
  },
  {
    id: 7,
    rating: 4,
    text: "Great tool for quick ZIP checks. Love how it shows the file structure before extraction. Very useful!",
    name: "James Mitchell"
  },
  {
    id: 8,
    rating: 5,
    text: "Perfect solution for my team. We can easily share and verify ZIP contents without any software installation.",
    name: "Nina Patel"
  }
];

export default function Feedback() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render content after client-side hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-50/50 via-white to-white flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50/50 via-white to-white">
      {/* Navigation */}
      <motion.nav 
        className="fixed w-full top-0 z-50" 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        suppressHydrationWarning
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border-b border-white/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a href="/" className="flex items-center space-x-2 group">
                <div className="p-1.5 rounded-lg bg-brand-600/10 group-hover:bg-brand-600/20 transition-colors">
                  <Box className="h-6 w-6 text-brand-600" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-500">
                  UnzipFast
                </span>
              </a>
            </motion.div>

            <div className="hidden md:flex md:items-center md:space-x-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a href="/feedback" className="text-sm font-medium text-brand-600 transition-colors">
                  Feedback
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a href="/pricing" className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
                  Pricing
                </a>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 transition-all duration-200 shadow-lg shadow-brand-600/20 hover:shadow-brand-600/40"
              >
                Sign In
              </motion.button>
            </div>

            <motion.div 
              className="flex md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-brand-600 hover:bg-white/50 transition-all"
              >
                <Menu className="h-6 w-6" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Add padding to account for fixed navbar */}
      <div className="h-16"></div>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              What Our Users Say
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Don't just take our word for it. Here's what the community thinks about UnzipFast.
            </p>
          </motion.div>

          {/* Pinterest-style grid */}
          <motion.div 
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance] box-border mx-auto"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeIn}
                className="break-inside-avoid mb-6 bg-white rounded-xl p-6 shadow-lg shadow-brand-600/5 hover:shadow-xl hover:shadow-brand-600/10 transition-shadow border border-brand-100/20 backdrop-blur-sm bg-white/60"
              >
                {/* Rating */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-brand-500 fill-brand-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {testimonial.text}
                </p>

                {/* User Name */}
                <p className="text-sm font-medium text-gray-900">
                  {testimonial.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
