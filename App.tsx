import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VideoGrid from './components/VideoGrid';
import VideoPlayer from './components/VideoPlayer';
import ImageEditor from './components/ImageEditor';
import AgeVerificationModal from './components/AgeVerificationModal';
import { Video, ViewState } from './types';
import { CheckCircle } from 'lucide-react';

// Mock Data with "Star" names and female-focused thumbnails
const MOCK_VIDEOS: Video[] = [
  { id: '1', title: "Exclusive: My New Penthouse Tour", uploader: "Maia Califa", views: "4.2M", duration: "12:04", thumbnail: "https://loremflickr.com/400/225/woman,model?lock=1", verified: true, rating: 98 },
  { id: '2', title: "Gaming Setup Update 2024 🎮", uploader: "Swotie Foxi", views: "2.1M", duration: "15:30", thumbnail: "https://loremflickr.com/400/225/girl,gamer?lock=2", verified: true, rating: 95 },
  { id: '3', title: "ASMR - Whispering Secrets", uploader: "Eva Elfie Vlogs", views: "1.8M", duration: "22:15", thumbnail: "https://loremflickr.com/400/225/blonde,woman?lock=3", verified: true, rating: 99 },
  { id: '4', title: "Gym Routine & Yoga Flow", uploader: "Angela W.", views: "3.5M", duration: "18:45", thumbnail: "https://loremflickr.com/400/225/fitness,woman?lock=4", verified: true, rating: 92 },
  { id: '5', title: "Q&A: Answering Your Questions", uploader: "Lana R.", views: "5.6M", duration: "10:20", thumbnail: "https://loremflickr.com/400/225/woman,portrait?lock=5", verified: true, rating: 97 },
  { id: '6', title: "Behind The Scenes Photoshoot", uploader: "Riley R.", views: "2.9M", duration: "08:55", thumbnail: "https://loremflickr.com/400/225/fashion,model?lock=6", verified: true, rating: 88 },
  { id: '7', title: "Cooking Spicy Pasta 🍝", uploader: "Maia Califa", views: "1.2M", duration: "14:12", thumbnail: "https://loremflickr.com/400/225/woman,kitchen?lock=7", verified: true, rating: 96 },
  { id: '8', title: "Late Night Stream Highlights", uploader: "Amouranth TV", views: "890K", duration: "45:00", thumbnail: "https://loremflickr.com/400/225/girl,streamer?lock=8", verified: true, rating: 91 },
  { id: '9', title: "Trying on Halloween Costumes", uploader: "Swotie Foxi", views: "3.1M", duration: "11:30", thumbnail: "https://loremflickr.com/400/225/costume,woman?lock=9", verified: true, rating: 94 },
  { id: '10', title: "My Car Collection 2025", uploader: "Johnny S.", views: "4.5M", duration: "16:20", thumbnail: "https://loremflickr.com/400/225/woman,car?lock=10", verified: true, rating: 89 },
  { id: '11', title: "Reacting to my old videos", uploader: "Abella D.", views: "1.5M", duration: "13:45", thumbnail: "https://loremflickr.com/400/225/woman,smiling?lock=11", verified: true, rating: 93 },
  { id: '12', title: "Travel Vlog: Dubai Luxury", uploader: "Mia M.", views: "2.2M", duration: "24:10", thumbnail: "https://loremflickr.com/400/225/woman,travel?lock=12", verified: true, rating: 98 },
  { id: '13', title: "Podcast Ep. 45 - Real Talk", uploader: "Violet M.", views: "670K", duration: "55:00", thumbnail: "https://loremflickr.com/400/225/woman,talking?lock=13", verified: true, rating: 85 },
  { id: '14', title: "Makeup Tutorial: Glam Look", uploader: "Adriana C.", views: "900K", duration: "19:05", thumbnail: "https://loremflickr.com/400/225/makeup,woman?lock=14", verified: true, rating: 90 },
  { id: '15', title: "Workout Motivation", uploader: "Jordi P.", views: "3.3M", duration: "10:15", thumbnail: "https://loremflickr.com/400/225/sport,woman?lock=15", verified: true, rating: 96 },
  { id: '16', title: "Unboxing Gold Play Button", uploader: "Maia Califa", views: "5.1M", duration: "09:30", thumbnail: "https://loremflickr.com/400/225/woman,happy?lock=16", verified: true, rating: 99 },
  { id: '17', title: "Backstage at the Awards", uploader: "Kendra L.", views: "1.9M", duration: "14:45", thumbnail: "https://loremflickr.com/400/225/dress,woman?lock=17", verified: true, rating: 94 },
  { id: '18', title: "My new puppy!", uploader: "Brandiville", views: "800K", duration: "05:30", thumbnail: "https://loremflickr.com/400/225/woman,dog?lock=18", verified: true, rating: 97 },
  { id: '19', title: "Yoga Challenge Impossible", uploader: "Sasha G.", views: "2.7M", duration: "21:10", thumbnail: "https://loremflickr.com/400/225/yoga,woman?lock=19", verified: true, rating: 91 },
  { id: '20', title: "Exploring Tokyo at Night", uploader: "Rae Lil B", views: "3.2M", duration: "18:20", thumbnail: "https://loremflickr.com/400/225/night,woman?lock=20", verified: true, rating: 96 },
];

const CELEBRITY_LIST = [
    'Maia Califa', 'Swotie Foxi', 'Eva Elfie', 'Amouranth', 
    'Angela W.', 'Lana R.', 'Riley R.', 'Abella D.', 
    'Mia M.', 'Violet M.', 'Adriana C.', 'Jordi P.',
    'Kendra L.', 'Sasha G.', 'Brandiville', 'Rae Lil B',
    'Lisa A.', 'Gabbie C.', 'Dani D.', 'Nicole A.'
];

const App: React.FC = () => {
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const verified = localStorage.getItem('age_verified');
    if (verified === 'true') {
      setIsAgeVerified(true);
    }
  }, []);

  // Lock body scroll when verification modal is open
  useEffect(() => {
    if (!isAgeVerified) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
  }, [isAgeVerified]);

  const handleVerifyAge = () => {
    localStorage.setItem('age_verified', 'true');
    setIsAgeVerified(true);
  };

  const handleExitAge = () => {
    window.location.href = 'https://www.google.com';
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== ViewState.WATCH) {
      setSelectedVideo(null);
    }
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setCurrentView(ViewState.WATCH);
    window.scrollTo(0, 0);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter videos based on search query
  const filteredVideos = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return MOCK_VIDEOS.filter(video => 
      video.title.toLowerCase().includes(lowerQuery) || 
      video.uploader.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            {searchQuery && (
              <div className="px-6 pt-6">
                <p className="text-gray-400">Search results for: <span className="text-brand-orange font-bold">"{searchQuery}"</span></p>
              </div>
            )}
            {filteredVideos.length > 0 ? (
              <VideoGrid videos={filteredVideos} onVideoClick={handleVideoClick} />
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                <p className="text-xl">No videos found for "{searchQuery}"</p>
                <p className="text-sm mt-2">Try searching for "Maia" or "Swotie"</p>
              </div>
            )}
          </>
        );
      case ViewState.WATCH:
        return selectedVideo ? <VideoPlayer video={selectedVideo} onVideoClick={handleVideoClick} notify={showToast} /> : <VideoGrid videos={filteredVideos} onVideoClick={handleVideoClick} />;
      case ViewState.AI_STUDIO:
        return <ImageEditor />;
      case ViewState.UPLOAD:
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-4 animate-fadeIn">
                <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                   <span className="text-4xl">📤</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Upload Content</h2>
                <p className="text-gray-400 max-w-md mb-8">Share your moments with the world. Join our community of premium creators.</p>
                <button 
                  onClick={() => showToast("File picker opened")}
                  className="bg-brand-orange text-black font-bold px-8 py-3 rounded-full hover:bg-white transition-colors uppercase tracking-wide"
                >
                    Select Files
                </button>
            </div>
        );
      case ViewState.TRENDING:
      case ViewState.CELEBRITIES:
      case ViewState.LIVE:
      case ViewState.CATEGORIES:
      case ViewState.COMMUNITY:
      case ViewState.PHOTOS:
        // Generic page wrapper for other views
        return (
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6 border-b border-brand-gray/50 pb-4">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wide">{currentView}</h2>
                    <span className="bg-brand-orange text-black text-xs font-bold px-2 py-0.5 rounded uppercase">New</span>
                </div>
                {currentView === ViewState.CELEBRITIES ? (
                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {CELEBRITY_LIST.map((name, i) => (
                           <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col items-center text-center hover:border-brand-orange transition-colors cursor-pointer" onClick={() => showToast(`Opening ${name}'s profile`)}>
                               <div className="w-24 h-24 rounded-full bg-zinc-700 mb-3 overflow-hidden group border-2 border-transparent group-hover:border-brand-orange">
                                   <img src={`https://loremflickr.com/200/200/woman,face?lock=${i+100}`} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                               </div>
                               <h3 className="font-bold text-white">{name}</h3>
                               <p className="text-xs text-gray-500 mt-1">2.{i + 1}M Subs</p>
                               <button className="mt-3 text-xs bg-zinc-800 hover:bg-brand-orange hover:text-black text-white px-4 py-1.5 rounded-full transition-colors font-bold">Follow</button>
                           </div>
                        ))}
                     </div>
                ) : (
                    <VideoGrid videos={[...MOCK_VIDEOS].reverse()} onVideoClick={handleVideoClick} />
                )}
            </div>
        );
      default:
        return <VideoGrid videos={filteredVideos} onVideoClick={handleVideoClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-orange selection:text-black">
      
      {/* Age Verification Overlay - Now allows background to render behind it */}
      {!isAgeVerified && (
        <AgeVerificationModal onVerify={handleVerifyAge} onExit={handleExitAge} />
      )}

      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        notify={showToast}
      />
      
      <div className="flex relative">
        <Sidebar 
            currentView={currentView} 
            onNavigate={handleNavigate} 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            notify={showToast}
        />
        
        <main className="flex-1 min-w-0">
           {renderContent()}
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 border-l-4 border-brand-orange text-white px-6 py-4 rounded shadow-2xl z-[100] animate-fadeIn flex items-center gap-3">
            <CheckCircle size={20} className="text-brand-orange" />
            <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;