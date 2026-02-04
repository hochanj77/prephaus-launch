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
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Search, Trash2, Edit, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Tutor {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  specializations: string[] | null;
  bio: string | null;
  active: boolean;
  user_id: string | null;
  created_at: string;
}

const TutorsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const queryClient = useQueryClient();

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ['tutors-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tutors')
        .select('*')
        .order('name', { ascending: true });
      if (error) throw error;
      return data as Tutor[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('tutors').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutors-admin'] });
      queryClient.invalidateQueries({ queryKey: ['tutors'] });
      toast.success('Tutor deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete tutor');
    },
  });

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tutor Management</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Tutor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tutor</DialogTitle>
            </DialogHeader>
            <TutorForm
              onSuccess={() => {
                setIsAddDialogOpen(false);
                queryClient.invalidateQueries({ queryKey: ['tutors-admin'] });
                queryClient.invalidateQueries({ queryKey: ['tutors'] });
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
              placeholder="Search tutors..."
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
                  <TableHead>Phone</TableHead>
                  <TableHead>Specializations</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTutors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No tutors found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTutors.map((tutor) => (
                    <TableRow key={tutor.id}>
                      <TableCell className="font-medium">{tutor.name}</TableCell>
                      <TableCell>{tutor.email || '-'}</TableCell>
                      <TableCell>{tutor.phone || '-'}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {tutor.specializations?.slice(0, 2).map((spec, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {(tutor.specializations?.length || 0) > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{(tutor.specializations?.length || 0) - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={tutor.active ? 'default' : 'secondary'}>
                          {tutor.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingTutor(tutor)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMutation.mutate(tutor.id)}
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

        <Dialog open={!!editingTutor} onOpenChange={(open) => !open && setEditingTutor(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Tutor</DialogTitle>
            </DialogHeader>
            {editingTutor && (
              <TutorForm
                tutor={editingTutor}
                onSuccess={() => {
                  setEditingTutor(null);
                  queryClient.invalidateQueries({ queryKey: ['tutors-admin'] });
                  queryClient.invalidateQueries({ queryKey: ['tutors'] });
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

interface TutorFormProps {
  tutor?: Tutor;
  onSuccess: () => void;
}

const TutorForm = ({ tutor, onSuccess }: TutorFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: tutor?.name || '',
    email: tutor?.email || '',
    phone: tutor?.phone || '',
    specializations: tutor?.specializations?.join(', ') || '',
    bio: tutor?.bio || '',
    active: tutor?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        specializations: formData.specializations
          ? formData.specializations.split(',').map((s) => s.trim()).filter(Boolean)
          : null,
        bio: formData.bio || null,
        active: formData.active,
      };

      if (tutor) {
        const { error } = await supabase
          .from('tutors')
          .update(dataToSubmit)
          .eq('id', tutor.id);
        if (error) throw error;
        toast.success('Tutor updated successfully');
      } else {
        const { error } = await supabase.from('tutors').insert(dataToSubmit);
        if (error) throw error;
        toast.success('Tutor added successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error('Failed to save tutor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
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

      <div className="space-y-2">
        <Label htmlFor="specializations">Specializations (comma-separated)</Label>
        <Input
          id="specializations"
          value={formData.specializations}
          onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
          placeholder="e.g., SAT Math, ACT English, AP Physics"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
        />
        <Label htmlFor="active">Active</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {tutor ? 'Update Tutor' : 'Add Tutor'}
        </Button>
      </div>
    </form>
  );
};

export default TutorsTab;
