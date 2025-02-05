'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileIcon, UploadCloud, Zap, Shield, Eye, Box, Menu, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState<Array<{ name: string; path: string; size: number }>>([]);
  const [uploading, setUploading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
    },
    multiple: false
  });

  // Only render content after client-side hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-50/50 via-white to-white flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning />
      </div>
    );
  }

  const handleDownload = async (filePath: string) => {
    try {
      const response = await fetch(`/api/download?path=${encodeURIComponent(filePath)}`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file');
    }
  };

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

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="relative md:hidden border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-white/40 backdrop-blur-xl" />
              <div className="relative px-2 pt-2 pb-3 space-y-1">
                <a href="/feedback" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-white/50 transition-all">
                  Feedback
                </a>
                <a href="/pricing" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-white/50 transition-all">
                  Pricing
                </a>
                <div className="px-3 py-2">
                  <a href="/signin" className="block px-4 py-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 transition-all duration-200 text-center shadow-lg shadow-brand-600/20 hover:shadow-brand-600/40">
                    Sign In
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Add padding to account for fixed navbar */}
      <div className="h-16"></div>

      {/* Hero Section with App */}
      <div className="relative overflow-hidden bg-brand-50/30 pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-50/20 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-16 pb-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-brand-100/80 text-brand-600 text-sm font-medium backdrop-blur-sm">
              Simple & Fast ZIP File Viewer
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              View & Extract ZIP Files
              <br />
              <span className="text-3xl sm:text-5xl mt-2 block">Without Installing Anything</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Stop downloading ZIP opener apps. Simply drag & drop your files here and instantly access their contents. 
              Free, fast, and works on any device.
            </p>
          </div>

          {/* App Section */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={fadeIn}
              className="max-w-xl mx-auto"
            >
              <div
                {...getRootProps()}
                className={`p-8 border-2 border-dashed rounded-xl bg-white/60 backdrop-blur-sm transition-all ${
                  isDragActive
                    ? 'border-brand-500 bg-brand-50/50'
                    : 'border-gray-300 hover:border-brand-500'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-3 mb-4 rounded-full bg-brand-100">
                    <UploadCloud className="h-6 w-6 text-brand-600" />
                  </div>
                  <p className="text-gray-600 mb-2">
                    {isDragActive
                      ? 'Drop your ZIP file here...'
                      : 'Drag & drop your ZIP file here, or click to select'}
                  </p>
                  <p className="text-sm text-gray-500">Only ZIP files are supported</p>
                </div>
              </div>
            </motion.div>

            {/* File List */}
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 max-w-xl mx-auto"
                >
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg shadow-brand-600/5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Files in ZIP</h2>
                    <motion.ul 
                      className="space-y-2"
                      variants={stagger}
                      initial="initial"
                      animate="animate"
                    >
                      {files.map((file, index) => (
                        <motion.li
                          key={file.path}
                          variants={fadeIn}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-white/60 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <FileIcon className="h-5 w-5 text-brand-600" />
                            <span className="text-gray-700">{file.name}</span>
                          </div>
                          <button
                            onClick={() => handleDownload(file.path)}
                            className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                          >
                            Download
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16"
            variants={fadeIn}
          >
            Peek Inside ZIP Files with Confidence
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              variants={fadeIn}
              className="bg-brand-50/50 p-8 rounded-2xl"
            >
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Know What's Inside
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Never download mystery contents again. Preview every file name, size, 
                and structure before extraction. Your safety comes first.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="bg-brand-50/50 p-8 rounded-2xl"
            >
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant File Preview
              </h3>
              <p className="text-gray-600 leading-relaxed">
                See what's in your ZIP files in milliseconds. No waiting, no 
                downloading, no hassle. Just instant clarity about your files.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="bg-brand-50/50 p-8 rounded-2xl"
            >
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lightning Fast Access
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Skip the software downloads. Access your ZIP files instantly from any 
                device. Browser-based speed that feels like magic.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <motion.section 
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-brand-50/30"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              variants={fadeIn}
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              One plan, one payment, lifetime access. No subscriptions, no hidden fees.
              Get started today and unlock all premium features forever.
            </motion.p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-lg mx-auto">
            <motion.div 
              className="relative bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-brand-600/10 border border-brand-100/20 overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
              variants={fadeIn}
            >
              {/* Special Offer Banner */}
              <div className="absolute top-5 right-5">
                <div className="bg-brand-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-lg shadow-brand-600/20 flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Limited Time Offer
                </div>
              </div>

              <div className="p-8">
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  variants={fadeIn}
                >
                  Lifetime Access
                </motion.h3>

                {/* Price */}
                <motion.div 
                  className="flex items-baseline mb-6"
                  variants={fadeIn}
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
                  variants={fadeIn}
                >
                  Get Lifetime Access
                </motion.button>

                {/* Money Back Guarantee */}
                <motion.p 
                  className="text-center text-sm text-gray-600 mt-4"
                  variants={fadeIn}
                >
                  30-day money-back guarantee. No questions asked.
                </motion.p>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="mt-8 text-center space-y-2"
              variants={fadeIn}
            >
              <p className="text-sm font-medium text-gray-700">Secure payment via Stripe</p>
              <p className="text-sm text-gray-600">
                Join thousands of happy users who trust UnzipFast
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
