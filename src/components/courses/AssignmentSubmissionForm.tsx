'use client';

import { useState } from 'react';
import { Assignment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Upload,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';

interface AssignmentSubmissionFormProps {
  assignment: Assignment;
  onSubmit?: (submission: { content: string; files: File[] }) => void;
}

export function AssignmentSubmissionForm({ assignment, onSubmit }: AssignmentSubmissionFormProps) {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const daysUntilDue = Math.ceil(
    (assignment.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim() && files.length === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.({ content, files });
      // Reset form on success
      setContent('');
      setFiles([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (assignment.isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-800">Assignment Submitted</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-green-700">
              You submitted this assignment on {assignment.submittedAt?.toLocaleDateString()}.
            </p>
            {assignment.score !== undefined && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Score:</span>
                <Badge variant="secondary">
                  {assignment.score}/{assignment.maxScore} points
                </Badge>
              </div>
            )}
            {assignment.feedback && (
              <div>
                <h4 className="font-medium mb-1">Feedback:</h4>
                <p className="text-sm text-muted-foreground bg-white p-3 rounded border">
                  {assignment.feedback}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Submit Assignment
          </CardTitle>

          <div className="flex items-center gap-2">
            {daysUntilDue <= 1 ? (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {daysUntilDue <= 0 ? 'Overdue' : 'Due soon'}
              </Badge>
            ) : (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {daysUntilDue} days left
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Assignment Details */}
        <div>
          <h3 className="font-medium mb-2">{assignment.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {assignment.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Due: {assignment.dueDate.toLocaleDateString()}
            </div>
            <div>Max Score: {assignment.maxScore} points</div>
          </div>
        </div>

        <Separator />

        {/* Instructions */}
        <div>
          <h4 className="font-medium mb-2">Instructions</h4>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm whitespace-pre-line">{assignment.instructions}</p>
          </div>
        </div>

        {/* Submission Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Answer *
            </label>
            <Textarea
              placeholder="Write your answer here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Attachments (Optional)
            </label>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt,.zip"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>Choose Files</span>
                  </Button>
                </label>
              </div>
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || (!content.trim() && files.length === 0)}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
