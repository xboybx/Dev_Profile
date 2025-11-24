/*
  # Portfolio Website Database Schema

  ## Overview
  This migration creates the complete database schema for a portfolio website with admin capabilities.

  ## New Tables
  
  ### 1. profiles
  - `id` (uuid, primary key) - User profile ID
  - `email` (text, unique) - User email
  - `full_name` (text) - Full name
  - `bio` (text) - Short biography
  - `avatar_url` (text) - Profile picture URL
  - `location` (text) - Current location
  - `github_url` (text) - GitHub profile link
  - `linkedin_url` (text) - LinkedIn profile link
  - `twitter_url` (text) - Twitter/X profile link
  - `resume_url` (text) - Resume/CV link
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. skills
  - `id` (uuid, primary key) - Skill ID
  - `name` (text) - Skill name
  - `category` (text) - Skill category (e.g., Frontend, Backend, Tools)
  - `proficiency` (integer) - Proficiency level 1-100
  - `icon` (text) - Icon identifier
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. projects
  - `id` (uuid, primary key) - Project ID
  - `title` (text) - Project title
  - `description` (text) - Project description
  - `long_description` (text) - Detailed project description
  - `image_url` (text) - Project thumbnail/image
  - `demo_url` (text) - Live demo link
  - `github_url` (text) - GitHub repository link
  - `technologies` (text[]) - Array of technologies used
  - `featured` (boolean) - Featured project flag
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. experiences
  - `id` (uuid, primary key) - Experience ID
  - `company` (text) - Company name
  - `position` (text) - Job position/title
  - `description` (text) - Job description
  - `start_date` (date) - Start date
  - `end_date` (date, nullable) - End date (null if current)
  - `location` (text) - Job location
  - `company_url` (text) - Company website
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Record creation timestamp

  ### 5. contact_messages
  - `id` (uuid, primary key) - Message ID
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `read` (boolean) - Read status
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for portfolio data (profiles, skills, projects, experiences)
  - Authenticated write access for admin users
  - Public insert access for contact messages
  - Authenticated read access for contact messages
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  location text DEFAULT '',
  github_url text DEFAULT '',
  linkedin_url text DEFAULT '',
  twitter_url text DEFAULT '',
  resume_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer DEFAULT 50 CHECK (proficiency >= 0 AND proficiency <= 100),
  icon text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  long_description text DEFAULT '',
  image_url text DEFAULT '',
  demo_url text DEFAULT '',
  github_url text DEFAULT '',
  technologies text[] DEFAULT ARRAY[]::text[],
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  description text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  location text DEFAULT '',
  company_url text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies (public read, authenticated write)
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete profiles"
  ON profiles FOR DELETE
  TO authenticated
  USING (true);

-- Skills policies (public read, authenticated write)
CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert skills"
  ON skills FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update skills"
  ON skills FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete skills"
  ON skills FOR DELETE
  TO authenticated
  USING (true);

-- Projects policies (public read, authenticated write)
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Experiences policies (public read, authenticated write)
CREATE POLICY "Experiences are viewable by everyone"
  ON experiences FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert experiences"
  ON experiences FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update experiences"
  ON experiences FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete experiences"
  ON experiences FOR DELETE
  TO authenticated
  USING (true);

-- Contact messages policies (public insert, authenticated read/update)
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON experiences(order_index);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);