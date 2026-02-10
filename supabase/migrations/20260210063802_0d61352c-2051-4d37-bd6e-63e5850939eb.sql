
CREATE TABLE public.catalog_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  preferred_language TEXT,
  preferred_location TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.catalog_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit catalog request"
  ON public.catalog_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view catalog requests"
  ON public.catalog_requests
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));
