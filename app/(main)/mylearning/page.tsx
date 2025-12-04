import Link from "next/link"
import { courses, myLearning } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayCircle, Clock } from "lucide-react"

export default function MyLearningPage() {
  // Join myLearning with course data
  const enrolledCourses = myLearning.map(item => {
    const course = courses.find(c => c.id === item.courseId)
    return { ...item, course }
  }).filter(item => item.course)

  return (
    <div className="container px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">내 강의실</h1>
      </div>

      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="in-progress">수강 중 ({enrolledCourses.filter(c => c.status === 'in-progress').length})</TabsTrigger>
          <TabsTrigger value="completed">완료 ({enrolledCourses.filter(c => c.status === 'completed').length})</TabsTrigger>
          <TabsTrigger value="wishlist">찜한 강의 (0)</TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.filter(c => c.status === 'in-progress').map((item) => (
              <Card key={item.courseId} className="border-none bg-transparent overflow-hidden transition-colors group">
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
                <CardContent className="p-4 space-y-4">

                  <h3 className="font-bold line-clamp-2">{item.course?.title}</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400 pt-4">
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
                </CardContent>
                <CardFooter className="p-1 pt-0">
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.filter(c => c.status === 'completed').map((item) => (
              <Card key={item.courseId} className="bg-zinc-900/50 border-zinc-800 overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                 <div className="aspect-video relative bg-zinc-800 grayscale">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.course?.thumbnail} 
                    alt={item.course?.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-white font-bold border-2 border-white px-4 py-1 rounded-full">수강 완료</span>
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
    </div>
  )
}
