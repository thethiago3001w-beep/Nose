import React from 'react';
import { Video, ViewState } from '../types';
import { CheckCircle, ThumbsUp } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoClick }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
         <h2 className="text-xl font-bold text-white uppercase tracking-wide border-l-4 border-brand-orange pl-3">Recommended Videos</h2>
         <div className="text-sm font-bold text-gray-400 flex gap-4">
             <span className="text-white cursor-pointer">Most Recent</span>
             <span className="hover:text-white cursor-pointer transition-colors">Top Rated</span>
             <span className="hover:text-white cursor-pointer transition-colors">Most Viewed</span>
         </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="group cursor-pointer flex flex-col gap-2"
            onClick={() => onVideoClick(video)}
          >
            <div className="relative aspect-video overflow-hidden bg-brand-gray border-2 border-transparent group-hover:border-brand-orange transition-all duration-100 rounded-sm">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1 py-0.5 border border-white/20 rounded-sm">
                {video.duration}
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-600 opacity-0 group-hover:opacity-100">
                  <div className="h-full bg-brand-orange w-2/3"></div>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 px-1">
                 <h3 className="text-white font-bold text-sm line-clamp-2 leading-snug group-hover:text-brand-orange transition-colors">
                   {video.title}
                 </h3>
                 <div className="flex justify-between items-center mt-0.5">
                    <div className="text-gray-400 text-[11px] font-medium uppercase tracking-tight">
                        {video.uploader}
                        {video.verified && <CheckCircle size={10} className="inline ml-1 text-brand-orange fill-black" />}
                    </div>
                 </div>
                 <div className="flex items-center justify-between text-gray-500 text-[11px] font-medium">
                   <span>{video.views} views</span>
                   <div className="flex items-center gap-1">
                      <ThumbsUp size={10} className="text-gray-400" />
                      <span>{video.rating || 95}%</span>
                   </div>
                 </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;