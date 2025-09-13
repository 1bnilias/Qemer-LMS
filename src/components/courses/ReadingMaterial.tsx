'use client';

import { ReadingMaterial as ReadingMaterialType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  ExternalLink,
  BookOpen,
  Download,
  Eye,
  CheckCircle
} from 'lucide-react';

interface ReadingMaterialProps {
  material: ReadingMaterialType;
  onMarkAsRead?: () => void;
}

export function ReadingMaterial({ material, onMarkAsRead }: ReadingMaterialProps) {
  const getIcon = () => {
    switch (material.type) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'ebook':
        return <BookOpen className="w-5 h-5" />;
      case 'webpage':
        return <ExternalLink className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getActionButton = () => {
    switch (material.type) {
      case 'pdf':
      case 'ebook':
        return (
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        );
      case 'article':
      case 'webpage':
        return (
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`transition-colors ${material.isRead ? 'bg-muted/50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-muted-foreground">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg line-clamp-1">
                {material.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {material.description}
              </p>
            </div>
          </div>

          {material.isRead && (
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              Read
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="outline" className="text-xs capitalize">
              {material.type}
            </Badge>

            {material.fileSize && (
              <span>{material.fileSize} MB</span>
            )}
          </div>

          <div className="flex gap-2">
            {getActionButton()}

            {!material.isRead && onMarkAsRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAsRead}
              >
                Mark as Read
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
