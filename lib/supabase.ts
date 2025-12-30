import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Programme = {
  id: string;
  title: string;
  type: string;
  description: string | null;
  duration: string | null;
  created_at: string;
};

export type Campus = {
  id: string;
  name: string;
  location: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export type News = {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  published_date: string;
  created_at: string;
};

export type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  type: string;
  created_at: string;
};

export type Alumni = {
  id: string;
  name: string;
  designation: string | null;
  bio: string | null;
  image_url: string | null;
  created_at: string;
};

export type Update = {
  id: string;
  title: string;
  description: string | null;
  published_date: string;
  link_url: string | null;
  link_text: string | null;
  created_at: string;
};
