
import { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserDropdownProps {
  userEmail: string;
  onLogout: () => void;
}

const UserDropdown = ({ userEmail, onLogout }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // Only close if clicking outside the entire dropdown container
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Only add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("click", handleDocumentClick);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="relative" ref={containerRef}>
      <Button
        variant="ghost"
        className="text-indigo-200 hover:text-white hover:bg-white/10 flex items-center gap-2"
        onClick={toggleDropdown}
        type="button"
      >
        <User className="h-5 w-5" />
        <span>Account</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 z-[1000] overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 mb-1">Signed in as:</p>
            <p className="text-sm text-indigo-600 font-medium break-all">{userEmail}</p>
          </div>
          <div className="p-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 flex items-center justify-center gap-2"
              type="button"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
