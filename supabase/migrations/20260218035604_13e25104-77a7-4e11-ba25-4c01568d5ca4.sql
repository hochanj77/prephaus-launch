
-- Allow authenticated users to insert their own student record
CREATE POLICY "Users can create own student record"
ON public.students
FOR INSERT
WITH CHECK (auth.uid() = user_id);
