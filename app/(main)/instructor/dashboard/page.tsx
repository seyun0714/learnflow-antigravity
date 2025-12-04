import Link from "next/link"
import { courses } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, MoreVertical, Edit, Trash, Users, DollarSign } from "lucide-react"

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
            <Plus className="mr-2 h-4 w-4" />
            새 강의 만들기
          </Link>
        </Button>
      </div>

      <div className="rounded-md border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm text-left">
            <thead className="[&_tr]:border-b [&_tr]:border-zinc-800">
              <tr className="border-b border-zinc-800 transition-colors hover:bg-zinc-900/50 data-[state=selected]:bg-zinc-900">
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">강의명</th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">상태</th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">가격</th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">수강생</th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">평점</th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">관리</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-zinc-800 transition-colors hover:bg-zinc-900/50">
                  <td className="p-4 align-middle font-medium">{course.title}</td>
                  <td className="p-4 align-middle">
                    <Badge variant="secondary" className="bg-green-500/10 text-green-400 hover:bg-green-500/20">
                      공개됨
                    </Badge>
                  </td>
                  <td className="p-4 align-middle">
                    {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(course.price)}
                  </td>
                  <td className="p-4 align-middle">{course.studentCount.toLocaleString()}명</td>
                  <td className="p-4 align-middle">{course.rating}</td>
                  <td className="p-4 align-middle text-right">
                    <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
