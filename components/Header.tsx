import React from 'react';
import { Search, Upload, Aperture, Menu, User, Bell } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onToggleSidebar: () => void;
  notify: (msg: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, searchQuery, setSearchQuery, onToggleSidebar, notify }) => {
  
  const navItems = [
    { label: 'HOME', view: ViewState.HOME },
    { label: 'VIDEOS', view: ViewState.TRENDING },
    { label: 'CATEGORIES', view: ViewState.CATEGORIES },
    { label: 'LIVE', view: ViewState.LIVE },
    { label: 'STARS', view: ViewState.CELEBRITIES },
    { label: 'COMMUNITY', view: ViewState.COMMUNITY },
    { label: 'PHOTOS', view: ViewState.PHOTOS },
  ];

  return (
    <div className="sticky top-0 z-50 flex flex-col shadow-md shadow-brand-orange/5 bg-black">
      {/* Top Strip */}
      <div className="border-b border-brand-gray/50 px-4 h-16 flex items-center justify-between relative bg-black">
        {/* Left Section: Menu & Search */}
        <div className="flex items-center gap-4 flex-1 z-10">
          <button 
            onClick={onToggleSidebar}
            className="p-2 hover:bg-brand-gray rounded-sm transition-colors text-white"
          >
            <Menu size={24} />
          </button>
          
          <div className="relative group w-full max-w-sm hidden md:block">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..." 
              className="w-full bg-zinc-800/80 border border-transparent text-white px-4 py-2 pl-10 rounded-sm focus:outline-none focus:bg-black focus:border-brand-orange transition-all placeholder-gray-500 font-medium"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-brand-orange" size={18} />
            <button 
              onClick={() => notify("Search functionality active")}
              className="absolute right-1 top-1 bg-zinc-700 hover:bg-zinc-600 p-1.5 rounded-sm px-3 transition-colors"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Center Section: Logo */}
        <div 
          onClick={() => {
            onNavigate(ViewState.HOME);
            setSearchQuery('');
          }}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
        >
          <div className="flex items-center font-bold text-3xl tracking-tighter select-none">
            <span className="text-white tracking-tighter mr-[1px]">Ph</span>
            <span className="bg-brand-orange text-black px-1.5 py-0.5 rounded-[4px] leading-tight flex items-center justify-center">hub</span>
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end z-10">
          <button className="md:hidden text-gray-300 hover:text-white p-2">
             <Search size={22} />
          </button>

          <button 
            onClick={() => onNavigate(ViewState.AI_STUDIO)}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm font-bold text-sm transition-colors uppercase tracking-wide ${
              currentView === ViewState.AI_STUDIO 
                ? 'text-brand-orange border border-brand-orange bg-transparent' 
                : 'text-gray-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Aperture size={16} />
            <span>AI Studio</span>
          </button>

          <button 
            onClick={() => onNavigate(ViewState.UPLOAD)}
            className="text-gray-300 hover:text-white p-2 hover:bg-zinc-800 rounded-sm transition-colors flex items-center gap-2"
          >
            <Upload size={22} />
            <span className="hidden lg:inline text-sm font-bold">UPLOAD</span>
          </button>
          
          <button 
            onClick={() => notify("No new notifications")}
            className="text-gray-300 hover:text-white p-2 hover:bg-zinc-800 rounded-sm transition-colors relative hidden sm:block"
          >
            <Bell size={22} />
            <span className="absolute top-1 right-2 w-2 h-2 bg-brand-orange rounded-full"></span>
          </button>
          
          <button 
             onClick={() => notify("Profile settings")}
             className="bg-brand-orange text-black font-bold text-sm px-4 py-1.5 rounded-sm hover:bg-white transition-colors uppercase"
          >
              Upgrade
          </button>
        </div>
      </div>
      
      {/* Secondary Nav Strip */}
      <div className="h-10 bg-black border-b border-brand-gray/30 flex items-center justify-center px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 text-sm font-bold text-gray-300 whitespace-nowrap">
            {navItems.map((item) => (
                <button 
                  key={item.label}
                  onClick={() => onNavigate(item.view)} 
                  className={`hover:text-brand-orange transition-colors h-full px-2 ${currentView === item.view ? 'text-white border-b-2 border-brand-orange' : ''}`}
                >
                  {item.label}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Header;