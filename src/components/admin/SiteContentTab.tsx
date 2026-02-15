import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Globe, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SiteContentRow {
  id: string;
  page: string;
  section_key: string;
  content: Record<string, string>;
  updated_at: string | null;
}

const contentSchema: Record<string, Record<string, { label: string; type: 'text' | 'textarea' | 'url' }[]>> = {
  home: {
    hero: [
      { label: 'Headline', type: 'text' },
      { label: 'Subheading', type: 'textarea' },
      { label: 'CTA Primary Text', type: 'text' },
      { label: 'CTA Primary Link', type: 'url' },
      { label: 'CTA Secondary Text', type: 'text' },
      { label: 'CTA Secondary Link', type: 'url' },
    ],
    cta_section: [
      { label: 'Headline', type: 'text' },
      { label: 'Subheading', type: 'textarea' },
      { label: 'Button Text', type: 'text' },
      { label: 'Button Link', type: 'url' },
    ],
  },
  courses: {
    hero: [
      { label: 'Headline', type: 'text' },
      { label: 'Subheading', type: 'textarea' },
    ],
    cta: [
      { label: 'Text', type: 'textarea' },
      { label: 'Button Text', type: 'text' },
      { label: 'Button Link', type: 'url' },
    ],
  },
  about: {
    welcome: [
      { label: 'Headline', type: 'text' },
      { label: 'Intro', type: 'text' },
      { label: 'Body', type: 'textarea' },
    ],
    belonging: [
      { label: 'Headline', type: 'text' },
      { label: 'Body', type: 'textarea' },
    ],
    heart: [
      { label: 'Headline', type: 'text' },
      { label: 'Body', type: 'textarea' },
      { label: 'Values Intro', type: 'text' },
    ],
    excellence: [
      { label: 'Headline', type: 'text' },
      { label: 'Body', type: 'textarea' },
      { label: 'Quote', type: 'textarea' },
    ],
  },
  global: {
    contact_info: [
      { label: 'Address Line1', type: 'text' },
      { label: 'Address Line2', type: 'text' },
      { label: 'Phone', type: 'text' },
      { label: 'Email', type: 'text' },
      { label: 'Hours Weekday', type: 'text' },
      { label: 'Hours Weekend', type: 'text' },
    ],
    social_links: [
      { label: 'Instagram URL', type: 'url' },
      { label: 'Instagram Handle', type: 'text' },
      { label: 'Google Business URL', type: 'url' },
      { label: 'Google Business Name', type: 'text' },
    ],
    catalog: [
      { label: 'Catalog URL', type: 'url' },
      { label: 'Catalog Description', type: 'textarea' },
    ],
  },
};

function labelToKey(label: string): string {
  return label.toLowerCase().replace(/\s+/g, '_');
}

const pageLabels: Record<string, string> = {
  home: 'Homepage',
  courses: 'Programs',
  about: 'About Us',
  global: 'Global Settings',
};

const sectionLabels: Record<string, string> = {
  hero: 'Hero Section',
  cta_section: 'CTA Section',
  cta: 'Call to Action',
  welcome: 'Welcome Section',
  belonging: 'Power of Belonging',
  heart: 'Heart Behind Knowledge',
  excellence: 'Built for Excellence',
  contact_info: 'Contact Information',
  social_links: 'Social Media Links',
  catalog: 'Course Catalog',
};

const SiteContentTab = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('global');

  const { data: allContent = [], isLoading } = useQuery({
    queryKey: ['site_content_admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('page')
        .order('section_key');
      if (error) throw error;
      return data as SiteContentRow[];
    },
  });

  const contentByPage: Record<string, Record<string, SiteContentRow>> = {};
  allContent.forEach((row) => {
    if (!contentByPage[row.page]) contentByPage[row.page] = {};
    contentByPage[row.page][row.section_key] = row;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Website Content Editor</CardTitle>
            <CardDescription>
              Edit text, links, contact info, and social media across your site. Changes take effect immediately.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            {Object.keys(contentSchema).map((page) => (
              <TabsTrigger key={page} value={page}>
                {pageLabels[page] || page}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(contentSchema).map(([page, sections]) => (
            <TabsContent key={page} value={page} className="space-y-6">
              {Object.entries(sections).map(([sectionKey, fields]) => (
                <SectionEditor
                  key={`${page}-${sectionKey}`}
                  page={page}
                  sectionKey={sectionKey}
                  fields={fields}
                  existingContent={contentByPage[page]?.[sectionKey]}
                  userId={user?.id}
                  queryClient={queryClient}
                />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface SectionEditorProps {
  page: string;
  sectionKey: string;
  fields: { label: string; type: 'text' | 'textarea' | 'url' }[];
  existingContent?: SiteContentRow;
  userId?: string;
  queryClient: ReturnType<typeof useQueryClient>;
}

const SectionEditor = ({ page, sectionKey, fields, existingContent, userId, queryClient }: SectionEditorProps) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach((f) => {
      const key = labelToKey(f.label);
      initial[key] = existingContent?.content?.[key] || '';
    });
    return initial;
  });
  const [saved, setSaved] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async (content: Record<string, string>) => {
      if (existingContent) {
        const { error } = await supabase
          .from('site_content')
          .update({ content, updated_by: userId || null })
          .eq('id', existingContent.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_content')
          .insert({ page, section_key: sectionKey, content, updated_by: userId || null });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_content_admin'] });
      queryClient.invalidateQueries({ queryKey: ['site_content'] });
      toast.success(`${sectionLabels[sectionKey] || sectionKey} saved`);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
    onError: () => toast.error('Failed to save content'),
  });

  const handleSave = () => saveMutation.mutate(formData);

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{sectionLabels[sectionKey] || sectionKey}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => {
          const key = labelToKey(field.label);
          return (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={`${page}-${sectionKey}-${key}`} className="text-sm font-medium">
                {field.label}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={`${page}-${sectionKey}-${key}`}
                  value={formData[key] || ''}
                  onChange={(e) => updateField(key, e.target.value)}
                  rows={3}
                  className="resize-y"
                />
              ) : (
                <Input
                  id={`${page}-${sectionKey}-${key}`}
                  type="text"
                  value={formData[key] || ''}
                  onChange={(e) => updateField(key, e.target.value)}
                  placeholder={field.type === 'url' ? '/path or https://...' : ''}
                />
              )}
            </div>
          );
        })}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            size="sm"
            variant={saved ? 'outline' : 'default'}
            className="gap-2"
          >
            {saveMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saved ? 'Saved' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteContentTab;

