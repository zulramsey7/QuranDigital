import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Bookmark {
  id: string;
  type: 'ayat' | 'doa' | 'tasbih';
  title: string;
  content: string;
  timestamp: number;
  metadata?: {
    surah?: number;
    ayah?: number;
    path?: string;
  };
}

export interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (title: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('quran-bookmarks');
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quran-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setBookmarks([newBookmark, ...bookmarks]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const isBookmarked = (title: string) => {
    return bookmarks.some((b) => b.title === title);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
}
