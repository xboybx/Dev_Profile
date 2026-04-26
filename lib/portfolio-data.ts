import { supabaseAdmin } from '@/lib/supabase-server';
import { Profile, Skill, Project, Experience } from '@/lib/supabase';

export async function getPortfolioData() {
    try {
        const [profileData, skillsData, projectsData, experiencesData] = await Promise.all([
            supabaseAdmin
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle(),

            supabaseAdmin
                .from('skills')
                .select('*')
                .order('order_index', { ascending: true }),

            supabaseAdmin
                .from('projects')
                .select('*')
                .order('order_index', { ascending: true }),

            supabaseAdmin
                .from('experiences')
                .select('*')
                .order('order_index', { ascending: true }),
        ]);

        return {
            profile: profileData.data,
            skills: skillsData.data || [],
            projects: projectsData.data || [],
            experiences: experiencesData.data || [],
        };
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        return {
            profile: null,
            skills: [],
            projects: [],
            experiences: [],
        };
    }
}