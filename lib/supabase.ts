import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  bio: string;
  avatar_url: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  resume_url: string;
  created_at: string;
  updated_at: string;
};
export type Skill = {
  id: number;
  name: string;
  category: string;
  icon: string;
  order_index: number;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  long_description: string;
  image_url: string;
  demo_url: string;
  github_url: string;
  technologies: string[];
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string | null;
  location: string;
  company_url: string;
  order_index: number;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
};