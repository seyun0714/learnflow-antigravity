import { notFound } from "next/navigation"
import { courses } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, Users, PlayCircle, CheckCircle, FileText, Clock } from "lucide-react"

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = courses.find((c) => c.id === id)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="relative bg-zinc-900 border-b border-zinc-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/50 z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
        </div>

        <div className="container relative z-20 px-4 md:px-8 py-12 md:py-16 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20">
                {course.category.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                <span>{course.rating}</span>
                <span className="text-muted-foreground ml-1">({course.studentCount.toLocaleString()}명 수강)</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {course.title}
            </h1>
            
            <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
              {course.description}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 font-bold">
                  {course.instructor[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{course.instructor}</p>
                  <p className="text-xs text-zinc-400">대표 강사</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card (Desktop) / Inline (Mobile) */}
          <div className="w-full md:w-80 lg:w-96 shrink-0">
            <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-6 sticky top-24">
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">수강료</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-white">
                    {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(course.price)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full h-12 text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200">
                  수강 신청하기
                </Button>
                <Button variant="outline" className="w-full h-12 text-lg border-zinc-700 hover:bg-zinc-800">
                  장바구니 담기
                </Button>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <PlayCircle className="w-5 h-5 text-indigo-400" />
                  <span>20시간 분량의 동영상 강의</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <span>실습 파일 및 강의 자료 제공</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                  <span>수료증 발급</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container px-4 md:px-8 py-12">
        <div className="md:w-2/3 pr-0 md:pr-12">
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-zinc-800 rounded-none h-auto p-0 mb-8">
              <TabsTrigger 
                value="curriculum" 
                className="rounded-none border-b-2 border-transparent px-6 py-3 text-base font-medium data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:text-indigo-400"
              >
                커리큘럼
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent px-6 py-3 text-base font-medium data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:text-indigo-400"
              >
                수강평
              </TabsTrigger>
              <TabsTrigger 
                value="instructor" 
                className="rounded-none border-b-2 border-transparent px-6 py-3 text-base font-medium data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:text-indigo-400"
              >
                강사 소개
              </TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">강의 목차</h3>
                <span className="text-sm text-muted-foreground">총 {course.curriculum.length}개 섹션</span>
              </div>
              
              {course.curriculum.length > 0 ? (
                <Accordion type="multiple" className="w-full space-y-4">
                  {course.curriculum.map((section) => (
                    <AccordionItem key={section.id} value={section.id} className="border border-zinc-800 rounded-lg px-4 bg-zinc-900/30">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <span className="font-semibold text-left">{section.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-2 pt-2">
                          {section.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center justify-between p-3 rounded-md hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <PlayCircle className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-zinc-500">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-zinc-900/30 rounded-lg border border-zinc-800 border-dashed">
                  커리큘럼 준비 중입니다.
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews">
              <div className="text-center py-12 text-muted-foreground bg-zinc-900/30 rounded-lg border border-zinc-800 border-dashed">
                아직 작성된 수강평이 없습니다.
              </div>
            </TabsContent>

            <TabsContent value="instructor">
              <div className="bg-zinc-900/30 rounded-lg border border-zinc-800 p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-2xl font-bold text-zinc-300 shrink-0">
                    {course.instructor[0]}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{course.instructor}</h3>
                      <p className="text-indigo-400 font-medium">Senior Developer</p>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      10년차 풀스택 개발자입니다. 실무에서 바로 사용할 수 있는 기술을 중심으로 강의합니다.
                      복잡한 개념을 쉽게 설명하는 것을 좋아하며, 수강생 여러분의 성장을 돕고 싶습니다.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
