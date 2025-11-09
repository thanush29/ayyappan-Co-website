import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Service = {
  id: string;
  title: string;
  description: string;
  detailed_description: string;
  icon: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  client_name: string;
  location: string;
  category: string;
  completion_year?: number;
  thumbnail_url?: string;
  gallery_urls: string[];
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Client = {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

export type FormSubmission = {
  id: string;
  form_type: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_id?: string;
  message: string;
  budget?: string;
  status: string;
  created_at: string;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: Record<string, unknown>;
  description?: string;
  updated_at: string;
};

export function getPublicUrl(path: string | null | undefined): string {
  if (!path) return '';

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}

export function getImageUrl(path: string | null | undefined): string {
  return getPublicUrl(path);
}
