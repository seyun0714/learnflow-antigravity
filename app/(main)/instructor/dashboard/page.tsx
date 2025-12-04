import Link from 'next/link';
import { courses } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MoreVertical, Edit, Trash, Users, DollarSign } from 'lucide-react';
import { InstructorCourseTable } from '@/components/instructor/course-table';

export default function InstructorDashboard() {
  return (
    <div className="container px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">강의 관리</h1>
          <p className="text-muted-foreground mt-2">등록된 강의 현황을 확인하고 관리하세요.</p>
        </div>
        <Button asChild className="bg-white text-zinc-950 hover:bg-zinc-200">
          <Link href="/instructor/courses/create">
            <Plus className="mr-2 h-4 w-4" />새 강의 만들기
          </Link>
        </Button>
      </div>

      <InstructorCourseTable courses={courses} />
    </div>
  );
}
