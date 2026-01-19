import { useBookmarks } from '@/contexts/BookmarkContext';
import { Bookmark, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

export function BookmarkButton({
  title,
  content,
  type = 'ayat',
}: {
  title: string;
  content: string;
  type?: 'ayat' | 'doa' | 'tasbih';
}) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(title);

  const toggleBookmark = () => {
    if (bookmarked) {
      const bookmarks = JSON.parse(localStorage.getItem('quran-bookmarks') || '[]');
      const bookmark = bookmarks.find((b: { title: string; id: string }) => b.title === title);
      if (bookmark?.id) {
        removeBookmark(bookmark.id);
      }
    } else {
      addBookmark({ type, title, content });
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`p-2 rounded-full transition-colors ${
        bookmarked
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary hover:bg-secondary/80'
      }`}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
    </button>
  );
}

export function BookmarksList() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const navigate = useNavigate();

  const handleNavigate = (bookmark: import('@/contexts/BookmarkContext').Bookmark) => {
    if (bookmark.metadata?.surah) {
      navigate('/quran', {
        state: {
          surahNumber: bookmark.metadata.surah,
          ayahNumber: bookmark.metadata.ayah,
        },
      });
    } else {
      navigate('/quran');
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No bookmarks yet. Start saving your favorites!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="floating-card p-4 flex items-start justify-between gap-4 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          onClick={() => handleNavigate(bookmark)}
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors flex items-center gap-2">
              {bookmark.title}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {bookmark.content}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {format(new Date(bookmark.timestamp), 'MMM d, yyyy')}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Elakkan trigger navigasi bila delete
              removeBookmark(bookmark.id);
            }}
            className="p-2 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function BookmarksDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
          <Bookmark className="w-4 h-4" />
          <span>Bookmarks</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>My Bookmarks</DialogTitle>
          <DialogDescription>
            Your saved ayat, doa, and tasbih
          </DialogDescription>
        </DialogHeader>
        <BookmarksList />
      </DialogContent>
    </Dialog>
  );
}
