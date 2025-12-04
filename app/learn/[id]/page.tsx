import { notFound } from "next/navigation"
import Link from "next/link"
import { courses } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronLeft, PlayCircle, CheckCircle, Lock, Menu } from "lucide-react"

export default async function LearningPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = courses.find((c) => c.id === id)

  if (!course) {
    notFound()
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 bg-zinc-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white hover:bg-zinc-800">
            <Link href={`/courses/${id}`}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="font-medium text-sm md:text-base truncate max-w-[200px] md:max-w-md">
            {course.title}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-zinc-400">
            <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[45%]" />
            </div>
            <span>45% 완료</span>
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex border-zinc-700 hover:bg-zinc-800">
            수강평 작성
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content (Video) */}
        <main className="flex-1 flex flex-col bg-black relative">
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12">
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
                    <span className="text-white font-medium">03:45 / 10:00</span>
                  </div>
                </div>
              </div>
              <PlayCircle className="w-16 h-16 text-zinc-700 group-hover:text-indigo-500 transition-colors duration-300" />
            </div>
          </div>
          
          {/* Mobile Lesson Info (Bottom) */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-900 md:hidden">
             <h2 className="font-bold text-lg mb-1">1. Next.js란 무엇인가?</h2>
             <p className="text-sm text-zinc-400">섹션 1: Next.js 소개 및 환경 설정</p>
          </div>
        </main>

        {/* Sidebar (Curriculum) */}
        <aside className="hidden lg:flex w-96 flex-col border-l border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <div className="p-4 border-b border-zinc-800">
            <h2 className="font-bold text-lg">커리큘럼</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <Accordion type="multiple" defaultValue={["sec-1"]} className="space-y-4">
              {course.curriculum.map((section) => (
                <AccordionItem key={section.id} value={section.id} className="border-none">
                  <AccordionTrigger className="hover:no-underline py-2 text-sm text-zinc-400 hover:text-zinc-200">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-1 pt-1">
                      {section.lessons.map((lesson, index) => (
                        <div 
                          key={lesson.id} 
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                            index === 0 && section.id === 'sec-1' 
                              ? "bg-indigo-500/10 text-indigo-400" 
                              : "hover:bg-zinc-800/50 text-zinc-300"
                          }`}
                        >
                          {index === 0 && section.id === 'sec-1' ? (
                            <PlayCircle className="w-4 h-4 shrink-0 fill-current" />
                          ) : (
                            <Lock className="w-4 h-4 shrink-0 text-zinc-600" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{lesson.title}</p>
                            <p className="text-xs opacity-70 mt-0.5">{lesson.duration}</p>
                          </div>
                          {index === 0 && section.id === 'sec-1' && (
                             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </aside>
      </div>
    </div>
  )
}
