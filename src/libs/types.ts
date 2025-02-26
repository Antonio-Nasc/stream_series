export interface Cast {
  ID: string;
  Name: string;
}

export interface Genre {
  ID: string;
  Title: string;
}

export interface Show {
  Cast: Cast[];
  Genres: Genre[];
  ID: number;
  Images: {
    Background: string;
  };
  Synopsis: string;
  Title: string;
  Year: number;
}

export interface Episode {
  Duration: number;
  EpisodeNumber: number;
  ID: string;
  Image: string;
  SeasonNumber: number;
  Synopsis: string;
  Title: string;
}

export interface CardGeneralProps {
  synopsis?: string;
}

export interface WatchProgress {
  [key: string]: number 
}

export interface AboutCastProps {
  show: Show | null;
}