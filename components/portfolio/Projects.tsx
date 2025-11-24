'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="projects" className="relative py-20 overflow-hidden bg-[#111111]">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Projects
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="h-full"
            >
              <Card className="h-full bg-gray-800/20 border border-gray-700/50 rounded-2xl">
                <CardContent className="p-4">
                  <div
                    className="flex justify-between items-center cursor-pointer md:cursor-default"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                    </div>
                    <div className="md:hidden ml-4">
                      {openIndex === index ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {(openIndex === index ||
                      (isClient && window.innerWidth >= 768)) && (
                      <motion.div
                        key={project.id}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          marginTop: '1rem',
                        }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        {project.image_url && (
                          <div className="relative aspect-video overflow-hidden mb-4 rounded-lg">
                            <img
                              src={project.image_url}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <p className="text-gray-400 text-sm mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-gray-800 text-gray-300"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:underline flex items-center gap-1 text-sm"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Live Demo
                            </a>
                          )}
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:underline flex items-center gap-1 text-sm"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              GitHub
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}