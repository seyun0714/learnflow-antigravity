'use client';

import Link from 'next/link';
import { courses, myLearning } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle, Clock, Star, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { ReviewModal } from '@/components/learn/review-modal';

export default function MyLearningPage() {
  // Join myLearning with course data
  const enrolledCourses = myLearning
    .map((item) => {
      const course = courses.find((c) => c.id === item.courseId);
      return { ...item, course };
    })
    .filter((item) => item.course);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ id: string; title: string } | null>(null);

  const handleOpenReview = (courseId: string, courseTitle: string) => {
    setSelectedCourse({ id: courseId, title: courseTitle });
    setIsReviewOpen(true);
  };

  const handleSaveReview = (rating: number, content: string) => {
    console.log('Review saved:', { courseId: selectedCourse?.id, rating, content });
    // In a real app, save to API
  };

  const handleDeleteReview = () => {
    console.log('Review deleted:', { courseId: selectedCourse?.id });
    // In a real app, delete from API
  };

  return (
    <div className="container px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">내 강의실</h1>
      </div>

      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="in-progress">
            수강 중 ({enrolledCourses.filter((c) => c.status === 'in-progress').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            완료 ({enrolledCourses.filter((c) => c.status === 'completed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses
              .filter((c) => c.status === 'in-progress')
              .map((item) => (
                <Card
                  key={item.courseId}
                  className="border-none bg-transparent overflow-hidden transition-colors group"
                >
                  <div className="aspect-video relative bg-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.course?.thumbnail}
                      alt={item.course?.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <Link href={`/learn/${item.courseId}`}>
                        <PlayCircle className="w-12 h-12 text-white" />
                      </Link>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-bold line-clamp-2 h-12">{item.course?.title}</h3>
                    <div className="space-y-0">
                      <div className="flex justify-between text-xs text-zinc-400 ">
                        <span>진도율</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      onClick={() => item.course && handleOpenReview(item.course.id, item.course.title)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      리뷰 남기기
                    </Button>
                  </CardContent>
                  <CardFooter className="p-1 pt-0"></CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses
              .filter((c) => c.status === 'completed')
              .map((item) => (
                <Card
                  key={item.courseId}
                  className="bg-zinc-900/50 border-zinc-800 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="aspect-video relative bg-zinc-800 grayscale">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.course?.thumbnail} alt={item.course?.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-white font-bold border-2 border-white px-4 py-1 rounded-full">
                        수강 완료
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold line-clamp-1 text-zinc-400">{item.course?.title}</h3>
                    <p className="text-sm text-zinc-500 mt-1">수료일: 2024.03.15</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800">
                      수료증 보기
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedCourse && (
        <ReviewModal
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          courseTitle={selectedCourse.title}
          onSave={handleSaveReview}
          onDelete={handleDeleteReview}
        />
      )}
    </div>
  );
}
