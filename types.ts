
export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  iframeUrl: string;
  author?: string;
}

export enum GameCategory {
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  RETRO = 'Retro',
  DRIVING = 'Driving',
  STRATEGY = 'Strategy',
  ADVENTURE = 'Adventure'
}

export interface AppState {
  favorites: string[];
  searchQuery: string;
  activeCategory: GameCategory | 'All';
}
