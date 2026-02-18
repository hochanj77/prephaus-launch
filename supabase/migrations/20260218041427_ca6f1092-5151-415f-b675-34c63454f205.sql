-- Drop the restrictive SELECT policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can view published announcements" ON public.announcements;

CREATE POLICY "Anyone can view published announcements"
ON public.announcements
FOR SELECT
USING (published = true);