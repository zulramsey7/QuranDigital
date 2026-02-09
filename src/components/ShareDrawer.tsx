import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Copy, Share2, MessageCircle, Send, Facebook, Twitter, Mail, Linkedin } from "lucide-react";
import { toast } from "sonner";

export function ShareDrawer({ children }: { children: React.ReactNode }) {
  const shareUrl = window.location.origin;
  const shareText = "Jom mengaji dan hayati Al-Quran dengan aplikasi QuranDigital! 📖✨";
  const fullShareText = `${shareText}\n\nLayari: ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShareText);
    toast.success("Pautan berjaya disalin!");
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(fullShareText)}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };
  
  const handleFacebook = () => {
     window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };
  
  const handleTwitter = () => {
     window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:?subject=Aplikasi QuranDigital&body=${encodeURIComponent(fullShareText)}`);
  };

  const handleLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleSystemShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QuranDigital',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Fungsi kongsi sistem tidak disokong di peranti ini.");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl font-bold">Kongsi Kebaikan</DrawerTitle>
            <DrawerDescription className="text-center text-xs">
              "Sampaikanlah dariku walau satu ayat"
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-6 pb-2">
            <div className="grid grid-cols-3 gap-4 mb-6">
                <button onClick={handleWhatsApp} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center group-active:scale-90 transition-transform shadow-sm">
                        <MessageCircle className="w-7 h-7 text-[#25D366] fill-current" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">WhatsApp</span>
                </button>
                
                <button onClick={handleTelegram} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#0088cc]/10 border border-[#0088cc]/20 flex items-center justify-center group-active:scale-90 transition-transform shadow-sm">
                        <Send className="w-7 h-7 text-[#0088cc] fill-current" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Telegram</span>
                </button>

                <button onClick={handleFacebook} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center group-active:scale-90 transition-transform shadow-sm">
                        <Facebook className="w-7 h-7 text-[#1877F2] fill-current" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Facebook</span>
                </button>

                <button onClick={handleTwitter} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center group-active:scale-90 transition-transform shadow-sm">
                        <Twitter className="w-7 h-7 text-slate-800 dark:text-white fill-current" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Twitter</span>
                </button>

                <button onClick={handleEmail} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-active:scale-90 transition-transform shadow-sm">
                        <Mail className="w-7 h-7 text-orange-500" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Emel</span>
                </button>

                <button onClick={handleLinkedin} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-[#0077b5]/10 border border-[#0077b5]/20 flex items-center justify-center group-active:scale-90 transition-transform shadow-sm">
                        <Linkedin className="w-7 h-7 text-[#0077b5] fill-current" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">LinkedIn</span>
                </button>
            </div>

            <div className="flex gap-3">
                 <button onClick={handleCopy} className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Salin Pautan</span>
                 </button>
                 <button onClick={handleSystemShare} className="flex-1 py-3 rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Lagi...</span>
                 </button>
            </div>
            
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost" className="h-12 rounded-xl text-muted-foreground">Tutup</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
