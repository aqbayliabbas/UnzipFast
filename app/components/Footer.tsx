'use client';

import Link from 'next/link';
import { Box } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
              <Box className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              UnzipFast
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-sm text-gray-400" suppressHydrationWarning>
            {currentYear} UnzipFast.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
