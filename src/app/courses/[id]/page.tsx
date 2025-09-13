'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { LectureViewer } from '@/components/courses/LectureViewer';
import { ReadingMaterial } from '@/components/courses/ReadingMaterial';
import { AssignmentSubmissionForm } from '@/components/courses/AssignmentSubmissionForm';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AssignmentSubmission } from '@/types';
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
  FileText,
  GraduationCap
} from 'lucide-react';
import {
  getCourseById,
  mockUser,
  mockCourseProgress
} from '@/lib/data';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;

  const course = getCourseById(courseId);
  const userProgress = mockCourseProgress.find(
    p => p.userId === mockUser.id && p.courseId === courseId
  );

  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(
    course?.lectures[0]?.id || null
  );

  const selectedLecture = course?.lectures.find(l => l.id === selectedLectureId);

  if (!course) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The course you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/catalog">Browse Courses</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const completedLectures = course.lectures.filter(l => l.isCompleted).length;
  const totalLectures = course.lectures.length;
  const overallProgress = userProgress?.overallProgress || 0;

  const handleLectureComplete = (lectureId: string) => {
    // In a real app, this would update the backend
    console.log('Lecture completed:', lectureId);
  };

  const handleReadingMarkAsRead = (materialId: string) => {
    // In a real app, this would update the backend
    console.log('Reading material marked as read:', materialId);
  };

  const handleAssignmentSubmit = (assignmentId: string, submission: AssignmentSubmission) => {
    // In a real app, this would submit to the backend
    console.log('Assignment submitted:', assignmentId, submission);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/catalog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Link>
          </Button>
        </div>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground text-lg mb-4">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-1">
                <span className="font-medium">Instructor:</span>
                <span>{course.instructor}</span>
              </div>
              <Badge variant="outline">{course.category}</Badge>
              <Badge variant="secondary">{course.level}</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <span className="font-medium">{course.duration}h</span>
                  <p className="text-muted-foreground text-xs">Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <div>
                  <span className="font-medium">{course.enrolledStudents}</span>
                  <p className="text-muted-foreground text-xs">Enrolled</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400" />
                <div>
                  <span className="font-medium">{course.rating}</span>
                  <p className="text-muted-foreground text-xs">Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">C</span>
                </div>
                <div>
                  <span className="font-medium">{(course as any).credits || 3}</span>
                  <p className="text-muted-foreground text-xs">Credits</p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Course Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Department:</span>
                  <p className="font-medium">{(course as any).department || course.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Semester:</span>
                  <p className="font-medium">{(course as any).semester || 'Fall 2024'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Level:</span>
                  <p className="font-medium">{course.level}</p>
                </div>
              </div>
              {(course as any).prerequisites && (course as any).prerequisites.length > 0 && (
                <div className="mt-3">
                  <span className="text-muted-foreground text-sm">Prerequisites:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(course as any).prerequisites.map((prereq: string) => (
                      <Badge key={prereq} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressBar
                  value={overallProgress}
                  showLabel={true}
                  label={`${overallProgress}% Complete`}
                  className="mb-4"
                />
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>{completedLectures} of {totalLectures} lectures completed</div>
                  <div>{course.assignments.filter(a => a.isSubmitted).length} of {course.assignments.length} assignments submitted</div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Progress Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Academic Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Credits</span>
                    <span className="text-lg font-bold text-primary">{(course as any).credits || 3}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Grade</span>
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      In Progress
                    </Badge>
                  </div>
                  {(course as any).maxEnrollment && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Class Size</span>
                      <span className="text-sm text-muted-foreground">
                        {course.enrolledStudents}/{(course as any).maxEnrollment}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lectures">Lectures</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>What You&apos;ll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {course.syllabus.slice(0, 6).map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Lectures</span>
                    <span className="font-medium">{course.lectures.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assignments</span>
                    <span className="font-medium">{course.assignments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reading Materials</span>
                    <span className="font-medium">{course.readingMaterials.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language</span>
                    <span className="font-medium">English</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Last Updated</span>
                    <span>{course.updatedAt.toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Lectures Tab */}
          <TabsContent value="lectures" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lecture List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PlayCircle className="w-5 h-5" />
                      Course Lectures
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {course.lectures.map((lecture) => (
                        <button
                          key={lecture.id}
                          onClick={() => setSelectedLectureId(lecture.id)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            selectedLectureId === lecture.id
                              ? 'bg-primary/10 border-primary'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lecture.isCompleted
                                ? 'bg-green-500 text-white'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {lecture.isCompleted ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <PlayCircle className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-1">
                                {lecture.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {lecture.duration} min
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lecture Viewer */}
              <div className="lg:col-span-2">
                {selectedLecture && (
                  <LectureViewer
                    lecture={selectedLecture}
                    onComplete={() => handleLectureComplete(selectedLecture.id)}
                    onNext={() => {
                      const currentIndex = course.lectures.findIndex(l => l.id === selectedLecture.id);
                      const nextLecture = course.lectures[currentIndex + 1];
                      if (nextLecture) setSelectedLectureId(nextLecture.id);
                    }}
                    onPrevious={() => {
                      const currentIndex = course.lectures.findIndex(l => l.id === selectedLecture.id);
                      const prevLecture = course.lectures[currentIndex - 1];
                      if (prevLecture) setSelectedLectureId(prevLecture.id);
                    }}
                    hasNext={course.lectures.findIndex(l => l.id === selectedLecture.id) < course.lectures.length - 1}
                    hasPrevious={course.lectures.findIndex(l => l.id === selectedLecture.id) > 0}
                  />
                )}
              </div>
            </div>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Reading Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.readingMaterials.map((material) => (
                    <ReadingMaterial
                      key={material.id}
                      material={material}
                      onMarkAsRead={() => handleReadingMarkAsRead(material.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="space-y-6">
              {course.assignments.map((assignment) => (
                <AssignmentSubmissionForm
                  key={assignment.id}
                  assignment={assignment}
                  onSubmit={(submission) => handleAssignmentSubmit(assignment.id, submission)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
