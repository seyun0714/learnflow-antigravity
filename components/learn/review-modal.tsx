'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  initialRating?: number;
  initialContent?: string;
  onSave: (rating: number, content: string) => void;
  onDelete?: () => void;
}

export function ReviewModal({
  isOpen,
  onClose,
  courseTitle,
  initialRating = 5,
  initialContent = '',
  onSave,
  onDelete,
}: ReviewModalProps) {
  const [rating, setRating] = useState(initialRating);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (isOpen) {
      setRating(initialRating);
      setContent(initialContent);
    }
  }, [isOpen, initialRating, initialContent]);

  const handleSave = () => {
    onSave(rating, content);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>리뷰 작성</DialogTitle>
          <DialogDescription className="text-zinc-400">
            <span className="font-semibold text-zinc-200">{courseTitle}</span> 강의는 어떠셨나요?
            <br />
            솔직한 리뷰를 남겨주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      'w-8 h-8 transition-colors',
                      star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-zinc-600'
                    )}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm font-medium text-zinc-400">
              {rating}점 -{' '}
              {rating === 5 ? '최고예요!' : rating >= 4 ? '좋아요' : rating >= 3 ? '보통이에요' : '별로예요'}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">리뷰 내용</label>
            <Textarea
              placeholder="강의의 장점, 단점, 바라는 점 등을 자유롭게 적어주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] bg-zinc-950/50 border-zinc-800 focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        <DialogFooter className="flex sm:justify-end gap-2">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="border-zinc-700 hover:bg-zinc-800 text-zinc-300">
              취소
            </Button>
            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              저장하기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
