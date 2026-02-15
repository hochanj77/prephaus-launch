import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSiteContent } from '@/hooks/useSiteContent';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, GraduationCap, BookOpen, FileText, Download, ExternalLink, User } from 'lucide-react';

interface StudentGrade {
  id: string;
  class_name: string;
  semester: string;
  attitude: string | null;
  homework: string | null;
  participation: string | null;
  test_quiz: string | null;
  comments: string | null;
  created_at: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  published_at: string | null;
  created_at: string;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, loading, isStudent, isAdminLoading, studentProfile } = useAuth();

  useEffect(() => {
    if (!loading && !isAdminLoading) {
      if (!user) {
        navigate('/portal');
      } else if (!isStudent) {
        navigate('/portal');
      }
    }
  }, [user, loading, isStudent, isAdminLoading, navigate]);

  // Fetch student's grades
  const { data: grades = [], isLoading: gradesLoading } = useQuery({
    queryKey: ['my_grades', studentProfile?.id],
    queryFn: async () => {
      if (!studentProfile?.id) return [];
      const { data, error } = await supabase
        .from('student_grades')
        .select('*')
        .eq('student_id', studentProfile.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as StudentGrade[];
    },
    enabled: !!studentProfile?.id,
  });

  // Fetch published announcements
  const { data: announcements = [] } = useQuery({
    queryKey: ['student_announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data as Announcement[];
    },
  });

  // Fetch catalog info from CMS
  const { data: catalogData } = useSiteContent('global', 'catalog');
  const catalog = catalogData?.content || {};

  if (loading || isAdminLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isStudent || !studentProfile) return null;

  // Group grades by semester
  const gradesBySemester: Record<string, StudentGrade[]> = {};
  grades.forEach((g) => {
    const key = g.semester || 'Other';
    if (!gradesBySemester[key]) gradesBySemester[key] = [];
    gradesBySemester[key].push(g);
  });

  return (
    <div className="pt-20 md:pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-accent/10">
              <User className="h-5 w-5 text-accent" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary">
              Welcome, {studentProfile.first_name}!
            </h1>
          </div>
          <p className="text-muted-foreground ml-12">
            View your grades, resources, and announcements below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content — Grades */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grades Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>My Report Cards</CardTitle>
                    <CardDescription>Your grades across all semesters</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {gradesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : grades.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <GraduationCap className="h-10 w-10 mx-auto mb-3 opacity-40" />
                    <p>No grades available yet. Check back after your report cards are published.</p>
                  </div>
                ) : (
                  Object.entries(gradesBySemester).map(([semester, semGrades]) => (
                    <div key={semester} className="mb-6 last:mb-0">
                      <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                        <Badge variant="outline">{semester}</Badge>
                      </h3>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Class</TableHead>
                              <TableHead>Attitude</TableHead>
                              <TableHead>Homework</TableHead>
                              <TableHead>Participation</TableHead>
                              <TableHead>Test/Quiz</TableHead>
                              <TableHead>Comments</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {semGrades.map((g) => (
                              <TableRow key={g.id}>
                                <TableCell className="font-medium">{g.class_name}</TableCell>
                                <TableCell>{g.attitude || '—'}</TableCell>
                                <TableCell>{g.homework || '—'}</TableCell>
                                <TableCell>{g.participation || '—'}</TableCell>
                                <TableCell>{g.test_quiz || '—'}</TableCell>
                                <TableCell className="text-sm text-muted-foreground max-w-[200px]">
                                  {g.comments || '—'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar — Resources & Announcements */}
          <div className="space-y-6">
            {/* Resources Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Resources</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Course Catalog */}
                {catalog.catalog_url ? (
                  <a
                    href={catalog.catalog_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Download className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-secondary group-hover:text-accent transition-colors">
                        Course Catalog
                      </p>
                      <p className="text-xs text-muted-foreground">Download PDF</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ) : (
                  <Link
                    to="/catalog"
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-accent/10">
                      <FileText className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-secondary group-hover:text-accent transition-colors">
                        Request Course Catalog
                      </p>
                      <p className="text-xs text-muted-foreground">Fill out the request form</p>
                    </div>
                  </Link>
                )}

                {/* SAT Platform Link */}
                <a
                  href="https://prephaus.ditoed.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-secondary group-hover:text-accent transition-colors">
                      SAT Practice Platform
                    </p>
                    <p className="text-xs text-muted-foreground">prephaus.ditoed.com</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              </CardContent>
            </Card>

            {/* Announcements Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                {announcements.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No announcements at this time.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {announcements.map((a) => (
                      <div key={a.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
                        <h4 className="font-medium text-sm text-secondary">{a.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.content}</p>
                        {a.published_at && (
                          <p className="text-xs text-muted-foreground/60 mt-1">
                            {new Date(a.published_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

