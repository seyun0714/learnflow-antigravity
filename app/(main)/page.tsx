"use client"

import Link from "next/link"
import { Star, Users, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { courses, categories } from "@/lib/mock-data"
import { useState, useMemo } from "react"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedSort, setSelectedSort] = useState("popular")

  const filteredCourses = useMemo(() => {
    let result = [...courses]

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(course => course.category === selectedCategory)
    }

    // Difficulty Filter
    if (selectedDifficulty !== "all") {
      // @ts-ignore - mock data updated but TS might not know yet
      result = result.filter(course => course.difficulty === selectedDifficulty)
    }

    // Sorting
    switch (selectedSort) {
      case "popular":
        result.sort((a, b) => b.studentCount - a.studentCount)
        break
      case "newest":
        // @ts-ignore
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  }, [selectedCategory, selectedDifficulty, selectedSort])

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-background to-background pointer-events-none" />
        <div className="container px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              성장을 위한 <span className="text-indigo-500">최고의 선택</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              자유롭게 학습하고 지식을 공유하세요.
              <br className="hidden md:block" />
              당신의 커리어 성장을 LearnFlow가 함께합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-12 md:py-20 bg-background flex justify-center items-center">
        <div className="container px-4 md:px-8">
          
          {/* Filters and Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category.id} 
                  variant={selectedCategory === category.value ? "default" : "secondary"}
                  className="px-4 py-2 text-sm cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Right Side Filters */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select 
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">모든 난이도</option>
                <option value="beginner">입문</option>
                <option value="intermediate">중급</option>
                <option value="advanced">고급</option>
              </select>

              <select 
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="popular">인기 순</option>
                <option value="newest">최신 순</option>
                <option value="rating">별점 높은 순</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id} className="group">
                <Card className="h-full overflow-hidden border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white opacity-80" />
                    </div>
                  </div>
                  <CardHeader className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-indigo-400">{course.category.toUpperCase()}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-bold leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor}
                    </p>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{course.studentCount.toLocaleString()}명</span>
                    </div>
                    <span className="font-bold text-lg">
                      {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(course.price)}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
