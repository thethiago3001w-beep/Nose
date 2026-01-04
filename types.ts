export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  duration: string;
  uploader: string;
  verified?: boolean;
  rating?: number; // Percent like 98
}

export enum ViewState {
  HOME = 'HOME',
  WATCH = 'WATCH',
  UPLOAD = 'UPLOAD',
  AI_STUDIO = 'AI_STUDIO',
  TRENDING = 'TRENDING',
  CELEBRITIES = 'CELEBRITIES',
  LIBRARY = 'LIBRARY',
  LIVE = 'LIVE',
  COMMUNITY = 'COMMUNITY',
  PHOTOS = 'PHOTOS',
  CATEGORIES = 'CATEGORIES'
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  likes: number;
}