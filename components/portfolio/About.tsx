'use client';

import { motion } from 'framer-motion';
import { Profile, Skill } from '@/lib/supabase';

interface AboutProps {
  profile: Profile;
  skills: Skill[];
}

function SkillTag({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="px-3 py-1 text-sm font-medium text-white bg-transparent border rounded-full"
      style={{
        borderColor: color,
        boxShadow: `0 0 8px ${color}`,
      }}
    >
      {name}
    </div>
  );
} 

export function About({ profile, skills }: AboutProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryColors: Record<string, string> = {
    'Frontend': '#FF5733',
    'Backend': '#33FFC7',
    'Database': '#33A1FF',
    'Tools': '#6EE7B7',
    'AI Tools': '#A133FF',
  };

  return (
    <section id="about" className=" bg-[#111111]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
        </motion.div>

        <div className="flex flex-col items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-7xl"
          >
            <div className="text-slate-400 text-lg leading-relaxed space-y-4">
              <p>
                I'm a forward-thinking software developer passionate about creating exceptional digital experiences. With expertise in modern web technologies, I specialize in building responsive and user-friendly applications.
              </p>
              <p>
                My journey in tech has led me to work on diverse projects, from user authentication systems to comprehensive student management platforms. I believe in writing clean, maintainable code and staying updated with the latest industry trends.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, and pursuing my passion for music creation.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full max-w-7xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Frontend</h3>
                  <div className="flex flex-wrap gap-3">
                    {(groupedSkills['Frontend'] || []).map((skill) => (
                      <SkillTag key={skill.id} name={skill.name} color={categoryColors['Frontend']} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Database</h3>
                  <div className="flex flex-wrap gap-3">
                    {(groupedSkills['Database'] || []).map((skill) => (
                      <SkillTag key={skill.id} name={skill.name} color={categoryColors['Database']} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">AI Tools</h3>
                  <div className="flex flex-wrap gap-3">
                    {(groupedSkills['AI Tools'] || []).map((skill) => (
                      <SkillTag key={skill.id} name={skill.name} color={categoryColors['AI Tools']} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Backend</h3>
                  <div className="flex flex-wrap gap-3">
                    {(groupedSkills['Backend'] || []).map((skill) => (
                      <SkillTag key={skill.id} name={skill.name} color={categoryColors['Backend']} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Tools</h3>
                  <div className="flex flex-wrap gap-3">
                    {(groupedSkills['Tools'] || []).map((skill) => (
                      <SkillTag key={skill.id} name={skill.name} color={categoryColors['Tools']} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}