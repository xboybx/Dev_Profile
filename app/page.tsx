'use client';

import { useEffect, useState } from 'react';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Projects } from '@/components/portfolio/Projects';
import { Experience } from '@/components/portfolio/Experience';
import { Contact } from '@/components/portfolio/Contact';
import { Profile, Skill, Project, Experience as ExperienceType } from '@/lib/supabase';
import { Toaster } from 'sonner';
import { motion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PortfolioPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(0);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest);
    });
  }, [scrollY]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes, experiencesRes] = await Promise.all([
          fetch('/api/profiles'),
          fetch('/api/skills'),
          fetch('/api/projects'),
          fetch('/api/experiences'),
        ]);

        const [profileData, skillsData, projectsData, experiencesData] = await Promise.all([
          profileRes.json(),
          skillsRes.json(),
          projectsRes.json(),
          experiencesRes.json(),
        ]);

        setProfile(Array.isArray(profileData) ? profileData[0] : profileData);
        setSkills(skillsData);
        setProjects(projectsData);
        setExperiences(experiencesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Work', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <p className="text-lg text-gray-300  bg-gradient-to-r from-black via-white to-black bg-200% bg-clip-text  text-transparent animate-gradient-loader [text-fill-color:transparent] [-webkit-text-fill-color:transparent][-webkit-background-clip:text]">
          Loading..
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <motion.nav
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled > 0 ? 'w-[90%] md:w-[600px] py-3' : 'w-full px-8 py-6'
        }`}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${Math.min(
            scrollY.get() / 1000,
            0.1
          )})`,
          backdropFilter: `blur(${Math.min(scrollY.get() / 100, 10)}px)`,
          borderRadius: `999px`,
        }}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold opacity-50 text-gray-500 tracking-widest cursor-pointer"
              onClick={() => scrollToSection('#home')}
            >
              {profile?.name?.toUpperCase() || 'JASWANTH'}
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name} 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium tracking-wide transition-colors text-gray-400 hover:text-white cursor-pointer nav-link"
                >
                  {item.name.toUpperCase()}
                </motion.button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
      </motion.nav>

        {mobileMenuOpen && (
          <motion.div
            initial={false}
            animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20 }}
            className={`fixed inset-0 z-[49] md:hidden ${
              mobileMenuOpen ? 'block' : 'hidden'
            }`}>
            <div className="absolute inset-0 bg-black/95 backdrop-blur-lg" />
            <div className="relative flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-2xl font-medium text-gray-400 hover:text-white transition-colors cursor-pointer nav-link-mobile"
                >
                  {item.name.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}

      <main>
        {profile && (
          <section id="home" className="mb-16 md:mb-24">
            <Hero profile={profile} />
          </section>
        )}
        {profile && skills.length > 0 ? (
          <section id="about">
            <About profile={profile} skills={skills} />
          </section>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400">No about information to display yet.</p>
          </div>
        )}
        {projects.length > 0 ? (
          <section id="projects">
            <Projects projects={projects} />
          </section>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400">No projects to display yet.</p>
          </div>
        )}
        {experiences.length > 0 ? (
          <section id="experience">
            <Experience experiences={experiences} />
          </section>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400">No experiences to display yet.</p>
          </div>
        )}
        <section id="contact">
          <Contact />
        </section>
      </main>

      <footer className="relative py-8 bg-[#111111] border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} {profile?.full_name || 'Portfolio'}. All rights reserved.
          </p>
        </div>
      </footer>

      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}