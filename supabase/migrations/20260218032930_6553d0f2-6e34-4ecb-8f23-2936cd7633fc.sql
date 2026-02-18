
-- Create storage bucket for course catalog PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('catalog', 'catalog', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read catalog files
CREATE POLICY "Catalog files are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'catalog');

-- Allow admins to upload catalog files
CREATE POLICY "Admins can upload catalog files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update catalog files
CREATE POLICY "Admins can update catalog files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete catalog files
CREATE POLICY "Admins can delete catalog files"
ON storage.objects FOR DELETE
USING (bucket_id = 'catalog' AND public.has_role(auth.uid(), 'admin'::app_role));
