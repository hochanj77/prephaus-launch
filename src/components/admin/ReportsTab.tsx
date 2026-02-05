import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, FileText, Loader2 } from 'lucide-react';
import { format, subDays, isAfter } from 'date-fns';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  grade_level: string | null;
  school: string | null;
  active: boolean;
  created_at: string;
}

interface ReportCard {
  id: string;
  student_id: string;
  title: string;
  file_path: string;
  term: string | null;
  year: number | null;
  created_at: string | null;
  students?: {
    first_name: string;
    last_name: string;
  };
}

const dateRangeOptions = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
  { value: '365', label: 'Last year' },
];

const ReportsTab = () => {
  const [dateRange, setDateRange] = useState('30');

  const cutoffDate = useMemo(() => {
    return subDays(new Date(), parseInt(dateRange));
  }, [dateRange]);

  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Student[];
    },
  });

  const { data: reportCards = [], isLoading: reportCardsLoading } = useQuery({
    queryKey: ['report_cards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('report_cards')
        .select('*, students(first_name, last_name)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ReportCard[];
    },
  });

  const isLoading = studentsLoading || reportCardsLoading;

  // Compute statistics
  const stats = useMemo(() => {
    const activeStudents = students.filter((s) => s.active).length;
    const newSignups = students.filter((s) =>
      isAfter(new Date(s.created_at), cutoffDate)
    ).length;
    const reportCardsIssued = reportCards.filter((rc) =>
      rc.created_at && isAfter(new Date(rc.created_at), cutoffDate)
    ).length;

    return { activeStudents, newSignups, reportCardsIssued };
  }, [students, reportCards, cutoffDate]);

  // Filtered data by date range
  const filteredReportCards = useMemo(() => {
    return reportCards.filter((rc) => rc.created_at && isAfter(new Date(rc.created_at), cutoffDate));
  }, [reportCards, cutoffDate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            {dateRangeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activeStudents}</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.newSignups}</p>
                <p className="text-sm text-muted-foreground">New Signups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.reportCardsIssued}</p>
                <p className="text-sm text-muted-foreground">Report Cards Issued</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sub-tabs */}
      <Tabs defaultValue="enrollment" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Enrollment Tab */}
        <TabsContent value="enrollment">
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Grade Level</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enrolled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No students found
                        </TableCell>
                      </TableRow>
                    ) : (
                      students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.first_name} {student.last_name}
                          </TableCell>
                          <TableCell>{student.email || '-'}</TableCell>
                          <TableCell>{student.grade_level || '-'}</TableCell>
                          <TableCell>{student.school || '-'}</TableCell>
                          <TableCell>
                            <Badge variant={student.active ? 'default' : 'secondary'}>
                              {student.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(student.created_at), 'MMM d, yyyy')}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <div className="space-y-6">
            {/* Report Cards Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Report Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Term</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Uploaded</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReportCards.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No report cards in selected period
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredReportCards.map((rc) => (
                          <TableRow key={rc.id}>
                            <TableCell className="font-medium">
                              {rc.students
                                ? `${rc.students.first_name} ${rc.students.last_name}`
                                : 'Unknown'}
                            </TableCell>
                            <TableCell>{rc.title}</TableCell>
                            <TableCell>{rc.term || '-'}</TableCell>
                            <TableCell>{rc.year || '-'}</TableCell>
                            <TableCell>
                              {rc.created_at ? format(new Date(rc.created_at), 'MMM d, yyyy') : '-'}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsTab;
