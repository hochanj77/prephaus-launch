import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, FileText, Calendar, Loader2 } from 'lucide-react';
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
  term: string;
  report_date: string;
  grade_overall: string | null;
  grade_math: string | null;
  grade_reading: string | null;
  grade_writing: string | null;
  created_at: string;
  students?: {
    first_name: string;
    last_name: string;
  };
}

interface ScheduleEntry {
  id: string;
  student_id: string;
  date: string;
  start_time: string;
  end_time: string;
  subject: string | null;
  created_at: string;
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
        .order('report_date', { ascending: false });
      if (error) throw error;
      return data as ReportCard[];
    },
  });

  const { data: schedules = [], isLoading: schedulesLoading } = useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('*, students(first_name, last_name)')
        .order('date', { ascending: false });
      if (error) throw error;
      return data as ScheduleEntry[];
    },
  });

  const isLoading = studentsLoading || reportCardsLoading || schedulesLoading;

  // Compute statistics
  const stats = useMemo(() => {
    const activeStudents = students.filter((s) => s.active).length;
    const newSignups = students.filter((s) =>
      isAfter(new Date(s.created_at), cutoffDate)
    ).length;
    const reportCardsIssued = reportCards.filter((rc) =>
      isAfter(new Date(rc.created_at), cutoffDate)
    ).length;
    const sessionsScheduled = schedules.filter((s) =>
      isAfter(new Date(s.created_at), cutoffDate)
    ).length;

    return { activeStudents, newSignups, reportCardsIssued, sessionsScheduled };
  }, [students, reportCards, schedules, cutoffDate]);

  // Grade distribution
  const gradeDistribution = useMemo(() => {
    const grades: Record<string, number> = {};
    reportCards.forEach((rc) => {
      if (rc.grade_overall) {
        grades[rc.grade_overall] = (grades[rc.grade_overall] || 0) + 1;
      }
    });
    return Object.entries(grades)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([grade, count]) => ({ grade, count }));
  }, [reportCards]);

  // Filtered data by date range
  const filteredReportCards = useMemo(() => {
    return reportCards.filter((rc) => isAfter(new Date(rc.report_date), cutoffDate));
  }, [reportCards, cutoffDate]);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => isAfter(new Date(s.date), cutoffDate));
  }, [schedules, cutoffDate]);

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
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.sessionsScheduled}</p>
                <p className="text-sm text-muted-foreground">Sessions Scheduled</p>
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
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
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
            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution (Overall)</CardTitle>
              </CardHeader>
              <CardContent>
                {gradeDistribution.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No grade data available</p>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {gradeDistribution.map(({ grade, count }) => (
                      <div
                        key={grade}
                        className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg"
                      >
                        <span className="font-semibold text-lg">{grade}</span>
                        <span className="text-muted-foreground">({count})</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

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
                        <TableHead>Term</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Overall</TableHead>
                        <TableHead>Math</TableHead>
                        <TableHead>Reading</TableHead>
                        <TableHead>Writing</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReportCards.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
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
                            <TableCell>{rc.term}</TableCell>
                            <TableCell>{format(new Date(rc.report_date), 'MMM d, yyyy')}</TableCell>
                            <TableCell>{rc.grade_overall || '-'}</TableCell>
                            <TableCell>{rc.grade_math || '-'}</TableCell>
                            <TableCell>{rc.grade_reading || '-'}</TableCell>
                            <TableCell>{rc.grade_writing || '-'}</TableCell>
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

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Subject</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSchedules.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No sessions in selected period
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSchedules.map((schedule) => (
                        <TableRow key={schedule.id}>
                          <TableCell className="font-medium">
                            {schedule.students
                              ? `${schedule.students.first_name} ${schedule.students.last_name}`
                              : 'Unknown'}
                          </TableCell>
                          <TableCell>{format(new Date(schedule.date), 'MMM d, yyyy')}</TableCell>
                          <TableCell>
                            {schedule.start_time} - {schedule.end_time}
                          </TableCell>
                          <TableCell>{schedule.subject || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsTab;
