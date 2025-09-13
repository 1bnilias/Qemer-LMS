'use client';

import { useState } from 'react';
import { Lecture } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize } from 'lucide-react';

interface LectureViewerProps {
  lecture: Lecture;
  onComplete?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function LectureViewer({
  lecture,
  onComplete,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false
}: LectureViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(lecture.watchedDuration || 0);
  const [volume] = useState(80);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / lecture.duration) * 100;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control the video player
  };

  const handleComplete = () => {
    if (progressPercentage >= 95) {
      onComplete?.();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{lecture.title}</CardTitle>
            <p className="text-muted-foreground mt-1">{lecture.description}</p>
          </div>
          <Badge variant={lecture.isCompleted ? 'default' : 'secondary'}>
            {lecture.isCompleted ? 'Completed' : 'In Progress'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Video Player Placeholder */}
        <div className="relative bg-black rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-lg">Video Player</p>
            <p className="text-sm opacity-75">Lecture: {lecture.title}</p>
            <p className="text-sm opacity-75">Duration: {lecture.duration} minutes</p>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="space-y-2">
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-1 cursor-pointer">
                <div
                  className="bg-white h-1 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onPrevious}
                    disabled={!hasPrevious}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlayPause}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNext}
                    disabled={!hasNext}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>

                  <span className="text-sm ml-2">
                    {formatTime(currentTime)} / {formatTime(lecture.duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <div className="w-20 bg-white/20 rounded-full h-1">
                    <div
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${volume}%` }}
                    />
                  </div>

                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {!lecture.isCompleted && progressPercentage >= 95 && (
            <Button onClick={handleComplete}>
              Mark as Complete
            </Button>
          )}

          {lecture.isCompleted && (
            <Badge variant="default" className="bg-green-500">
              ✓ Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
