import { notFound } from 'next/navigation';
import { courses } from '@/lib/mock-data';
import { CoursePlayer } from '@/components/learn/course-player';

export default async function LearningPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  return <CoursePlayer course={course} />;
}
