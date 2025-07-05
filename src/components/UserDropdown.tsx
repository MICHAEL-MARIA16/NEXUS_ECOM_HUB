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
  const ignoreNextClickRef = useRef(false);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If we should ignore this click, skip it
      if (ignoreNextClickRef.current) {
        ignoreNextClickRef.current = false;
        return;
      }

      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Use requestAnimationFrame to ensure the click handler is added after the current event loop
      requestAnimationFrame(() => {
        document.addEventListener('click', handleClickOutside);
      });
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Toggle dropdown with proper event handling
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Set flag to ignore the next outside click if we're opening the dropdown
    if (!isOpen) {
      ignoreNextClickRef.current = true;
    }
    
    setIsOpen(prev => !prev);
  };

  // Handle logout
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    onLogout();
  };

  // Prevent dropdown from closing when clicking inside
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="relative inline-block" ref={containerRef} style={{ zIndex: 9999 }}>
      {/* Account Button */}
      <button
        onClick={handleToggle}
        className="text-indigo-200 hover:text-white hover:bg-white/10 flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200"
        type="button"
      >
        <User className="h-5 w-5" />
        <span>Account</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - Properly wrapped */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-[9999]">
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 bg-black/20 z-[9998] md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div 
            className="relative w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] max-w-[calc(100vw-2rem)] md:max-w-80"
            onClick={handleDropdownClick}
            style={{
              // Ensure dropdown stays within viewport
              maxHeight: 'calc(100vh - 100px)',
              overflow: 'auto'
            }}
          >
            {/* User Info Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">Signed in as</p>
                  <p className="text-sm text-indigo-600 font-semibold break-all">
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {/* Account Settings */}
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                Account Settings
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 my-2 mx-2"></div>

              {/* Sign Out Button */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150 flex items-center gap-3"
                type="button"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;