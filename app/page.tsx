import { supabaseAdmin } from '@/lib/supabase-server';
import { PortfolioClient } from '@/components/portfolio/PortfolioClient';

export const revalidate = 0; // Ensures data is always fresh

export default async function PortfolioPage() {
  const [profileRes, skillsRes, projectsRes, experiencesRes] = await Promise.all([
    supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabaseAdmin.from('skills').select('*').order('order_index', { ascending: true }),
    supabaseAdmin.from('projects').select('*').order('order_index', { ascending: true }),
    supabaseAdmin.from('experiences').select('*').order('order_index', { ascending: true }),
  ]);

  const profile = profileRes.data || null;
  const skills = skillsRes.data || [];
  const projects = projectsRes.data || [];
  const experiences = experiencesRes.data || [];

  return (
    <PortfolioClient
      profile={profile}
      skills={skills}
      projects={projects}
      experiences={experiences}
    />
  );
}