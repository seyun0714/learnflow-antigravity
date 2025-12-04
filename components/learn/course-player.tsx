'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronLeft, PlayCircle, CheckCircle, Lock, Menu, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoursePlayerProps {
  course: any; // Using any for now to match the mock data structure quickly
}

export function CoursePlayer({ course }: CoursePlayerProps) {
  // Flatten lessons to find the first one easily
  const allLessons = course.curriculum.flatMap((section: any) =>
    section.lessons.map((lesson: any) => ({ ...lesson, sectionId: section.id }))
  );

  const [currentLessonId, setCurrentLessonId] = useState(allLessons[0]?.id);
  const currentLesson = allLessons.find((l: any) => l.id === currentLessonId);

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 bg-zinc-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white hover:bg-zinc-800">
            <Link href={`/courses/${course.id}`}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="font-medium text-sm md:text-base truncate max-w-[200px] md:max-w-md">
            {currentLesson?.title}
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-black relative">
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
            {currentLesson?.type === 'quiz' ? (
              <div className="w-full max-w-3xl bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl overflow-y-auto max-h-[80vh] custom-scrollbar">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">퀴즈</h2>
                    <p className="text-zinc-400">다음 문장이 맞으면 O, 틀리면 X를 선택하세요.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {currentLesson.questions?.map((q: any, index: number) => (
                    <div key={q.id} className="p-6">
                      <div className="flex gap-4 mb-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold shrink-0">
                          Q{index + 1}
                        </span>
                        <p className="font-medium text-lg leading-relaxed pt-0.5">{q.question}</p>
                      </div>
                      <div className="flex gap-4 pl-12">
                        {['O', 'X'].map((option) => (
                          <label
                            key={option}
                            className="flex-1 flex items-center justify-center gap-2 p-4 rounded-md border border-zinc-700 hover:bg-zinc-700/50 hover:border-indigo-500/50 cursor-pointer transition-all group"
                          >
                            <input type="radio" name={`quiz-${q.id}`} className="w-5 h-5 accent-indigo-500" />
                            <span className="text-xl font-bold text-zinc-400 group-hover:text-white transition-colors">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-4 border-t border-zinc-800">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-6 text-lg">
                      제출하기
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-5xl aspect-video bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center relative group overflow-hidden shadow-2xl">
                {/* Video Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <div className="w-full h-1 bg-zinc-700 rounded-full mb-4">
                    <div className="w-1/3 h-full bg-indigo-500 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <PlayCircle className="w-8 h-8 text-white fill-white/20" />
                      <span className="text-white font-medium">03:45 / {currentLesson?.duration}</span>
                    </div>
                  </div>
                </div>
                <PlayCircle className="w-16 h-16 text-zinc-700 group-hover:text-indigo-500 transition-colors duration-300" />
              </div>
            )}
          </div>

          {/* Mobile Lesson Info (Bottom) */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-900 md:hidden">
            <h2 className="font-bold text-lg mb-1">{currentLesson?.title}</h2>
            <p className="text-sm text-zinc-400">
              {course.curriculum.find((s: any) => s.id === currentLesson?.sectionId)?.title}
            </p>
          </div>
        </main>

        {/* Sidebar (Curriculum) */}
        <aside className="hidden lg:flex w-96 flex-col border-l border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="font-bold text-lg">커리큘럼</h2>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-zinc-400">
                <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[45%]" />
                </div>
                <span>45% 완료</span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <Accordion type="multiple" defaultValue={course.curriculum.map((s: any) => s.id)} className="space-y-4">
              {course.curriculum.map((section: any) => (
                <AccordionItem key={section.id} value={section.id} className="border-none">
                  <AccordionTrigger className="hover:no-underline py-2 text-sm text-zinc-400 hover:text-zinc-200">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-1 pt-1">
                      {section.lessons.map((lesson: any) => {
                        const isActive = currentLessonId === lesson.id;
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => setCurrentLessonId(lesson.id)}
                            className={cn(
                              'flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer',
                              isActive ? 'bg-indigo-500/10 text-indigo-400' : 'hover:bg-zinc-800/50 text-zinc-300'
                            )}
                          >
                            {isActive ? (
                              lesson.type === 'quiz' ? (
                                <HelpCircle className="w-4 h-4 shrink-0" />
                              ) : (
                                <PlayCircle className="w-4 h-4 shrink-0 fill-current" />
                              )
                            ) : lesson.type === 'quiz' ? (
                              <HelpCircle className="w-4 h-4 shrink-0 text-zinc-600" />
                            ) : (
                              <Lock className="w-4 h-4 shrink-0 text-zinc-600" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{lesson.title}</p>
                              <p className="text-xs opacity-70 mt-0.5">{lesson.duration}</p>
                            </div>
                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </aside>
      </div>
    </div>
  );
}
