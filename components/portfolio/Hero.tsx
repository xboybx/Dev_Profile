'use client';

import { motion } from 'framer-motion';
import { Profile } from '@/lib/supabase';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  profile: Profile | null;
}

export function Hero({ profile }: HeroProps) {
  if (!profile) return null;

  const socialLinks = [
    { icon: Github, url: profile.github_url, label: 'GitHub' },
    { icon: Linkedin, url: profile.linkedin_url, label: 'LinkedIn' },
  ];

  return (
    <section className="min-h-screen flex items-center bg-[#111111] pt-24 lg:pt-0">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:pl-16 text-center md:text-left order-2 md:order-1"
          >
            <p className="text-lg text-gray-400 mb-2">Hi, my name is</p>
            <h1 className=" text-5xl md:text-7xl font-bold mb-4 ">
              {profile.full_name}
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-300 mb-6">
              I build things for the web.
            </h2>
            <p className="text-lg text-gray-400 max-w-lg mb-8 ">
              {profile.bio}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-6">
              {profile.resume_url && (
                <Link
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-300 bg-gradient-to-r from-black via-white to-black bg-200% bg-clip-text  text-transparent animate-gradient-loader [text-fill-color:transparent] [-webkit-text-fill-color:transparent][-webkit-background-clip:text]"
                >
                  Resume
                </Link>
              )}
              {socialLinks.map(
                ({ icon: Icon, url, label }) =>
                  url && (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon size={24} />
                    </a>
                  )
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center order-1 md:order-2"
          >
            {profile.avatar_url && (
              <div className="relative w-64 h-80 md:w-80 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent rounded-xl -z-10" />
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}