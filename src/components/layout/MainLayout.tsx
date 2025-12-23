import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative transition-colors duration-300">
      {/* Main Content:
          - pb-32: Memberi ruang bawah yang mencukupi supaya kandungan 
            paling bawah tidak tertutup oleh Floating BottomNav.
          - max-w-lg: Mengehadkan lebar supaya nampak kemas (sama lebar dengan Nav).
          - mx-auto: Memastikan kandungan sentiasa di tengah skrin.
      */}
      <main className="pb-32 px-4 pt-6 max-w-lg mx-auto w-full animate-fade-in">
        {children}
      </main>
      
      {/* Floating Bottom Navigation:
          Pastikan di dalam BottomNav.tsx juga menggunakan max-w-lg dan px-4 
          supaya lebarnya sejajar dengan elemen main di atas.
      */}
      <BottomNav />
    </div>
  );
}