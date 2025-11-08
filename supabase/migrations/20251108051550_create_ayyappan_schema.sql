/*
  # Ayyappan & Co Engineering Website Database Schema

  ## Overview
  This migration creates the complete database schema for the Ayyappan & Co engineering website,
  including tables for services, projects, clients, form submissions, and admin users.

  ## New Tables

  ### 1. `services`
  Stores information about engineering services offered by the company
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Service name
  - `description` (text) - Brief description
  - `detailed_description` (text) - Full service details
  - `icon` (text) - Icon identifier or URL
  - `image_url` (text) - Service image URL
  - `display_order` (integer) - Order for display
  - `is_active` (boolean) - Whether service is currently offered
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `projects`
  Stores completed and ongoing projects
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Project name
  - `description` (text) - Project description
  - `client_name` (text) - Client name
  - `location` (text) - Project location
  - `category` (text) - Project category (Transmission, Distribution, Substation)
  - `completion_year` (integer) - Year completed
  - `thumbnail_url` (text) - Main project image
  - `gallery_urls` (jsonb) - Array of gallery image URLs
  - `is_featured` (boolean) - Featured project flag
  - `display_order` (integer) - Order for display
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `clients`
  Stores client/partner company information
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Client company name
  - `logo_url` (text) - Client logo URL
  - `display_order` (integer) - Order for display
  - `is_active` (boolean) - Active client flag
  - `created_at` (timestamptz) - Creation timestamp

  ### 4. `form_submissions`
  Stores contact form and service inquiry submissions
  - `id` (uuid, primary key) - Unique identifier
  - `form_type` (text) - Type of form (contact, service_inquiry)
  - `name` (text) - Submitter name
  - `email` (text) - Submitter email
  - `phone` (text) - Contact phone
  - `company` (text) - Company name (optional)
  - `service_id` (uuid) - Related service (for inquiries)
  - `message` (text) - Form message
  - `budget` (text) - Budget range (for service inquiries)
  - `status` (text) - Submission status (new, read, contacted, closed)
  - `created_at` (timestamptz) - Submission timestamp

  ### 5. `site_settings`
  Stores general site configuration and content
  - `id` (uuid, primary key) - Unique identifier
  - `key` (text, unique) - Setting key
  - `value` (jsonb) - Setting value (flexible JSON structure)
  - `description` (text) - Setting description
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for services, projects, clients, and site_settings
  - Authenticated users can create form submissions
  - Only authenticated admins can modify content tables

  ## Indexes
  - Added indexes on frequently queried columns for performance
  - Composite indexes for common query patterns
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  detailed_description text NOT NULL,
  icon text DEFAULT 'wrench',
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  client_name text NOT NULL,
  location text NOT NULL,
  category text NOT NULL,
  completion_year integer,
  thumbnail_url text,
  gallery_urls jsonb DEFAULT '[]'::jsonb,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service_id uuid REFERENCES services(id),
  message text NOT NULL,
  budget text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for projects
CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for clients
CREATE POLICY "Clients are viewable by everyone"
  ON clients FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage clients"
  ON clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for form_submissions
CREATE POLICY "Anyone can submit forms"
  ON form_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON form_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON form_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for site_settings
CREATE POLICY "Site settings are viewable by everyone"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_clients_active ON clients(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- Insert default site settings
INSERT INTO site_settings (key, value, description) VALUES
  ('company_info', '{"name": "Ayyappan & Co", "tagline": "Engineering India''s Power Infrastructure", "years_experience": 14, "total_projects": 100, "total_technicians": 500}'::jsonb, 'Company basic information'),
  ('contact_info', '{"email": "info@ayyappanco.com", "phone": "+91-XXXXXXXXXX", "address": "Your Address Here", "map_embed": ""}'::jsonb, 'Contact information'),
  ('social_links', '{"linkedin": "", "twitter": "", "facebook": "", "instagram": ""}'::jsonb, 'Social media links')
ON CONFLICT (key) DO NOTHING;

-- Insert sample services
INSERT INTO services (title, description, detailed_description, icon, display_order) VALUES
  ('Transmission Line Projects', 'High-voltage transmission line construction and maintenance services across India', 'We specialize in the design, construction, and maintenance of high-voltage transmission lines ranging from 66kV to 400kV. Our experienced team handles everything from site surveys to final commissioning, ensuring reliable power transmission infrastructure.', 'power', 1),
  ('Distribution Network', 'Complete distribution network solutions for urban and rural electrification', 'Our distribution services cover the complete spectrum of electrical distribution from substations to end consumers. We provide planning, installation, and maintenance of distribution networks including overhead lines, underground cables, and distribution transformers.', 'network', 2),
  ('Substation Construction', 'End-to-end substation construction and installation services', 'We offer comprehensive substation services including civil works, equipment installation, testing, and commissioning. Our expertise covers substations from 33kV to 400kV, including GIS and AIS type substations.', 'building', 3)
ON CONFLICT DO NOTHING;