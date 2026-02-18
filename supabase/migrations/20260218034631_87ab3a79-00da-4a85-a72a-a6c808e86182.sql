
-- Function to generate student number from initials + sequential number
CREATE OR REPLACE FUNCTION public.generate_student_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  initials TEXT;
  next_num INT;
  new_student_number TEXT;
BEGIN
  -- Get initials from first and last name
  initials := UPPER(LEFT(NEW.first_name, 1) || LEFT(NEW.last_name, 1));
  
  -- Get next sequential number (start from 100 to get 3-digit numbers)
  SELECT COALESCE(MAX(
    CASE 
      WHEN student_number ~ ('^' || initials || '[0-9]+$') 
      THEN CAST(SUBSTRING(student_number FROM LENGTH(initials) + 1) AS INT)
      ELSE 0
    END
  ), 0) + 1 INTO next_num
  FROM students
  WHERE student_number LIKE initials || '%';
  
  -- Ensure minimum 3-digit number
  IF next_num < 100 THEN
    next_num := 100 + next_num;
  END IF;
  
  new_student_number := initials || next_num::TEXT;
  NEW.student_number := new_student_number;
  
  RETURN NEW;
END;
$$;

-- Create trigger to auto-generate student number on insert
CREATE TRIGGER generate_student_number_trigger
BEFORE INSERT ON public.students
FOR EACH ROW
WHEN (NEW.student_number IS NULL)
EXECUTE FUNCTION public.generate_student_number();
