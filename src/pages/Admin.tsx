import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Users, Calendar, Megaphone, BookOpen, GraduationCap } from 'lucide-react';
import StudentsTab from '@/components/admin/StudentsTab';
import ScheduleTab from '@/components/admin/ScheduleTab';
import AnnouncementsTab from '@/components/admin/AnnouncementsTab';
import CoursesTab from '@/components/admin/CoursesTab';
import TutorsTab from '@/components/admin/TutorsTab';

const Admin = () => {
  const { user, loading, isAdmin, isAdminLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Only redirect if we're done loading and done checking admin status
    if (!loading && !isAdminLoading && user && !isAdmin) {
      navigate('/');
    }
  }, [user, loading, isAdmin, isAdminLoading, navigate]);

  // Show loading while auth or admin check is in progress
  if (loading || isAdminLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage students, schedules, and communications</p>
      </div>

      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="students" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Students</span>
          </TabsTrigger>
          <TabsTrigger value="tutors" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Tutors</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Courses</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="announcements" className="gap-2">
            <Megaphone className="h-4 w-4" />
            <span className="hidden sm:inline">Announcements</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentsTab />
        </TabsContent>

        <TabsContent value="tutors">
          <TutorsTab />
        </TabsContent>

        <TabsContent value="courses">
          <CoursesTab />
        </TabsContent>

        <TabsContent value="schedule">
          <ScheduleTab />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
