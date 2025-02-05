'use client';

import { Box, Menu, Check } from 'lucide-react';
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

const features = [
  "Unlimited ZIP file extractions",
  "No file size limits",
  "Priority support",
  "Ad-free experience",
  "Early access to new features",
  "Faster processing speed",
  "Advanced file preview",
  "Batch processing"
];

export default function Pricing() {
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
                <a href="/feedback" className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
                  Feedback
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a href="/pricing" className="text-sm font-medium text-brand-600 transition-colors">
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

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              One plan, one payment, lifetime access. No subscriptions, no hidden fees.
              Get started today and unlock all premium features forever.
            </p>
          </motion.div>

          {/* Pricing Card */}
          <div className="max-w-lg mx-auto">
            <motion.div
              className="relative bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-brand-600/10 border border-brand-100/20 overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Special Offer Banner */}
              <motion.div 
                className="absolute top-5 right-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-brand-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-lg shadow-brand-600/20 flex items-center gap-1">
                  <span>Limited Time Offer</span>
                </div>
              </motion.div>

              <div className="p-8">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Lifetime Access
                </motion.h3>

                {/* Price */}
                <motion.div 
                  className="flex items-baseline mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="text-5xl font-bold text-brand-600">$5</span>
                  <span className="text-gray-500 ml-2 text-lg">one-time payment</span>
                </motion.div>

                {/* Features */}
                <motion.ul 
                  className="space-y-4 mb-8"
                  variants={stagger}
                  initial="initial"
                  animate="animate"
                >
                  {features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      variants={fadeIn}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-brand-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA Button */}
                <motion.button
                  className="w-full py-4 px-8 rounded-xl text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 transition-all duration-200 shadow-lg shadow-brand-600/20 hover:shadow-brand-600/40 font-medium text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Lifetime Access
                </motion.button>

                {/* Money Back Guarantee */}
                <motion.p 
                  className="text-center text-sm text-gray-600 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  30-day money-back guarantee. No questions asked.
                </motion.p>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="mt-8 text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <p className="text-sm font-medium text-gray-700">Secure payment via Stripe</p>
              <p className="text-sm text-gray-600">
                Join thousands of happy users who trust UnzipFast
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
