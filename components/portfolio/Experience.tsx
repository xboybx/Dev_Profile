'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience as ExperienceType } from '@/lib/supabase';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" className="relative py-20 overflow-hidden bg-[#111111]">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My Experience
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 bg-gray-800/20 border border-gray-700/50 rounded-2xl"
            >
              <div 
                className="flex justify-between items-center cursor-pointer md:cursor-default"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {experience.position} at {experience.company}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
                  </p>
                </div>
                <div className="md:hidden ml-4">
                  {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              <AnimatePresence>
                {(openIndex === index || (isClient && window.innerWidth >= 768)) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      {experience.description.split('\n').map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}