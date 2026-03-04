

## Plan: Excel Import + Student Activation Workflow

This is a significant workflow overhaul with three main parts: (1) Excel import for students, (2) a new "Activate Account" flow replacing the current student Sign Up, and (3) status tracking with Pending/Active/Inactive states.

### Current State
- Students can self-register via Sign Up tab on /portal (creates both auth account + student record)
- Students table has an `active` boolean (true/false) — no "pending" concept
- Grades tab already has a robust Excel import pattern to replicate
- `generate_student_number` trigger auto-assigns Student IDs on insert

### What Changes

#### 1. Database: Add `status` column to students table
- Add a `status` text column: `'pending'` | `'active'` | `'inactive'` (default: `'pending'`)
- Keep the `active` boolean for backward compatibility but derive it from status
- Add a migration to set existing students with `user_id IS NOT NULL` to `'active'`, others to `'pending'`

#### 2. Admin: Excel Import in StudentsTab
- Replicate the GradesTab import pattern (file upload → parse → preview → confirm)
- Column mapping: Student ID (optional for new), First Name, Last Name, Email, Phone, Grade Level, School, Parent Name, Parent Email, Parent Phone, Notes
- Preview shows each row as "New" or "Update" (matched by student_number) or "Error"
- New students inserted with `status = 'pending'`, trigger generates student_number
- Existing students updated with changed fields
- Add "Download Template" button for a blank Excel with correct headers

#### 3. Admin: Status filter + badges
- Replace the Active/Inactive badge with Pending (yellow) / Active (green) / Inactive (gray)
- Add filter dropdown above students table: All / Pending / Active / Inactive
- Status column sortable/filterable

#### 4. Portal: Replace Student Sign Up with "Activate Account"
- Change the portal tabs from "Sign In / Sign Up" to three tabs: "Sign In", "Activate Account", "Parent Sign Up"
- **Activate Account tab**: Student enters Student ID + email + creates password
  - System verifies a student record exists with that student_number + email + status = 'pending'
  - Creates auth account (via signUp), links `user_id` to the student record, sets status to `'active'`
  - No more free student self-registration — students must be pre-created by admin
- **Parent Sign Up** tab: Same as current parent flow but checks student status = 'active'
- **Sign In** tab: Unchanged

#### 5. Auth Context Update
- Update `checkRoles` to check `status` field instead of just `active` boolean
- Ensure `isStudent` is only true when status = `'active'`

### Technical Details

**Database migration:**
```sql
ALTER TABLE public.students ADD COLUMN status text NOT NULL DEFAULT 'pending';
UPDATE public.students SET status = 'active' WHERE user_id IS NOT NULL;
UPDATE public.students SET status = 'inactive' WHERE active = false;
UPDATE public.students SET status = 'pending' WHERE user_id IS NULL AND active = true;
```

**Files to edit:**
- `src/components/admin/StudentsTab.tsx` — Add import UI, status filter, status badges, download template
- `src/pages/Portal.tsx` — Replace student Sign Up with Activate Account tab; keep Parent Sign Up
- `src/contexts/AuthContext.tsx` — Check `status = 'active'` instead of just `active = true`
- `src/components/admin/StudentDetails.tsx` — Show status badge, allow manual status change

**Edge function needed:** An edge function to handle account activation, since the student record already exists and we need to create an auth user then update the student record's `user_id` and `status` atomically. This prevents race conditions and ensures the student_number + email match is verified server-side.

**No changes to:** GradesTab, parent workflow (only minor: check `status = 'active'` instead of `active = true`)

