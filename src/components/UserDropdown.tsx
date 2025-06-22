
import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserDropdownProps {
  userEmail: string;
  onLogout: () => void;
}

const UserDropdown = ({ userEmail, onLogout }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        className="text-indigo-200 hover:text-white hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-5 w-5 mr-2" />
        Account
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <div className="text-sm text-gray-600 mb-3">
              <strong>Logged in as:</strong>
              <br />
              <span className="text-indigo-600">{userEmail}</span>
            </div>
            <Button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              variant="outline"
              className="w-full text-red-600 border-red-300 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
