
-- Add account_type and linked_student_id to students table
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS account_type text NOT NULL DEFAULT 'student';
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS linked_student_id uuid REFERENCES public.students(id);

-- Create messages table for parent-admin communication
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL,
  recipient_id uuid,
  subject text NOT NULL,
  content text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages"
ON public.messages FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Users can send messages
CREATE POLICY "Authenticated users can send messages"
ON public.messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);

-- Users can mark their received messages as read
CREATE POLICY "Recipients can update own messages"
ON public.messages FOR UPDATE
USING (auth.uid() = recipient_id);

-- Admins can manage all messages
CREATE POLICY "Admins can manage all messages"
ON public.messages FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Parents can view their linked student's record
CREATE POLICY "Parents can view linked student"
ON public.students FOR SELECT
USING (
  id IN (
    SELECT s.linked_student_id FROM students s 
    WHERE s.user_id = auth.uid() AND s.account_type = 'parent' AND s.linked_student_id IS NOT NULL
  )
);

-- Parents can view linked student's grades
CREATE POLICY "Parents can view linked student grades"
ON public.student_grades FOR SELECT
USING (
  student_id IN (
    SELECT s.linked_student_id FROM students s 
    WHERE s.user_id = auth.uid() AND s.account_type = 'parent' AND s.linked_student_id IS NOT NULL
  )
);

-- Parents can view linked student's report cards
CREATE POLICY "Parents can view linked student report cards"
ON public.report_cards FOR SELECT
USING (
  student_id IN (
    SELECT s.linked_student_id FROM students s 
    WHERE s.user_id = auth.uid() AND s.account_type = 'parent' AND s.linked_student_id IS NOT NULL
  )
);

-- Parents can view linked student's enrollments
CREATE POLICY "Parents can view linked student enrollments"
ON public.student_enrollments FOR SELECT
USING (
  student_id IN (
    SELECT s.linked_student_id FROM students s 
    WHERE s.user_id = auth.uid() AND s.account_type = 'parent' AND s.linked_student_id IS NOT NULL
  )
);

-- Trigger for messages updated_at
CREATE TRIGGER update_messages_updated_at
BEFORE UPDATE ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
