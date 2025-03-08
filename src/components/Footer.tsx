import { BookMarked, MessageSquare } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-between gap-4 z-10">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span>© 2023 Breakthrough Coach</span>
      </div>
      
      <div className="flex items-center gap-4">
        <a 
          href="#" 
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-teal-300 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            alert("Thank you for using Breakthrough Coach!");
          }}
        >
          <BookMarked className="h-4 w-4" />
          <span>Resources</span>
        </a>
        
        <a 
          href="#" 
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-teal-300 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            alert("We appreciate your feedback!");
          }}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Feedback</span>
        </a>
      </div>
    </footer>
  );
};
