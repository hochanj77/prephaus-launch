import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SiteContentRow {
  id: string;
  page: string;
  section_key: string;
  content: Record<string, string>;
  updated_at: string | null;
}

export function useSiteContent(page: string, sectionKey: string) {
  return useQuery({
    queryKey: ['site_content', page, sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('page', page)
        .eq('section_key', sectionKey)
        .maybeSingle();
      if (error) throw error;
      return data as SiteContentRow | null;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePageContent(page: string) {
  return useQuery({
    queryKey: ['site_content', page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('page', page);
      if (error) throw error;
      const map: Record<string, Record<string, string>> = {};
      (data as SiteContentRow[])?.forEach((row) => {
        map[row.section_key] = row.content;
      });
      return map;
    },
    staleTime: 5 * 60 * 1000,
  });
}

