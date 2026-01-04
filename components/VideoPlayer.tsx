import React, { useState } from 'react';
import { Video } from '../types';
import { ThumbsUp, ThumbsDown, Share2, Save, MoreHorizontal, CheckCircle, User, MessageSquare } from 'lucide-react';

interface VideoPlayerProps {
  video: Video;
  onVideoClick: (video: Video) => void;
  notify: (msg: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onVideoClick, notify }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
      notify("Added to Liked Videos");
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    notify(subscribed ? "Unsubscribed" : "Subscribed to channel");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    notify("Link copied to clipboard");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-[1600px] mx-auto animate-fadeIn">
      {/* Main Content */}
      <div className="flex-1">
        <div className="aspect-video bg-black rounded-none sm:rounded-xl overflow-hidden shadow-2xl shadow-brand-orange/5 relative group">
          <img 
            src={video.thumbnail} 
            alt="Video Placeholder" 
            className="w-full h-full object-cover opacity-80" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 bg-brand-orange/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-black/50">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-black border-b-[12px] border-b-transparent ml-1"></div>
             </div>
          </div>
          {/* Fake controls bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gray/50 group-hover:h-1.5 transition-all cursor-pointer">
             <div className="h-full w-1/3 bg-brand-orange relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 shadow transition-opacity"></div>
             </div>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{video.title}</h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-gray/30 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden border border-zinc-600">
                  <User size={24} className="text-gray-300" />
              </div>
              <div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-brand-orange transition-colors">
                  <h3 className="font-bold text-white">{video.uploader}</h3>
                  {video.verified && <CheckCircle size={14} className="text-brand-orange fill-black" />}
                </div>
                <p className="text-xs text-gray-400">1.2M subscribers</p>
              </div>
              <button 
                onClick={handleSubscribe}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ml-4 ${
                  subscribed 
                    ? 'bg-zinc-800 text-gray-300 border border-zinc-600' 
                    : 'bg-brand-orange text-black hover:bg-white'
                }`}
              >
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium">
               <div className="flex items-center bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-white/10 transition-colors border-r border-zinc-700 ${liked ? 'text-brand-orange' : 'text-white'}`}
                  >
                     <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
                     <span>{liked ? '12.1K' : '12K'}</span>
                  </button>
                  <button 
                    onClick={handleDislike}
                    className={`px-4 py-2 hover:bg-white/10 transition-colors ${disliked ? 'text-white' : 'text-gray-300'}`}
                  >
                     <ThumbsDown size={18} fill={disliked ? "currentColor" : "none"} />
                  </button>
               </div>
               <button 
                 onClick={handleShare}
                 className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full hover:bg-white/10 transition-colors border border-zinc-700"
               >
                  <Share2 size={18} />
                  <span>Share</span>
               </button>
               <button className="p-2 bg-zinc-800 rounded-full hover:bg-white/10 transition-colors border border-zinc-700">
                  <MoreHorizontal size={18} />
               </button>
            </div>
          </div>

          <div className="mt-4 bg-zinc-900/50 p-4 rounded-lg text-sm text-gray-300 border border-zinc-800/50">
             <div className="flex gap-2 font-bold text-white mb-2">
                <span>{video.views} views</span>
                <span>•</span>
                <span>2 days ago</span>
                <span>•</span>
                <span className="text-brand-orange">{video.rating || 95}% Rating</span>
             </div>
             <p className={showFullDesc ? "" : "line-clamp-2"}>
                Welcome to my official channel! In this video, I take you behind the scenes of my latest project. 
                Don't forget to like, comment and subscribe for more exclusive content.
                <br /><br />
                Follow me on social media for daily updates!
                <br />
                Instagram: @{video.uploader.replace(/\s+/g, '').toLowerCase()}
                <br />
                Twitter: @{video.uploader.replace(/\s+/g, '').toLowerCase()}
             </p>
             <button 
               onClick={() => setShowFullDesc(!showFullDesc)}
               className="mt-2 text-brand-orange cursor-pointer hover:underline font-bold text-xs uppercase"
             >
               {showFullDesc ? "Show less" : "Show more"}
             </button>
          </div>

          <div className="mt-6">
             <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold">4 Comments</h3>
                <div className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-400 hover:text-white">
                   <MessageSquare size={16} />
                   <span>Sort by</span>
                </div>
             </div>
             
             {/* Fake Add Comment */}
             <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center font-bold text-black">
                   Y
                </div>
                <div className="flex-1">
                   <input type="text" placeholder="Add a comment..." className="w-full bg-transparent border-b border-zinc-700 pb-2 focus:border-white focus:outline-none transition-colors" />
                </div>
             </div>

             {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 mb-6 group">
                   <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0 border border-zinc-700" />
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-sm text-white">Fan User {i}</span>
                         <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-300">Great video! The production quality is amazing. Keep it up!</p>
                      <div className="flex items-center gap-4 mt-2">
                         <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
                            <ThumbsUp size={14} /> 24
                         </button>
                         <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
                            <ThumbsDown size={14} />
                         </button>
                         <button className="text-xs text-gray-400 hover:text-white font-bold transition-colors">Reply</button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Recommended Sidebar */}
      <div className="w-full lg:w-[400px] flex-shrink-0">
         <h3 className="font-bold text-lg mb-4 hidden lg:block uppercase tracking-wide">Up Next</h3>
         <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
               <div 
                 key={i} 
                 onClick={() => {
                   onVideoClick({
                     id: `rec-${i}`,
                     title: `Recommended Video Title #${i}`,
                     uploader: "Popular Creator",
                     views: "500K",
                     duration: "10:00",
                     thumbnail: `https://loremflickr.com/300/200/woman,girl?lock=${i + 20}`,
                     verified: i % 2 === 0,
                     rating: 90 + i
                   });
                   window.scrollTo(0, 0);
                 }}
                 className="flex gap-2 group cursor-pointer hover:bg-zinc-900/50 p-1 rounded transition-colors"
               >
                  <div className="w-40 h-24 bg-zinc-800 rounded-sm overflow-hidden relative flex-shrink-0 border border-transparent group-hover:border-brand-orange/50 transition-all">
                     <img 
                        src={`https://loremflickr.com/300/200/woman,girl?lock=${i + 20}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        alt="thumb" 
                     />
                     <div className="absolute bottom-1 right-1 bg-black/90 text-white text-[10px] font-bold px-1 rounded-sm">
                        {10 + i}:00
                     </div>
                  </div>
                  <div className="flex flex-col gap-1 py-1">
                     <h4 className="font-bold text-sm text-white line-clamp-2 group-hover:text-brand-orange transition-colors leading-tight">Recommended Video Title #{i}</h4>
                     <p className="text-xs text-gray-400 hover:text-white transition-colors">Channel Name</p>
                     <p className="text-xs text-gray-500">50K views • 1 week ago</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default VideoPlayer;