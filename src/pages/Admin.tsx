import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Users, Calendar, Megaphone, BookOpen, FileText, BarChart3, GraduationCap, Globe } from 'lucide-react';
import StudentsTab from '@/components/admin/StudentsTab';
import ScheduleTab from '@/components/admin/ScheduleTab';
import AnnouncementsTab from '@/components/admin/AnnouncementsTab';
import CoursesTab from '@/components/admin/CoursesTab';
import ReportCardsTab from '@/components/admin/ReportCardsTab';
import ReportsTab from '@/components/admin/ReportsTab';
import GradesTab from '@/components/admin/GradesTab';
import SiteContentTab from '@/components/admin/SiteContentTab';

const Admin = () => {
  const { user, loading, isAdmin, isAdminLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && !isAdminLoading && user && !isAdmin) {
      navigate('/');
    }
  }, [user, loading, isAdmin, isAdminLoading, navigate]);

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
        <p className="text-muted-foreground mt-1">Manage students, grades, content, and communications</p>
      </div>

      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 lg:w-auto lg:inline-grid lg:grid-cols-8">
          <TabsTrigger value="students" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Students</span>
          </TabsTrigger>
          <TabsTrigger value="grades" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Grades</span>
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
            <span className="hidden sm:inline">Announce</span>
          </TabsTrigger>
          <TabsTrigger value="report-cards" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="website" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Website</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentsTab />
        </TabsContent>

        <TabsContent value="grades">
          <GradesTab />
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

        <TabsContent value="report-cards">
          <ReportCardsTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>

        <TabsContent value="website">
          <SiteContentTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;

