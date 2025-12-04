'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Plus, GripVertical, Edit, Trash2, Video, FileQuestion, Save, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

type LessonType = 'video' | 'quiz';

interface QuizQuestion {
  id: string;
  question: string;
  answer: 'O' | 'X';
}

interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  videoUrl?: string;
  questions?: QuizQuestion[];
  isEditing?: boolean;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function CreateCoursePage() {
  const [step, setStep] = useState(1);
  const [sections, setSections] = useState<Section[]>([{ id: 'sec-1', title: '챕터 1: 소개', lessons: [] }]);
  const [thumbnail, setThumbnail] = useState(
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop'
  );

  // Temporary state for new quiz question
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState<'O' | 'X'>('O');

  const handleSaveBasicInfo = () => {
    // In a real app, save to API here
    console.log('Basic info saved');
    setStep(2);
  };

  const addSection = () => {
    const newSection: Section = {
      id: `sec-${Date.now()}`,
      title: `챕터 ${sections.length + 1}: 새로운 챕터`,
      lessons: [],
    };
    setSections([...sections, newSection]);
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, title } : section)));
  };

  const addLesson = (sectionId: string, type: LessonType) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: [
              ...section.lessons,
              {
                id: `less-${Date.now()}`,
                title: `새로운 ${type === 'video' ? '영상' : '퀴즈'} 레슨`,
                type,
                questions: [],
                isEditing: true,
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const updateLessonTitle = (sectionId: string, lessonId: string, title: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, title } : lesson)),
          };
        }
        return section;
      })
    );
  };

  const toggleEditLesson = (sectionId: string, lessonId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map((lesson) =>
              lesson.id === lessonId ? { ...lesson, isEditing: !lesson.isEditing } : lesson
            ),
          };
        }
        return section;
      })
    );
  };

  const addQuestionToQuiz = (sectionId: string, lessonId: string) => {
    if (!newQuestion) return;

    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  questions: [
                    ...(lesson.questions || []),
                    {
                      id: `q-${Date.now()}`,
                      question: newQuestion,
                      answer: newAnswer,
                    },
                  ],
                };
              }
              return lesson;
            }),
          };
        }
        return section;
      })
    );
    setNewQuestion('');
    setNewAnswer('O');
  };

  const removeQuestion = (sectionId: string, lessonId: string, questionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  questions: lesson.questions?.filter((q) => q.id !== questionId),
                };
              }
              return lesson;
            }),
          };
        }
        return section;
      })
    );
  };

  return (
    <div className="container px-4 md:px-8 py-12 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">새 강의 만들기</h1>
        <div className="flex gap-2">
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)} className="border-zinc-700 hover:bg-zinc-800">
              이전 단계
            </Button>
          )}
          {step === 2 ? (
            <Button className="bg-white text-zinc-950 hover:bg-zinc-200">강의 등록</Button>
          ) : (
            <Button onClick={handleSaveBasicInfo} className="bg-white text-zinc-950 hover:bg-zinc-200">
              저장하고 다음
            </Button>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center gap-4">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-indigo-500' : 'text-zinc-500'}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? 'border-indigo-500 bg-indigo-500/10' : 'border-zinc-700'
            }`}
          >
            1
          </div>
          <span className="font-medium">기본 정보</span>
        </div>
        <div className="w-12 h-px bg-zinc-800" />
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-indigo-500' : 'text-zinc-500'}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? 'border-indigo-500 bg-indigo-500/10' : 'border-zinc-700'
            }`}
          >
            2
          </div>
          <span className="font-medium">커리큘럼</span>
        </div>
      </div>

      {step === 1 && (
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>강의 정보</CardTitle>
                <CardDescription>강의의 기본 정보를 입력해주세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">강의 제목</label>
                  <Input placeholder="예: Next.js 15 완벽 가이드" className="bg-zinc-950/50 border-zinc-800" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">카테고리</label>
                    <select className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">카테고리 선택</option>
                      <option value="development">개발</option>
                      <option value="design">디자인</option>
                      <option value="business">비즈니스</option>
                      <option value="marketing">마케팅</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">난이도</label>
                    <select className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="">난이도 선택</option>
                      <option value="beginner">입문</option>
                      <option value="intermediate">중급</option>
                      <option value="advanced">고급</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">강의 설명</label>
                  <Input
                    placeholder="강의의 특징을 한 문장으로 설명해주세요"
                    className="bg-zinc-950/50 border-zinc-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">상세 내용</label>
                  <textarea
                    className="flex min-h-[150px] w-full rounded-xl border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="강의에 대한 자세한 설명을 입력해주세요."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle>썸네일</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center text-zinc-500 hover:border-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer relative overflow-hidden group">
                  {thumbnail ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="w-8 h-8 mb-2 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-sm">이미지 업로드</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle>커리큘럼 구성</CardTitle>
              <CardDescription>챕터와 레슨을 추가하여 커리큘럼을 완성하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {sections.map((section, sIndex) => (
                <div key={section.id} className="border border-zinc-800 rounded-lg p-4 bg-zinc-950/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 flex-1 mr-4">
                      <GripVertical className="text-zinc-600 cursor-move flex-shrink-0" />
                      <Input
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        className="font-bold bg-transparent border-transparent hover:border-zinc-800 focus:bg-zinc-950 focus:border-zinc-800 transition-colors h-9"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-red-400">
                        삭제
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 pl-4 md:pl-8">
                    {section.lessons.map((lesson, lIndex) => (
                      <div key={lesson.id} className="bg-zinc-900 rounded border border-zinc-800 overflow-hidden">
                        <div className="flex items-center justify-between p-3 bg-zinc-900/50">
                          <div className="flex items-center gap-3">
                            <GripVertical className="text-zinc-600 cursor-move w-4 h-4" />
                            {lesson.type === 'video' ? (
                              <Video className="w-4 h-4 text-blue-400" />
                            ) : (
                              <FileQuestion className="w-4 h-4 text-green-400" />
                            )}
                            <span className="text-sm font-medium">{lesson.title}</span>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleEditLesson(section.id, lesson.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Lesson Editor */}
                        {lesson.isEditing && (
                          <div className="p-4 border-t border-zinc-800 bg-zinc-950/30 space-y-4">
                            <div className="space-y-2">
                              <label className="text-xs font-medium text-muted-foreground">레슨 제목</label>
                              <Input
                                value={lesson.title}
                                onChange={(e) => updateLessonTitle(section.id, lesson.id, e.target.value)}
                                className="bg-zinc-950 border-zinc-800 h-9"
                              />
                            </div>

                            {lesson.type === 'video' && (
                              <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground">영상 업로드</label>
                                <div className="flex gap-2">
                                  <Input
                                    type="file"
                                    className="bg-zinc-950 border-zinc-800 text-sm file:bg-zinc-800 file:text-zinc-200 file:border-0 file:mr-4 file:py-1 file:px-2 file:rounded-md"
                                  />
                                  <Button size="sm" variant="secondary">
                                    업로드
                                  </Button>
                                </div>
                              </div>
                            )}

                            {lesson.type === 'quiz' && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label className="text-xs font-medium text-muted-foreground">OX 퀴즈 문제 목록</label>
                                  {lesson.questions && lesson.questions.length > 0 && (
                                    <div className="space-y-2">
                                      {lesson.questions.map((q, qIndex) => (
                                        <div
                                          key={q.id}
                                          className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 text-sm"
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">{qIndex + 1}.</span>
                                            <span>{q.question}</span>
                                            <Badge
                                              variant={q.answer === 'O' ? 'default' : 'destructive'}
                                              className="ml-2"
                                            >
                                              {q.answer}
                                            </Badge>
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 text-red-400"
                                            onClick={() => removeQuestion(section.id, lesson.id, q.id)}
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <div className="p-3 rounded border border-zinc-800 bg-zinc-900/50 space-y-3">
                                  <div className="space-y-1">
                                    <label className="text-xs font-medium">새 문제 입력</label>
                                    <Input
                                      placeholder="문제를 입력하세요"
                                      value={newQuestion}
                                      onChange={(e) => setNewQuestion(e.target.value)}
                                      className="bg-zinc-950 border-zinc-800 h-8 text-sm"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium">정답:</span>
                                    <RadioGroup
                                      value={newAnswer}
                                      onValueChange={(v: string) => setNewAnswer(v as 'O' | 'X')}
                                      className="flex gap-2"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="O" id="r-o" />
                                        <Label htmlFor="r-o">O</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="X" id="r-x" />
                                        <Label htmlFor="r-x">X</Label>
                                      </div>
                                    </RadioGroup>
                                    <Button
                                      size="sm"
                                      onClick={() => addQuestionToQuiz(section.id, lesson.id)}
                                      className="ml-auto h-8"
                                    >
                                      문제 추가
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex justify-end pt-2">
                              <Button
                                size="sm"
                                onClick={() => toggleEditLesson(section.id, lesson.id)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                              >
                                <Save className="w-3 h-3 mr-1" /> 저장 완료
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addLesson(section.id, 'video')}
                        className="flex-1 border-dashed border-zinc-700 hover:bg-zinc-800 text-zinc-400"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        영상 레슨 추가
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addLesson(section.id, 'quiz')}
                        className="flex-1 border-dashed border-zinc-700 hover:bg-zinc-800 text-zinc-400"
                      >
                        <FileQuestion className="w-4 h-4 mr-2" />
                        OX 퀴즈 추가
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addSection} className="w-full border-zinc-700 hover:bg-zinc-800 py-6">
                <Plus className="w-4 h-4 mr-2" />새 챕터 추가
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
