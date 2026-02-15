-- =============================================
-- MIGRATION: Security + CMS + Grades + Student Portal
-- =============================================

-- =============================================
-- 1. SECURITY FIXES
-- =============================================
DROP POLICY IF EXISTS "Anyone can submit catalog request" ON public.catalog_requests;
CREATE POLICY "Anon can submit catalog request"
  ON public.catalog_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view active courses" ON public.courses;
CREATE POLICY "Anyone can view active courses"
  ON public.courses FOR SELECT TO anon, authenticated USING (active = true);

DROP POLICY IF EXISTS "Anyone can view published announcements" ON public.announcements;
CREATE POLICY "Anyone can view published announcements"
  ON public.announcements FOR SELECT TO anon, authenticated USING (published = true);

-- Tutor access policies
CREATE POLICY "Tutors can view student enrollments"
  ON public.student_enrollments FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.tutor_id IN (SELECT t.id FROM public.tutors t WHERE t.user_id = auth.uid())));

CREATE POLICY "Tutors can view attendance"
  ON public.attendance FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.tutor_id IN (SELECT t.id FROM public.tutors t WHERE t.user_id = auth.uid())));

CREATE POLICY "Tutors can view report cards"
  ON public.report_cards FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.tutor_id IN (SELECT t.id FROM public.tutors t WHERE t.user_id = auth.uid())));

-- =============================================
-- 2. STUDENTS TABLE — add user_id + student_number
-- =============================================
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS student_number TEXT UNIQUE;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL UNIQUE;

-- Students can view their own record
CREATE POLICY "Students can view own record"
  ON public.students FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- =============================================
-- 3. SITE CONTENT CMS TABLE
-- =============================================
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(page, section_key)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON public.site_content FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can manage site content"
  ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed all CMS content
INSERT INTO public.site_content (page, section_key, content) VALUES
  -- Homepage
  ('home', 'hero', '{"headline":"Where Academic Potential Finds a Home.","subheading":"We are a community growing together, leaving no regrets as we build the academic prowess and inner grit needed for a secure future. At PrepHaus, we don''t just help you reach a goal; we give you the momentum to surpass it.","cta_primary_text":"View Programs","cta_primary_link":"/courses","cta_secondary_text":"Download Course Catalog","cta_secondary_link":"/catalog"}'),
  ('home', 'cta_section', '{"headline":"Ready to Start Your Journey?","subheading":"Contact us today and learn how PrepHaus can help you achieve your academic goals.","button_text":"Contact Us","button_link":"/contact"}'),
  -- Courses
  ('courses', 'hero', '{"headline":"Our Programs","subheading":"Explore our comprehensive range of test preparation programs and academic tutoring services designed to help every student succeed."}'),
  ('courses', 'cta', '{"text":"Reach out and we''ll help you find the perfect program for your needs.","button_text":"Download Course Catalog","button_link":"/catalog"}'),
  -- About
  ('about', 'welcome', '{"headline":"Welcome to PrepHaus: Where Potential Finds a Home","intro":"PrepHaus was built on a simple belief: students learn best in community.","body":"What sets PrepHaus apart is our focus on community. We believe that curiosity thrives when students feel secure. In our Haus, you aren''t just a number on a diagnostic test, but an individual with a story. We''ve cultivated a space where students are encouraged to ask questions, take risks, support one another, and grow together. With 50+ years of combined expertise, we know that the best results come when a student feels seen and supported."}'),
  ('about', 'belonging', '{"headline":"The Power of Belonging","body":"Our name is our philosophy. Derived from the German Haus, it implies far more than just a building or a classroom. It signifies home, belonging, and a shared life. We''ve traded the cold, assembly-line feel of traditional test prep for a warm, welcoming environment—a place where students feel at home with teachers who genuinely know them, believe in them, and challenge them to grow."}'),
  ('about', 'heart', '{"headline":"The Heart Behind the Knowledge","body":"While many see education as a transactional transfer of facts, we strive to be more than mere vessels for knowledge. We believe education is not the end goal, but the vital process that helps students reach their dreams. Our teachers are mentors who care deeply, not just for your score growth, but for your personal potential.","values_intro":"At PrepHaus, we work intentionally, every step of the way, to help students develop:"}'),
  ('about', 'excellence', '{"headline":"Built for Excellence. Anchored in Community.","body":"In this Haus, we never mistake warmth for weakness. We are uncompromising when it comes to academic rigor. Our standards are elite, and we never sacrifice performance for comfort. Instead, we use our community as the fuel for high achievement, believing that students reach their peak when they are challenged within a place they truly belong.","quote":"We are a community growing together, leaving no regrets as we build the academic prowess and inner grit needed for a secure future. At PrepHaus, we don''t just help you reach a goal; we give you the momentum to surpass it."}'),
  -- Contact info (used by Contact page + Footer)
  ('global', 'contact_info', '{"address_line1":"268 Broad Ave Floor 2B","address_line2":"Palisades Park, NJ 07650","phone":"(201) 525-8577","email":"info@prephaus.com","hours_weekday":"Mon-Fri: 9am - 8pm","hours_weekend":"Sat-Sun: 10am - 5pm"}'),
  -- Social links (used by Social page + Footer)
  ('global', 'social_links', '{"instagram_url":"#","instagram_handle":"@prephaus","google_business_url":"https://share.google/sB0wrIS3IhJoOfnOJ","google_business_name":"PrepHaus Academy"}'),
  -- Course catalog (PDF url or upload path)
  ('global', 'catalog', '{"catalog_url":"","catalog_type":"link","catalog_description":"Fill out the form below and we''ll send you our complete course catalog."}')
ON CONFLICT (page, section_key) DO NOTHING;

-- =============================================
-- 4. STUDENT GRADES TABLE (matches PrepHaus template)
-- =============================================
CREATE TABLE public.student_grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  class_name TEXT NOT NULL,
  semester TEXT NOT NULL,
  attitude TEXT,
  homework TEXT,
  participation TEXT,
  test_quiz TEXT,
  comments TEXT,
  imported_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  import_batch_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.student_grades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage grades"
  ON public.student_grades FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Tutors can view grades for their students"
  ON public.student_grades FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.tutor_id IN (SELECT t.id FROM public.tutors t WHERE t.user_id = auth.uid())));

-- Students can view their own grades
CREATE POLICY "Students can view own grades"
  ON public.student_grades FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.user_id = auth.uid()));

CREATE TRIGGER update_student_grades_updated_at
  BEFORE UPDATE ON public.student_grades
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Students can view their own report cards
CREATE POLICY "Students can view own report cards"
  ON public.report_cards FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.user_id = auth.uid()));

-- Students can view their own enrollments
CREATE POLICY "Students can view own enrollments"
  ON public.student_enrollments FOR SELECT TO authenticated
  USING (student_id IN (SELECT s.id FROM public.students s WHERE s.user_id = auth.uid()));

