import React from 'react';
import { Home, Flame, Users, History, PlaySquare, Clock, ThumbsUp, Settings, Aperture, Video as VideoIcon, Heart, Star, X } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isOpen: boolean;
  onClose: () => void;
  notify: (msg: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, onClose, notify }) => {
  const menuItems = [
    { icon: Home, label: 'Home', view: ViewState.HOME },
    { icon: Aperture, label: 'AI Studio', view: ViewState.AI_STUDIO },
    { icon: Flame, label: 'Trending', view: ViewState.TRENDING },
    { icon: Users, label: 'Celebrities', view: ViewState.CELEBRITIES },
    { icon: VideoIcon, label: 'Live', view: ViewState.LIVE },
  ];

  const libraryItems = [
    { icon: History, label: 'History', action: () => notify("History feature coming soon") },
    { icon: PlaySquare, label: 'Your Videos', action: () => onNavigate(ViewState.UPLOAD) },
    { icon: Clock, label: 'Watch Later', action: () => notify("Saved to Watch Later") },
    { icon: ThumbsUp, label: 'Liked Videos', action: () => notify("Showing liked videos") },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 lg:top-16 left-0 h-full lg:h-[calc(100vh-64px)] w-64 bg-black border-r border-brand-gray/30 overflow-y-auto pb-4 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="font-bold text-xl text-white">Menu</span>
            <button onClick={onClose} className="text-white">
                <X size={24} />
            </button>
        </div>

        <div className="p-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.view);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.view 
                  ? 'bg-brand-gray text-white font-medium border-l-4 border-brand-orange' 
                  : 'text-gray-400 hover:bg-brand-gray/50 hover:text-white'
              }`}
            >
              <item.icon size={20} className={currentView === item.view ? 'text-brand-orange' : ''} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="my-2 border-t border-brand-gray/50 mx-4" />

        <div className="px-6 py-2">
          <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-2">Library</h3>
        </div>
        
        <div className="p-2 space-y-1">
          {libraryItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.action();
                if (window.innerWidth < 1024) onClose();
              }}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-brand-gray/50 hover:text-white transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="my-2 border-t border-brand-gray/50 mx-4" />
        
        <div className="px-6 py-2">
          <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-2">Subscriptions</h3>
          <div className="space-y-3 mt-4">
              {['Maia Califa', 'Swotie Foxi', 'Eva Elfie', 'Amouranth'].map((name, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                        onNavigate(ViewState.CELEBRITIES);
                        notify(`Navigating to ${name}`);
                        if (window.innerWidth < 1024) onClose();
                    }}
                    className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer group"
                  >
                      <div className="w-6 h-6 rounded-full bg-zinc-700 group-hover:bg-brand-orange transition-colors flex items-center justify-center text-[10px] text-black font-bold">
                        {name.charAt(0)}
                      </div>
                      <span className="text-sm truncate group-hover:text-brand-orange transition-colors">{name}</span>
                  </div>
              ))}
          </div>
        </div>
        
        <div className="mt-auto px-4 py-4">
           <button 
             onClick={() => notify("Settings functionality")}
             className="flex items-center gap-4 px-4 py-2 text-gray-500 hover:text-white transition-colors"
           >
              <Settings size={20} />
              <span>Settings</span>
           </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;