'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Edit, Trash, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Course {
  id: string;
  title: string;
  category: string;
  studentCount: number;
  rating: number;
  // Add other necessary fields
}

interface InstructorCourseTableProps {
  courses: Course[];
}

export function InstructorCourseTable({ courses }: InstructorCourseTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedIds.length === courses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(courses.map((c) => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isAllSelected = courses.length > 0 && selectedIds.length === courses.length;
  const isAnySelected = selectedIds.length > 0;

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm text-left">
          <thead className="[&_tr]:border-b [&_tr]:border-zinc-800">
            <tr className="border-b border-zinc-800 transition-colors hover:bg-zinc-900/50 data-[state=selected]:bg-zinc-900">
              <th className="h-12 px-4 align-middle w-[50px]">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-zinc-900"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              {isAnySelected ? (
                <th colSpan={5} className="h-12 px-4 align-middle">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-400">{selectedIds.length}개 선택됨</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 px-3 text-xs bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                    >
                      <Trash className="w-3 h-3 mr-1.5" />
                      삭제
                    </Button>
                  </div>
                </th>
              ) : (
                <>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">강의명</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">카테고리</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">상태</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">수강생</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">평점</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">관리</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {courses.map((course) => (
              <tr
                key={course.id}
                className={cn(
                  'border-b border-zinc-800 transition-colors hover:bg-zinc-900/50',
                  selectedIds.includes(course.id) && 'bg-zinc-900/80'
                )}
              >
                <td className="p-4 align-middle">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-zinc-900"
                    checked={selectedIds.includes(course.id)}
                    onChange={() => toggleSelect(course.id)}
                  />
                </td>
                <td className="p-4 align-middle font-medium">{course.title}</td>
                <td className="p-4 align-middle">
                  <Badge variant="outline" className="text-zinc-400 border-zinc-700">
                    {course.category}
                  </Badge>
                </td>
                <td className="p-4 align-middle">
                  {/* Custom Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    <span className="ml-3 text-sm font-medium text-zinc-400 peer-checked:text-indigo-400">공개</span>
                  </label>
                </td>
                <td className="p-4 align-middle">{course.studentCount.toLocaleString()}명</td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </td>
                <td className="p-4 align-middle text-right relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-zinc-800"
                    onClick={() => setOpenMenuId(openMenuId === course.id ? null : course.id)}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>

                  {/* Custom Dropdown Menu */}
                  {openMenuId === course.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-8 top-8 z-20 w-32 rounded-md border border-zinc-800 bg-zinc-950 shadow-lg p-1">
                        <button className="w-full flex items-center px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded-sm">
                          <Edit className="w-4 h-4 mr-2" />
                          강의 수정
                        </button>
                        <button className="w-full flex items-center px-2 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-sm">
                          <Trash className="w-4 h-4 mr-2" />
                          강의 삭제
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
