import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, FileText, ClipboardList, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import StudentDetails from './StudentDetails';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  grade_level: string | null;
  school: string | null;
  parent_name: string | null;
  parent_email: string | null;
  parent_phone: string | null;
  notes: string | null;
  active: boolean;
  tutor_id: string | null;
  created_at: string;
}

interface Tutor {
  id: string;
  name: string;
}

const StudentsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('last_name', { ascending: true });
      if (error) throw error;
      return data as Student[];
    },
  });

  const { data: tutors = [] } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tutors')
        .select('id, name')
        .eq('active', true);
      if (error) throw error;
      return data as Tutor[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('students').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete student');
    },
  });

  const filteredStudents = students.filter(
    (student) =>
      `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.school?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTutorName = (tutorId: string | null) => {
    if (!tutorId) return 'Unassigned';
    const tutor = tutors.find((t) => t.id === tutorId);
    return tutor?.name || 'Unknown';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Student Management</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <StudentForm
              tutors={tutors}
              onSuccess={() => {
                setIsAddDialogOpen(false);
                queryClient.invalidateQueries({ queryKey: ['students'] });
              }}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Tutor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.first_name} {student.last_name}
                      </TableCell>
                      <TableCell>{student.email || '-'}</TableCell>
                      <TableCell>{student.grade_level || '-'}</TableCell>
                      <TableCell>{student.school || '-'}</TableCell>
                      <TableCell>{getTutorName(student.tutor_id)}</TableCell>
                      <TableCell>
                        <Badge variant={student.active ? 'default' : 'secondary'}>
                          {student.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsDetailsOpen(true);
                            }}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMutation.mutate(student.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedStudent && (
              <StudentDetails
                student={selectedStudent}
                tutors={tutors}
                onClose={() => setIsDetailsOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

interface StudentFormProps {
  student?: Student;
  tutors: Tutor[];
  onSuccess: () => void;
}

const StudentForm = ({ student, tutors, onSuccess }: StudentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: student?.first_name || '',
    last_name: student?.last_name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    grade_level: student?.grade_level || '',
    school: student?.school || '',
    parent_name: student?.parent_name || '',
    parent_email: student?.parent_email || '',
    parent_phone: student?.parent_phone || '',
    notes: student?.notes || '',
    tutor_id: student?.tutor_id || '',
    active: student?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        tutor_id: formData.tutor_id || null,
      };

      if (student) {
        const { error } = await supabase
          .from('students')
          .update(dataToSubmit)
          .eq('id', student.id);
        if (error) throw error;
        toast.success('Student updated successfully');
      } else {
        const { error } = await supabase.from('students').insert(dataToSubmit);
        if (error) throw error;
        toast.success('Student added successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error('Failed to save student');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name *</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name *</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grade_level">Grade Level</Label>
          <Input
            id="grade_level"
            value={formData.grade_level}
            onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
            placeholder="e.g., 10th Grade"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="school">School</Label>
          <Input
            id="school"
            value={formData.school}
            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tutor_id">Assigned Tutor</Label>
        <Select
          value={formData.tutor_id}
          onValueChange={(value) => setFormData({ ...formData, tutor_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a tutor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Unassigned</SelectItem>
            {tutors.map((tutor) => (
              <SelectItem key={tutor.id} value={tutor.id}>
                {tutor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">Parent/Guardian Information</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parent_name">Name</Label>
            <Input
              id="parent_name"
              value={formData.parent_name}
              onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parent_email">Email</Label>
            <Input
              id="parent_email"
              type="email"
              value={formData.parent_email}
              onChange={(e) => setFormData({ ...formData, parent_email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parent_phone">Phone</Label>
            <Input
              id="parent_phone"
              value={formData.parent_phone}
              onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {student ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
};

export default StudentsTab;
